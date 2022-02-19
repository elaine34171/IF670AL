import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>00000034171 - Elaine</h2>
        <IonButton expand="block" href="bmi">BMI Calculator</IonButton>
        <IonButton expand="block" href="bmr">BMR Calculator</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
