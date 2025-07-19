// Este archivo contiene la lógica para autenticar usuarios en la aplicación.
// Utiliza la API de tu backend para verificar las credenciales del usuario.
// NO TOCAR
export interface propLogin {
  email: string;
  password: string;
}

export const loginUsuario = async (datos: propLogin): Promise<boolean> => {
  try {
    const response = await fetch('https://apitourinpanama.onrender.com/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      console.warn(`Error de servidor: ${response.status}`);
      return false;
    }
    const data = await response.json();
    if (data?.autenticado === true) {
      return true;
    } else {
      console.warn('Respuesta inesperada del backend:', data);
      return false;
    }
  } catch (error) {
    console.error('Error de red en loginUsuario:', error);
    return false;
  }
};


/* // components/services/authService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface propLogin {
  email: string;
  password: string;
}

export const loginUsuario = async ({ email, password }: propLogin): Promise<boolean> => {
  try {
    const response = await fetch('https://tu-api.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) return false;

    const data = await response.json();

    if (data?.token) {
      await AsyncStorage.setItem('userToken', data.token); // guarda token real
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return false;
  }
}; */

