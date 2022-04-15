import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import { useContext, useEffect } from 'react';

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

import MemoriesContext from './data/memories-context';
import MemoriesContextProvider from './data/MemoriesContextProvider';
import Tabs from './pages/Tabs';
import './Style.css';

setupIonicReact();

const App: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const {initContext} = memoriesCtx;

  useEffect(() => {
    initContext();
  }, [initContext]);

  return(
  <IonApp>
    <IonReactRouter>
      {/* <MemoriesContextProvider> */}
        <IonRouterOutlet id="main">
          <Redirect exact from="/" to="/tabs" />
            
          <Route exact path="/tabs" component={Tabs} />
          <Route exact path="/tabs/good" component={Tabs} />
          <Route exact path="/tabs/bad" component={Tabs} />
          <Route exact path="/tabs/new" component={Tabs} />
        </IonRouterOutlet>
      {/* </MemoriesContextProvider> */}
    </IonReactRouter>
  </IonApp>
)};

export default App;

export const LOCALHOST = "http://localhost/memories_api/";
export const API_KEY = "API_KEY";
