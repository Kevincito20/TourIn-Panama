export interface propLogin {
  correo: string;
  contraseña: string;
}

export const loginUsuario = async (datos: propLogin): Promise<boolean> => {
  try {
    const response = await fetch('https://tu-api.com/api/login', {
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

    // Manejo más explícito si la API devuelve estructura compleja
    if (data?.success === true) {
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
