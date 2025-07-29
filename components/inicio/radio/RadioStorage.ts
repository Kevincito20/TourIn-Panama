import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'radioKmUsuario';

export async function guardarRadioKm(km: number) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, km.toString());
  } catch (error) {
  }
}

export async function obtenerRadioKm(): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value ? parseInt(value) : 10; 
  } catch (error) {
    return 10;
  }
}
