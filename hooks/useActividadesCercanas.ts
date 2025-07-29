// useActividadesCercanas.ts
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { Actividad } from '@/components/types/ActividadesRecomendadas';
import { fetchActividadesCercanas } from '@/components/services/ActividadesCercanas';

export function useActividadesCercanas(distancia: number) {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener tu ubicación.');
        setLoading(false);
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    async function cargarActividades() {
      if (!location) return;
      setLoading(true);
      const datos = await fetchActividadesCercanas(location.latitude, location.longitude, distancia);
      setActividades(datos);
      setLoading(false);
    }
    cargarActividades();
  }, [distancia, location]);

  return { actividades, loading };
}
