import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonRow, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonAlert, IonBackButton, IonButtons } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';

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
import '../theme/variables.css';

import InputControl from '../components/InputControl';
import BmiControls from '../components/BmiControls';
import BmiResult from '../components/BmiResult';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [BMIcategory, setBMIcategory] = useState<string>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const results = useRef<HTMLIonRowElement>(null);

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    var category = "";

    if(!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredWeight <= 0){
      if(results != null){
        results.current?.setAttribute("hidden", "true");
      }

      setError('Please enter a valid (non-negative) input number');
      
      return;
    }
    
    var cmHeight;
    var kgWeight;

    if(calcUnits === 'cmkg'){
      cmHeight = +enteredHeight;
      kgWeight = +enteredWeight;
    }
    else{
      cmHeight = +enteredHeight / 0.0328;
      kgWeight = +enteredWeight / 2.2;
    }
    
    const bmi = kgWeight / ((cmHeight / 100) * (cmHeight / 100));

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

      setError('Please enter a valid (non-negative) input number');
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

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return(
    <>
      <IonAlert isOpen={!!error} message={error} buttons={[{text: 'Okay', handler: () => {setError('')}}]} />

      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="home"/>
            </IonButtons>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg'? 'cm': 'feet'})</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg'? 'kg': 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

          {calculatedBMI && BMIcategory && (
            <BmiResult allResults={results} numResult={calculatedBMI} catResult={BMIcategory}/>
          )}
        </IonGrid>
      </IonApp>
    </>
  )
};

export default App;
