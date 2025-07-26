export async function verItinerario(idUser: number) {
  try {
    const response = await fetch(`https://apitourinpanama.onrender.com/user/get/itinerario/${idUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      throw new Error('Error al obtener el itinerario');
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      console.warn("La respuesta no es un arreglo, adaptando a arreglo:", data);
      return [data]; 
    } else {
      console.warn("La respuesta del itinerario no es válida:", data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener el itinerario:', error);
    return [];
  }
}
