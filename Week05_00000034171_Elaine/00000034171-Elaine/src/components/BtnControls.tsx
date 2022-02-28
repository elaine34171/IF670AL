import React from 'react';
import { IonButton, IonRow, IonCol, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
  return(
    <IonRow className="ion-padding">
      <IonCol size="12" size-md="6" className="ion-text-center ion-no-padding">
        <IonButton expand="block" color="success" onClick={props.onCalculate}>
          <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
          Calculate
        </IonButton>
      </IonCol>

      <IonCol size="12" size-md="6" className="ion-text-center ion-no-padding">
        <IonButton fill="clear" color="medium" onClick={props.onReset}>
          <IonIcon slot="start" icon={refreshOutline}></IonIcon>
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;