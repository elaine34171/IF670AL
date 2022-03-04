import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, settingsSharp, warningSharp } from 'ionicons/icons';

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

import MailTabs from './pages/MailTabs';
import MeetTabs from './pages/MeetTabs';
import SpamTabs from './pages/SpamTabs';
import Settings from './pages/Settings';
import MailDetail from './pages/MailDetail';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <h2>Hello World</h2>

    <IonReactRouter>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              IonMail
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/tabs/mail">
                <IonIcon slot="start" icon={list} />
                <IonLabel>All Mail</IonLabel>
              </IonItem>

              <IonItem button routerLink="/tabs/spam">
                <IonIcon slot="start" icon={warningSharp} />
                <IonLabel>Spam</IonLabel>
              </IonItem>

              <IonItem button routerLink="/settings">
                <IonIcon slot="start" icon={settingsSharp} />
                <IonLabel>Settings</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="main">
        <Redirect exact from="/" to="/tabs" />
        
        <Route exact path="/tabs" component={MailTabs} />
        <Route exact path="/tabs/Mail" component={MailTabs} />
        <Route exact path="/tabs/Meet" component={MeetTabs} />

        <Route exact path="/tabs/Spam" component={SpamTabs} />
        <Route path="/settings" component={Settings} />

        <Route path="/mail/:mailId" component={MailDetail} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
