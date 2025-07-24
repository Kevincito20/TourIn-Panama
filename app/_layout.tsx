import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar 
      backgroundColor='black'
      style="light"

      />
      <Stack>
        
        <Stack.Screen 
          name="(autenticacion)" 
          options={{ 
            headerShown: false
          }} 
        />
        
  
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false
          }} 
        />

        <Stack.Screen
        name='modales'
        options={{
          headerShown: false,
        }}
        />
  
 
      </Stack>
    </>
  );
}

/* 
        <Stack.Screen 
          name="pantalla_mapa" 
          options={{ 
            headerShown: false
          }} 
        />*/
