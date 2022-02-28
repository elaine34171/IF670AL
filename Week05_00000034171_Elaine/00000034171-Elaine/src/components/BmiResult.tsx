import React, { RefObject } from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

import './BmiResult.css';

const BmiResult: React.FC<{allResults: RefObject<HTMLIonRowElement>; numResult: number; catResult: string}> = props => {
    var cardClass;

    if(props.catResult == "Normal"){
        cardClass = "ion-card-success";
    }
    else{
        if(props.catResult == "Gemuk" || props.catResult == "Kurus"){
            cardClass = "ion-card-warning";
        }
        else{
            cardClass = "ion-card-danger"
        }
    }
    
    return(
        <IonRow ref={props.allResults}>
            <IonCol>
                <IonCard id="result" className={cardClass}>
                    <IonCardContent className="ion-text-center">
                        <h2>{props.numResult}</h2>
                        <h1>{props.catResult}</h1>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};

export default BmiResult;