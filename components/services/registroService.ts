// components/autenticacion/authService.ts
//NO TOCAR
import { Alert } from 'react-native';

// Tipos de datos
export interface PropRegistro {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  identificacion: string;
}

const API_BASE_URL = 'https://apitourinpanama.onrender.com';

export const RegistrarUsuario = async (datos: PropRegistro): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || 'Error en el registro';
      throw new Error(errorMessage);
    }
    return true;

  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error instanceof Error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Error', 'Ocurrió un error durante el registro');
    }
    
    return false;
  }
};