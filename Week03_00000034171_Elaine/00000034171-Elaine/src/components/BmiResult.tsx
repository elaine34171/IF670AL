import React, { RefObject } from 'react';
import { IonRow, IonCol, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const BmiResult: React.FC<{allResults: RefObject<HTMLIonRowElement>; numResult: number; catResult: string}> = props => {
    return(
        <IonRow ref={props.allResults}>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <IonCardTitle>{props.numResult}</IonCardTitle>
                        <IonCardSubtitle>{props.catResult}</IonCardSubtitle>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};

export default BmiResult;