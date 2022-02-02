import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonRow, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [BMIcategory, setBMIcategory] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const results = useRef<HTMLIonRowElement>(null);

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    var category = "";

    if(!enteredHeight || !enteredWeight){
      if(results != null){
        results.current?.setAttribute("hidden", "true");
      }
      
      return;
    }
    
    const bmi = +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100));

    if(bmi < 8.5){
      category = "Kurus";
    }
    else{
        if(bmi <= 24.9){
            category = "Normal";
        }
        else{
            if(bmi <= 29.9){
                category = "Gemuk";
            }
            else{
                if(bmi > 29.9){
                    category = "Obesitas";
                }
            }
        }
    }

    //console.log(bmi);

    if(category == ""){
      if(results){
        results.current?.setAttribute("hidden", "true");
      }
    }
    else{
      if(results){
        results.current?.removeAttribute("hidden");
      }

      setCalculatedBMI(bmi);
      setBMIcategory(category);
    }
  };

  const resetInputs = () => {
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';

    if(results){
      results.current?.setAttribute("hidden", "true");
    }
  };

  return(
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Berat Badan (kg)</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-left">
            <IonButton onClick={calculateBMI}>
              <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>

          <IonCol className="ion-text-right">
            <IonButton onClick={resetInputs}>
              <IonIcon slot="start" icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>

        {calculatedBMI && BMIcategory && (
          <IonRow ref={results}>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonCardTitle>{calculatedBMI}</IonCardTitle>
                  <IonCardSubtitle>{BMIcategory}</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    </IonApp>
  )
};

export default App;
