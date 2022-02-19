import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonRow, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonAlert, IonBackButton, IonButtons, IonRadio, IonRadioGroup, IonListHeader } from '@ionic/react';
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
import BmrControls from '../components/BmrControls';
import BmrResult from '../components/BmrResult';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBMR, setCalculatedBMR] = useState<number>();
  const [calculatedCalNeed1, setCalNeed1] = useState<number>();
  const [calculatedCalNeed2, setCalNeed2] = useState<number>();
  const [calculatedCalNeed3, setCalNeed3] = useState<number>();
  const [calculatedCalNeed4, setCalNeed4] = useState<number>();
  const [calculatedCalNeed5, setCalNeed5] = useState<number>();
  
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const ageInputRef = useRef<HTMLIonInputElement>(null);

  const [selectedSex, setSelectedSex] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const results = useRef<HTMLIonRowElement>(null);

  const calculateBMR = () => {
    const enteredAge = ageInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    if(!enteredAge || !enteredHeight || !enteredWeight || +enteredAge < 0 || +enteredHeight <= 0 || +enteredWeight <= 0){
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

    var bmr;

    if(selectedSex === 'L'){
        bmr = 66 + (13.7 * kgWeight) + (5 * cmHeight) - (6.8 * +enteredAge);
    }
    else{
        if(selectedSex === 'P'){
            bmr = 655 + (9.6 * kgWeight) + (1.8 * cmHeight) - (4.7 * +enteredAge);
        }
        else{
            bmr = -1;
        }
    }

    //console.log(bmr);

    var cal1 = bmr * 1.2;
    var cal2 = bmr * 1.375;
    var cal3 = bmr * 1.55;
    var cal4 = bmr * 1.725;
    var cal5 = bmr * 1.9;

    if(bmr == -1){
      if(results){
        results.current?.setAttribute("hidden", "true");
      }

      setError('Please enter a valid (non-negative) input number');
    }
    else{
      if(results){
        results.current?.removeAttribute("hidden");
      }

      setCalculatedBMR(bmr);
      setCalNeed1(cal1);
      setCalNeed2(cal2);
      setCalNeed3(cal3);
      setCalNeed4(cal4);
      setCalNeed5(cal5);
    }
  };

  const resetInputs = () => {
    ageInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';

    setSelectedSex('');

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
            <IonTitle>BMR Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid class="forecast_container">
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Usia</IonLabel>
                <IonInput ref={ageInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonRadioGroup value={selectedSex} onIonChange={e => setSelectedSex(e.detail.value)}>
                <IonListHeader>
                    <IonLabel>Jenis Kelamin</IonLabel>
                </IonListHeader>

                <IonRow>
                    <IonItem>
                        <IonLabel>Laki-laki</IonLabel>
                        <IonRadio slot="start" value="L" />
                    </IonItem>

                    <IonItem>
                        <IonLabel>Perempuan</IonLabel>
                        <IonRadio slot="start" value="P" />
                    </IonItem>
                </IonRow>
              </IonRadioGroup>
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

          <BmrControls onCalculate={calculateBMR} onReset={resetInputs} />

          {calculatedBMR && calculatedCalNeed1 && calculatedCalNeed2 && calculatedCalNeed3 && calculatedCalNeed4 && calculatedCalNeed5 && (
            <BmrResult allResults={results} bmrResult={calculatedBMR} calNeed1={calculatedCalNeed1} calNeed2={calculatedCalNeed2} calNeed3={calculatedCalNeed3} calNeed4={calculatedCalNeed4} calNeed5 ={calculatedCalNeed5} />
          )}
        </IonGrid>
      </IonApp>
    </>
  )
};

export default App;
