import * as Location from 'expo-location';
import { useRef, useState } from 'react';
import MapView from 'react-native-maps';


type latlng = {
    latitude:number;
    longitude:number;
}
export default function RastreoUbicacion() {
  const mapRef = useRef<MapView | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null); // referencia al seguimiento

  const [origin, setOrigin] = useState<latlng>();

  const iniciarRastreo = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso de ubicación denegado');
      return;
    }

    // Detener rastreo anterior si existe
    if (watchRef.current) {
      watchRef.current.remove();
    }

    // Inicia nuevo rastreo
    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 1,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setOrigin({ latitude, longitude });

        mapRef.current?.animateCamera({
          center: { latitude, longitude },
          zoom: 15,
          altitude: 1000,
        });
      }
    );

    watchRef.current = sub;
  };


}
