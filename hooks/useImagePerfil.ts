import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '@/components/services/fotoPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useImageUploader = (setImageUri?: (uri: string) => void) => {
  const requestPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
      return false;
    }
    return true;
  };

  const selectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.canceled) return;

    const selectedImage = result.assets[0];
    await handleImageUpload(selectedImage.uri);
  };

  const handleImageUpload = async (uri: string) => {
    const usuario = await AsyncStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario) : null;
    if (!idUsuario.id_usuario) {
      Alert.alert('Error', 'No se encontró el usuario');
      return;
    }
    const response = await uploadImage(uri, idUsuario.id_usuario);
    if (!response) {
      Alert.alert('Error', 'No se pudo subir la imagen al servidor.');
      return;
    }

    const urlPublica = response.url.nueva_url;
    setImageUri?.(urlPublica);

    Alert.alert(response.mensaje, '', [
      { text: 'Ver imagen', onPress: () => Linking.openURL(urlPublica) },
      { text: 'Cerrar', style: 'cancel' },
    ]);
  };

  return {
    selectImage,
  };
};
