import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const usePerfil = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', onPress: logout, style: 'destructive' },
    ]);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      router.replace('/(autenticacion)/pantalla_iniciar_sesion');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
      console.error(error);
    }
  };

  return { handleLogout };
};
