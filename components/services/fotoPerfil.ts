import { UploadResponse } from '../types/images';
import { getFileData } from '../utils/subirImagen';

export const uploadImage = async (uri: string, userId: number): Promise<UploadResponse | null> => {
  try {
    const file = getFileData(uri);

    const formData = new FormData();
    formData.append('imagen', file as any);

    const response = await fetch(`https://apitourinpanama.onrender.com/perfiles/cargar/${userId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error en la respuesta del servidor:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return null;
  }
};
