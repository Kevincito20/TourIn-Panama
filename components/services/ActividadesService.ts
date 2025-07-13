import { ActividadesProps } from "../types/Actividades";

export const obtenerActividades = async (): Promise<ActividadesProps[]> => {
  try {
    const response = await fetch('https://apitourinpanama.onrender.com/actividad/get', );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al obtener las actividades:', error);
    return []; 
  }
};
