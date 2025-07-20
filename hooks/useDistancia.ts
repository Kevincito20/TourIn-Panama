//Gps y manejo de ubicacion
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export function useDistancia(defaultKm = 10) {
  const params = useLocalSearchParams();
  const [distancia, setDistancia] = useState(defaultKm * 1000); // en metros

  useEffect(() => {
    if (params?.nuevaDistancia) {
      const nueva = parseInt(params.nuevaDistancia as string);
      if (!isNaN(nueva)) {
        setDistancia(nueva);
      }
    }
  }, [params]);

  return distancia;
}
