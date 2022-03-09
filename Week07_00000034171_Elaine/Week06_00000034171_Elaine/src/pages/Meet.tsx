import { isPlatform } from "@ionic/core";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOption, IonItemOptions, IonThumbnail, IonButton, IonFab, IonFabButton, IonAlert, IonToast, IonModal, IonGrid, IonRow, IonCol, IonInput } from "@ionic/react";
import { addOutline, ban, create, trashSharp } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import FriendsContext from "../data/friend-context";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', photo: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/01/thor-and-celestials.jpg'},
    {id:'f2', name: 'John Ness', photo: 'https://feeds.abplive.com/onecms/images/uploaded-images/2021/07/21/5eaefdb7d9ccffe2bf9baba97fd16423_original.jpg'},
    {id: 'f3', name: 'John Doe', photo: 'https://i.pinimg.com/originals/ec/cf/cc/eccfccd39dd40980b33b644108dd19ac.jpg'}
];

const Meet: React.FC = () => {
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const nameRef = useRef<HTMLIonInputElement>(null);

    const [toastMessage, setToastMessage] = useState('');
    const [modalType, setModalType] = useState('');
    
    const [selectedFriend, setSelectedFriend] = useState<{id: string, name: string, photo: string} | null>();

    const [startBlocking, setStartBlocking] = useState(false);
    const [startDeleting, setStartDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const friendsCtx = useContext(FriendsContext);

    const callFriendHandler = () => {
        console.log("Calling...");
    };

    const startBlockFriendHandler = () => {
        setStartBlocking(true);
        slidingOptionsRef.current?.closeOpened();
    };

    const blockFriendHandler = () => {
        setStartBlocking(false);
        setToastMessage('Blocked friend!');
    };

    const startDeleteFriendHandler = (friendId: string) => {
        setStartDeleting(true);
        
        const friend = friendsCtx.friends.find(f => f.id === friendId);
        setSelectedFriend(friend);

        slidingOptionsRef.current?.closeOpened();
    };

    const deleteFriendHandler = (friendId: string) => {
        setStartDeleting(false);
        friendsCtx.deleteFriend(friendId);
        setToastMessage('Deleted friend!');
    };
    
    const startEditFriendHandler = (friendId: string) => {
        console.log("Editing...");
        
        setIsEditing(true);
        setModalType("Edit");
        slidingOptionsRef.current?.closeOpened();

        const friend = friendsCtx.friends.find(f => f.id === friendId);
        setSelectedFriend(friend);
    };

    const cancelEditFriendHandler = () => {
        setIsEditing(false);
    };

    const startAddFriendHandler = () => {
        console.log("Adding friend...");

        setIsEditing(true);
        setModalType("Add Friend");
        setSelectedFriend(null);
    };
    
    const saveFriendHandler = () => {
        const enteredName = nameRef.current!.value;

        if(!enteredName)
            return;

        if(selectedFriend === null){
            friendsCtx.addFriend(enteredName.toString(), 'https://tanzolymp.com/images/default-non-user-no-photo-1.jpg');
        }
        else{
            friendsCtx.updateFriend(selectedFriend!.id.toString(), enteredName.toString(), selectedFriend!.photo.toString());
        }

        setIsEditing(false);
    };

    return(
        <React.Fragment>
            <IonAlert
                isOpen={startDeleting}
                header="Are you sure?"
                message="Do you want to delete your friend? This action cannot be undone."
                buttons={[
                    {text: 'No', role: 'cancel', handler: () => {setStartDeleting(false)}},
                    {text: 'Yes', handler: () => {deleteFriendHandler(selectedFriend!.id.toString())}}
                ]}
            />

            <IonAlert
                isOpen={startBlocking}
                header="Are you sure?"
                message="Do you want to block your friend? This action cannot be undone."
                buttons={[
                    {text: 'No', role: 'cancel', handler: () => {setStartBlocking(false)}},
                    {text: 'Yes', handler: blockFriendHandler}
                ]}
            />

            <IonToast
                isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => {setToastMessage('')}}
            />

            <IonModal isOpen={isEditing}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="ion-text-center">
                            {modalType === 'Edit'? "Edit Friend" : "Add Friend"}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Friend Name</IonLabel>
                                    <IonInput type="text" value={selectedFriend?.name} ref={nameRef} />
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonRow className="ion-text-center">
                            <IonCol>
                                <IonButton fill="clear" color="dark" onClick={cancelEditFriendHandler}>
                                    Cancel
                                </IonButton>
                            </IonCol>

                            <IonCol>
                                <IonButton color="secondary" expand="block" onClick={saveFriendHandler}>
                                    Save
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>

                        <IonTitle>
                            Meet
                        </IonTitle>

                        {!isPlatform('android') && (
                            <IonButtons slot="end">
                                <IonButton onClick={startAddFriendHandler}>
                                    <IonIcon icon={addOutline} />
                                </IonButton>
                            </IonButtons>
                        )}
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        {friendsCtx.friends.map(friend => (
                            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                                <IonItemOptions side="start">
                                    <IonItemOption color="danger" onClick={startBlockFriendHandler}>
                                        <IonIcon slot="icon-only" icon={ban} />
                                    </IonItemOption>

                                    <IonItemOption color="warning" onClick={startDeleteFriendHandler.bind(null, friend.id)}>
                                        <IonIcon slot="icon-only" icon={trashSharp} />
                                    </IonItemOption>
                                </IonItemOptions>
                                
                                <IonItem lines="full" button onClick={callFriendHandler}>
                                    <IonThumbnail slot="start">
                                        <img src={friend.photo} />
                                    </IonThumbnail>

                                    <IonLabel>
                                        {friend.name}
                                    </IonLabel>
                                </IonItem>

                                <IonItemOptions side="end">
                                    <IonItemOption color="success" onClick={startEditFriendHandler.bind(null, friend.id)}>
                                        <IonIcon slot="icon-only" icon={create} />
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                    </IonList>

                    {isPlatform('android') && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                                <IonIcon icon={addOutline} />
                            </IonFabButton>
                        </IonFab>
                    )}
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default Meet;