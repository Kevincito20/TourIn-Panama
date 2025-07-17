export async function fetchActividadesCercanas(lat: number, lon: number, distancia: number) {
  try {
    const response = await fetch(
      `https://apitourinpanama.onrender.com/actividad/cercanas_de/${lat}/${lon}/${distancia}`
    );
    if (!response.ok) throw new Error('Error al cargar actividades');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchActividadesCercanas:', error);
    return [];
  }
}
