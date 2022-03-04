import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOption, IonItemOptions, IonThumbnail } from "@ionic/react";
import { ban, create, trashSharp } from "ionicons/icons";
import React, { useRef } from "react";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', avatar: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/01/thor-and-celestials.jpg'},
    {id:'f2', name: 'John Ness', avatar: 'https://feeds.abplive.com/onecms/images/uploaded-images/2021/07/21/5eaefdb7d9ccffe2bf9baba97fd16423_original.jpg'},
    {id: 'f3', name: 'John Doe', avatar: 'https://i.pinimg.com/originals/ec/cf/cc/eccfccd39dd40980b33b644108dd19ac.jpg'}
];

const Meet: React.FC = () => {
    const callFriendHandler = () => {
        console.log("Calling...");
    };
    
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const blockFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    }

    const deleteFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Deleting...");
    }

    const editFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        Meet
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    {FRIENDS_DATA.map(friend => (
                        <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon slot="icon-only" icon={ban} />
                                </IonItemOption>

                                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                    <IonIcon slot="icon-only" icon={trashSharp} />
                                </IonItemOption>
                            </IonItemOptions>
                            
                            <IonItem lines="full" button onClick={callFriendHandler}>
                                <IonThumbnail slot="start">
                                    <img src={friend.avatar} />
                                </IonThumbnail>

                                <IonLabel>
                                    {friend.name}
                                </IonLabel>
                            </IonItem>

                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={editFriendHandler}>
                                    <IonIcon slot="icon-only" icon={create} />
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Meet;