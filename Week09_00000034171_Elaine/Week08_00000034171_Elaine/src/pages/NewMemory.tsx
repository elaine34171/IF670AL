import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonRow, IonCol, IonButton, IonIcon, IonLabel, IonInput, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { camera } from "ionicons/icons";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";

import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import MemoriesContext from "../data/memories-context";

const NewMemory: React.FC = () => {
    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const titleRef = useRef<HTMLIonInputElement>(null);

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    };

    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined;
        preview: string;
    }>();

    const takePhotoHandler = async() => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });

        console.log(photo);

        if(!photo || !photo.webPath) {
            return;
        }

        setTakenPhoto({
            path: photo.path,
            preview: photo.webPath
        });
    };

    const memoriesCtx = useContext(MemoriesContext);
    const history = useHistory();

    const addMemoryHandler = async() => {
        const enteredTitle = titleRef.current?.value;

        if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType){
            return;
        }

        const fileName = new Date().getTime() + '.jpeg';
        const base64 = await base64FromPath(takenPhoto!.preview);

        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Data
        });

        memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType, lat, lng);
        history.length > 0? history.goBack(): history.replace('/');
    };

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const selectPos = (e: google.maps.MapMouseEvent) => {
        if(e.latLng?.lat()){
          setLat(e.latLng?.lat());
        }
    
        if(e.latLng?.lng()){
          setLng(e.latLng?.lng());
        }

        console.log('Marker updated!');
    };

    const getCurrentPosition = async() => {
        const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
    
        console.log('Current positions: ', coordinates);
        console.log('Lat: ', coordinates.coords.latitude);
        console.log('Lng: ', coordinates.coords.longitude);
    
        setLat(coordinates.coords.latitude);
        setLng(coordinates.coords.longitude);
    };

    const containerStyle = {
        width: '100%',
        height: '300px'
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="good"/>
                    </IonButtons>

                    <IonTitle>
                        Add New Memory
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Memory Title</IonLabel>
                            <IonInput type="text" ref={titleRef} />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonSelect onIonChange={selectMemoryTypeHandler} value={chosenMemoryType}>
                            <IonSelectOption value="good">Good Memory</IonSelectOption>
                            <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                        </IonSelect>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-text-center ion-margin-top">
                    <IonCol>
                        <div className="image-preview">
                            {!takenPhoto && <p>No photo chosen.</p>}
                            {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
                        </div>

                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera} />
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol className="ion-text-center">
                        <LoadScript googleMapsApiKey="API_KEY">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{lat: lat, lng: lng}}
                                zoom={10}
                                onClick={selectPos}
                                onLoad={getCurrentPosition}
                            >
                                <></>
                                <Marker position={{lat: lat, lng: lng}} />
                            </GoogleMap>
                        </LoadScript>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default NewMemory;