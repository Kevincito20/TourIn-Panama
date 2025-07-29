//Obtener comentarios de una actividad 

export interface Comentario {
    encabezado: string;
    opinion:string;
    fecha_creacion: string;
    id_user:number;
    nombre_usuario: string;
    apellido_usuario: string;
    foto: string;
    sesion: boolean;
}

export async function obtenerComentariosActividad(
  id_usuario: number,
  id_actividad: number
): Promise<Comentario[]> {
  try {
    const response = await fetch(
      `https://apitourinpanama.onrender.com/actividad/get/comentarios?id_usuario=${id_usuario}&id_actividad=${id_actividad}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener comentarios: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Comentario[];
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error;
  }
}



