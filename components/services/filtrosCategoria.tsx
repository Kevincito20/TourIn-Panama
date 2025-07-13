import { useEffect, useState } from 'react';
import { ActividadesProps } from '../types/Actividades';
import { obtenerActividades } from './ActividadesService';

export const useActividadesPorCategoria = (Id: string | null) => {
  const [actividades, setActividades] = useState<ActividadesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      setError(null);
      try {
        let data: ActividadesProps[] = [];

        if (!Id) {
          data = await obtenerActividades();
        } else {
          const res = await fetch(`https://apitourinpanama.onrender.com/actividad/${Id}`);
          if (!res.ok) throw new Error('Error al obtener actividades por categoría');
          data = await res.json();
        }

        setActividades(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, [Id]);

  return { actividades, loading, error };
};
