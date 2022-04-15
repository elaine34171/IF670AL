import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useRef, useState } from 'react';

import axios from "axios";
import { useHistory } from 'react-router';

import { LOCALHOST } from '../App';

const Post: React.FC = () => {
    const history = useHistory();

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [data, setData] = useState('');
    const url = LOCALHOST + "insert_new_student.php";

    const nim = useRef<HTMLIonInputElement>(null);
    const nama = useRef<HTMLIonInputElement>(null);
    const prodi = useRef<HTMLIonInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File>();

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0]);
    };

    const insertHandler = () => {
        const formData = new FormData();

        const inNim = nim.current?.value as string;
        const inNama = nama.current?.value as string;
        const inProdi = prodi.current?.value as string;

        formData.append('nim', inNim);
        formData.append('nama', inNama);
        formData.append('prodi', inProdi);
        formData.append('foto', selectedFile as File);

        // fetch(url, {
        //     method: "post",
        //     body: formData
        // }).then(response => response.text()).then((data) => {
        //     setData(data);
        //     console.log(data);
        // });

        axios.post(url, formData).then(res => {
            console.log(res);

            if(res.data.success == 1){
                history.length > 0? history.goBack(): history.replace('/');
            }
            else{
                setToastMessage(res.data.message);
                setShowToast(true);
            }
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="home"></IonBackButton>
                    </IonButtons>
                    
                    <IonTitle>00000034171</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonItem lines="full">
                    <IonLabel position="floating">NIM</IonLabel>
                    <IonInput ref={nim}></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <IonLabel position="floating">Nama</IonLabel>
                    <IonInput ref={nama}></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <IonLabel position="floating">Program Studi</IonLabel>
                    <IonInput ref={prodi}></IonInput>
                </IonItem>

                <IonItem lines="full">
                    <input type="file" onChange={fileChangeHandler} />
                </IonItem>

                <div className="ion-text-center ion-padding-top">
                    <IonButton onClick={insertHandler}>Simpan</IonButton>
                </div>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => {setShowToast(false); setToastMessage('');}}
                    message={toastMessage}
                    duration={300}
                />
            </IonContent>
        </IonPage>
    );
};

export default Post;