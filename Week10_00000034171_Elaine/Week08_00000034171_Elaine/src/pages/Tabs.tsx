import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { happy, sad } from "ionicons/icons";
import { Redirect, Route } from "react-router";

import GoodMemories from "./GoodMemories";
import BadMemories from "./BadMemories";
import NewMemory from "./NewMemory";

const Tabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/good" />

                <Route exact path="/tabs/good" component={GoodMemories} />
                <Route exact path="/tabs/bad" component={BadMemories} />
                <Route exact path="/tabs/new" component={NewMemory} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color="primary">
                <IonTabButton tab="good" href="/tabs/good">
                    <IonIcon icon={happy} />
                    <IonLabel>Good Memories</IonLabel>
                </IonTabButton>

                <IonTabButton tab="bad" href="/tabs/bad">
                    <IonIcon icon={sad} />
                    <IonLabel>Bad Memories</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;