interface GuardarEnItinerarioParams {
  fecha: string;     // formato: "YYYY-MM-DD"
  hora: string;      // formato: "HH:mm:ss"
  nota: string;
  id_act: number;
  id_u: number;
}


export async function guardarActividadEnItinerario(datos: GuardarEnItinerarioParams) {
  try {
    const response = await fetch('https://apitourinpanama.onrender.com/actividad/itinerario/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      throw new Error('Error al guardar la actividad en el itinerario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al guardar la actividad:', error);
    throw error;
  }
}

//DEVUELVE ID DE USUARIO
