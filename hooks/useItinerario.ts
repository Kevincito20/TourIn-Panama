// components/Itinerario/useItinerario.ts
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verItinerario } from '@/components/services/verItinerarioService';
import { ItinerarioItem} from '@/components/types/Itinerario';
export const useItinerario = () => {
  const [actividades, setActividades] = useState<ItinerarioItem[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const userData = await AsyncStorage.getItem('usuario');
      const usuario = userData ? JSON.parse(userData) : null;

      if (usuario?.id_usuario) {
        const datos = await verItinerario(Number(usuario.id_usuario));
        if (Array.isArray(datos)) {
          setActividades(datos);
        } else if (typeof datos === 'object') {
          setActividades([datos]);
        } else {
          setActividades([]);
        }
      } else {
        setActividades([]);
      }
    } catch (error) {
      console.error('Error al cargar el itinerario:', error);
      setActividades([]);
    } finally {
      setCargando(false);
    }
  };

  return { actividades, cargando, cargarDatos };
};
