import { IonAvatar, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';

import axios, { AxiosResponse } from "axios";

import { LOCALHOST } from '../App';

import './Home.css';

const Home: React.FC = () => {
  const [data, setData] = useState<AxiosResponse>();
  const url = LOCALHOST + "select_all_students.php";

  const [students, setStudents] = useState<Array<any>>([]);

  useEffect(() => {
    // fetch(url)
    //   .then(response => response.json())
    //   .then((data) => {
    //     setData(data);
    //     console.log(data.students);
    //     setStudents(data.students);
    //   });
    
    axios.get(url).then((response) => {
      setData(response);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    console.log(data);
    setStudents(data?.data.students);
  }, [data]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>00000034171</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {students && students.map(student => (
            <IonItem key={student.nim} lines="full">
              <IonAvatar slot="start">
                <img src={LOCALHOST + (student.foto? student.foto: 'uploads/man.jpg')} />
              </IonAvatar>

              <IonLabel>
                {student.nim}<br/>
                {student.nama}<br/>
                {student.prodi}<br/>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/post">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
