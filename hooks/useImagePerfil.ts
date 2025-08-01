import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/components/types/Usuario';
import { uploadImage } from '@/components/services/fotoPerfil';

export const useImagePerfil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const selectImage = async () => {
    try {
      setIsLoading(true);
      setStatus('idle');
      setError(null);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
       
        const jsonValue = await AsyncStorage.getItem('usuario');
        if (!jsonValue) throw new Error('Usuario no encontrado en almacenamiento local');
        const usuario: Usuario = JSON.parse(jsonValue);
  
        // Subir imagen y obtener URL desde backend
        const uploadResult = await uploadImage(uri, usuario.id_usuario);

        if (!uploadResult || !uploadResult.url) {
          throw new Error('Error al subir la imagen al servidor');
        }

        usuario.foto = uploadResult.url.nueva_url;

        await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
        setStatus('success');
      }
    } catch (e) {
      console.error('Error en selectImage:', e);
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Error desconocido al seleccionar imagen');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setStatus('idle');
    setError(null);
  };

  return { selectImage, isLoading, status, error, resetState };
};
