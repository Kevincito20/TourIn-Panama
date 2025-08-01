// RadioStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function guardarRadioKm(userId: number, km: number) {
  try {
    await AsyncStorage.setItem(`radioKmUsuario:${userId}`, km.toString());
   
  } catch (error) {
    console.error('Error guardando radioKm:', error);
  }
}

export async function obtenerRadioKm(userId: number): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(`radioKmUsuario:${userId}`);
   
    return value ? parseInt(value, 10) : 10;
  } catch (error) {
    console.error('Error obteniendo radioKm:', error);
    return 10;
  }
}
