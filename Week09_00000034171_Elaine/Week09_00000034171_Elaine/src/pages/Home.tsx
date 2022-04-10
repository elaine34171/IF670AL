import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import './Home.css';

const Home: React.FC = () => {
  const [centerLat, setCenterLat] = useState(-6.257377926995551);
  const [centerLng, setCenterLng] = useState(106.61829861017398);

  const [lat, setLat] = useState(-6.257377926995551);
  const [lng, setLng] = useState(106.61829861017398);

  const [centerState, setCenterState] = useState(true);

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()){
      setLat(e.latLng?.lat());
      setCenterLat(e.latLng?.lat());
    }

    if(e.latLng?.lng()){
      setLng(e.latLng?.lng());
      setCenterLng(e.latLng?.lng());
    }
  };

  const getCurrentPosition = async() => {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true});

    console.log('Current positions: ', coordinates);
    console.log('Lat: ', coordinates.coords.latitude);
    console.log('Lng: ', coordinates.coords.longitude);

    setCenterLat(coordinates.coords.latitude);
    setCenterLng(coordinates.coords.longitude);

    setCenterState(!centerState);
  };

  const trackPosition = async() => {
    const data = await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 1000
    }, (position, err) => {
      if(position){
        console.log(position);
      }
    })
  };

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>00000034171</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="ion-text-center">
          <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
          <IonButton onClick={trackPosition}>Track Position</IonButton>
        </div>

        <LoadScript googleMapsApiKey="AIzaSyDfqb403mTCmfngO9lR-mT1JMibIhx8re4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat: centerLat, lng: centerLng}}
            zoom={10}
            onClick={selectPos}
          >
            <></>
            <InfoWindow position={{lat: -6.257377926995551, lng: 106.61829861017398}}>
              <div>
                <h1>Kampus paling keren.</h1>
              </div>
            </InfoWindow>

            <Marker position={{lat: lat, lng: lng}} />

            <Marker label="U" position={{lat: -6.257377926995551, lng: 106.61829861017398}} />
          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
