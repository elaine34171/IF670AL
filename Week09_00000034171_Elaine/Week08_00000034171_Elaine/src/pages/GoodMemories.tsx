import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, isPlatform, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { add } from "ionicons/icons";
import { useContext } from "react";

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import MemoriesContext from "../data/memories-context";

const GoodMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good');

    const loading = <div/>;
    
    const containerStyle = {
        width: '100%',
        height: '200px'
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>
                        Good Memories
                    </IonTitle>

                    {!isPlatform('android') && (
                        <IonButtons slot="end">
                            <IonButton href="/tabs/new">
                                <IonIcon icon={add} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid>
                    {goodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonTitle color="primary">No good memories found.</IonTitle>
                            </IonCol>
                        </IonRow>
                    )}

                    <LoadScript
                        googleMapsApiKey="AIzaSyDfqb403mTCmfngO9lR-mT1JMibIhx8re4"
                        loadingElement={loading}
                    />

                    {goodMemories.map(memory => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard className="ion-text-center">
                                    <img src={memory.base64Url} alt={memory.title} />
                                    
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={{lat: memory.markerLat, lng: memory.markerLng}}
                                        zoom={10}
                                    >
                                            <></>
                                        <Marker position={{lat: memory.markerLat, lng: memory.markerLng}} />
                                    </GoogleMap>
                                    
                                    <IonCardHeader className="ion-text-left">
                                        <IonCardTitle>{memory.title}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>

                {isPlatform('android') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="primary" href="/tabs/new">
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    );
};

export default GoodMemories;