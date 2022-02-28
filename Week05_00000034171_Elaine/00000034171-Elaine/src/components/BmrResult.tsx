import React, { RefObject } from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

import './BmrResult.css';

const BmrResult: React.FC<{allResults: RefObject<HTMLIonRowElement>; bmrResult: number; calNeed1: number; calNeed2: number; calNeed3: number; calNeed4: number; calNeed5: number;}> = props => {
    return(
        <IonRow ref={props.allResults}>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        BMR = {props.bmrResult.toFixed(2)} calories/day <br/><br/>
                        Daily calorie needs based on activity level <br/>

                        <IonRow>
                            <IonCol className="ion-text-left"><b>Activity Level</b></IonCol>
                            <IonCol className="ion-text-right"><b>Calorie</b></IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol className="ion-text-left">Sedentary: Little or no exercise</IonCol>
                            <IonCol className="ion-text-right">{props.calNeed1.toFixed(2)}</IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol className="ion-text-left">Exercise 1-3 times/week</IonCol>
                            <IonCol className="ion-text-right">{props.calNeed2.toFixed(2)}</IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol className="ion-text-left">Exercise 4-5 times/week</IonCol>
                            <IonCol className="ion-text-right">{props.calNeed3.toFixed(2)}</IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol className="ion-text-left">Daily exercise or intense exercise 3-4 times/week</IonCol>
                            <IonCol className="ion-text-right">{props.calNeed4.toFixed(2)}</IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol className="ion-text-left">Intense exercise 6-7 times/week</IonCol>
                            <IonCol className="ion-text-right">{props.calNeed5.toFixed(2)}</IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};

export default BmrResult;