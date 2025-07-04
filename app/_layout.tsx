import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        {/* Pantallas de autenticación */}
        <Stack.Screen 
          name="(autenticacion)" 
          options={{ 
            headerShown: false
          }} 
        />
        
        {/* Pantallas principales con tabs */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false
          }} 
        />
      </Stack>
    </>
  );
}