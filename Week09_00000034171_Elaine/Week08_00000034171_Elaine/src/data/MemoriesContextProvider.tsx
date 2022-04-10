import React, {useCallback, useEffect, useState} from "react";
import { Storage } from '@capacitor/storage';

import MemoriesContext, {Memory} from "./memories-context";
import { Directory, Filesystem } from "@capacitor/filesystem";

const MemoriesContextProvider: React.FC = props => {
    const [memories, setMemories] = useState<Memory[]>([]);

    const addMemory = (path: string, base64Data: string, title: string, type: 'good' | 'bad', markerLat: number, markerLng: number) => {
        const newMemory: Memory = {
            id: Math.random().toString(),
            title,
            type,
            imagePath: path,
            base64Url: base64Data,
            markerLat,
            markerLng
        };

        setMemories(curMemories => {
            return [...curMemories, newMemory];
        });
    };
    
    useEffect(() => {
        const storableMemories = memories.map(memory => {
            return {
                id: memory.id,
                title: memory.title,
                imagePath: memory.imagePath,
                type: memory.type,
                markerLat: memory.markerLat,
                markerLng: memory.markerLng
            }
        });

        Storage.set({key: 'memories', value: JSON.stringify(storableMemories)});
    }, [memories]);

    const initContext = useCallback(async() => {
        const memoriesData = await Storage.get({key: 'memories'});
        const storedMemories = memoriesData.value? JSON.parse(memoriesData.value): [];
        const loadedMemories: Memory[] = [];

        for(const storedMemory of storedMemories){
            const file = await Filesystem.readFile({
                path: storedMemory.imagePath,
                directory: Directory.Data
            })

            loadedMemories.push({
                id: storedMemory.id,
                title: storedMemory.title,
                type: storedMemory.type,
                imagePath: storedMemory.imagePath,
                base64Url: 'data:image/jpeg;base64,' + file.data,
                markerLat: storedMemory.markerLat,
                markerLng: storedMemory.markerLng
            });
        }

        setMemories(loadedMemories);
    }, []);

    return(
        <MemoriesContext.Provider value={{memories, addMemory, initContext}}>
            {props.children}
        </MemoriesContext.Provider>
    );
};

export default MemoriesContextProvider;