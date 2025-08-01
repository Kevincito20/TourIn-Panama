import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import React, { useState } from 'react';
import { Alert, Button, Image, Linking, View } from 'react-native';

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const tomarImagen = async () => {
 
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceder a tu galería');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (res.canceled) return;

    
    await subiraAPI(res.assets[0].uri);
  };

  const subiraAPI = async (uri: string) => {
    try {
      const fileExt  = uri.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}.${fileExt}`;
      const fileType = mime.getType(uri) || 'image/jpeg';

      
    const formData = new FormData();
    formData.append('imagen', {
      uri,
      name: fileName,
      type: fileType,
    } as any); 

    
    const id = 1;// reemplazalo por el id real del usuario.

    const response = await fetch(`https://apitourinpanama.onrender.com/perfiles/cargar/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      console.error('Falló la subida:', await response.text());
      Alert.alert('Error', 'No se pudo subir la imagen al backend');
      return;
    }

    const data = await response.json();
    
    const publicUrl = data.url.nueva_url; 
    setImageUrl(publicUrl);
      

      Alert.alert(
        'Éxito',
        data.mensaje,
        [
          {
            text: 'Ver imagen',
            onPress: () => Linking.openURL(publicUrl),
          },
          { text: 'Cerrar', style: 'cancel' },
        ]
      );
    } catch (err) {
      console.error('Error general:', err);
      Alert.alert('Error', 'Ocurrió un problema al subir la imagen');
    }
  };

  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginBottom: 15 }} />
      )}
      <Button title="Seleccionar imagen" onPress={tomarImagen} />
    </View>
  );
};

export default ImageUploader;
