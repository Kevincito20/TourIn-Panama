import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/components/types/Usuario';

export const useUsuario = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargarUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario');
      if (jsonValue) {
        const parsed = JSON.parse(jsonValue);
        setUsuario(parsed);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error('Error al cargar usuario desde AsyncStorage:', error);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  return { usuario, cargando, refetch: cargarUsuario };
};
