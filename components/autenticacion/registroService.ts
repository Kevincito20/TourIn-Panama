// components/autenticacion/authService.ts
import { Alert } from 'react-native';

// Tipos de datos
export interface PropRegistro {
  nombre: string;
  username: string;
  contraseña: string;
  celular: string;
  nacionalidad: string;
}


const API_BASE_URL = 'https://tu-api.com/api/v1';


export const registrarUsuario = async (datos: PropRegistro): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    const data = await response.json();

    if (!response.ok) {
      // Si la API devuelve mensajes de error específicos
      const errorMessage = data.message || 'Error en el registro';
      throw new Error(errorMessage);
    }

    // Si todo sale bien, devuelve true
    return true;
  } catch (error) {
    console.error('Error en registro:', error);
    
    // Mostrar alerta con el error (opcional)
    if (error instanceof Error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Error', 'Ocurrió un error durante el registro');
    }
    
    return false;
  }
};