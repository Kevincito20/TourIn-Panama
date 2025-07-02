 import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="pantalla_iniciar_sesion" 
        options={{ 
          headerShown: false,
          title: 'Iniciar Sesión'
        }} 
      />
      <Stack.Screen 
        name="pantalla_registrarse" 
        options={{ 
          title: 'Registrarse',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
} 