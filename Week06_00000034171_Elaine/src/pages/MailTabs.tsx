import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { mailOutline, videocamOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router";

import Mail from "./Mail";
import Meet from "./Meet";

const MailTabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/mail" />
                
                <Route exact path="/tabs/mail" component={Mail} />
                <Route exact path="/tabs/meet" component={Meet} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="mail" href="/tabs/mail">
                    <IonIcon icon={mailOutline} />
                    <IonLabel>Mail</IonLabel>
                </IonTabButton>

                <IonTabButton tab="meet" href="/tabs/meet">
                    <IonIcon icon={videocamOutline} />
                    <IonLabel>Meet</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MailTabs;