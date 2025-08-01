export interface CrearComentarioPayload {
  id_usuario: number;
  id_actividad: number;
  titulo: string;
  comentario: string;
  calificacion: number;
}

export interface CrearComentarioResponse {
  success: boolean;
  mensaje?: string;
}

export async function crearComentarioActividad(payload: CrearComentarioPayload): Promise<CrearComentarioResponse> {
  try {
    const response = await fetch('https://apitourinpanama.onrender.com/actividad/crear/comentarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error al crear comentario: ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return {
        success: false,
        mensaje: "Respuesta inesperada del servidor",
      };
    }

    return {
      success: data.success ?? true,
      mensaje: data.mensaje ?? "Comentario creado correctamente",
    };

  } catch (error) {
    console.error('Error al crear comentario:', error);
    return {
      success: false,
      mensaje: "Error inesperado al crear el comentario.",
    };
  }
}

