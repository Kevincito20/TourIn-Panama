
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface propLogin {
  email: string;
  password: string;
}

export const loginUsuario = async ({ email, password }: propLogin): Promise<boolean> => {
  try {
    const response = await fetch('https://apitourinpanama.onrender.com/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    
    if (data?.autenticado) {
      await AsyncStorage.setItem('usuario', JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return false;
  }
};

