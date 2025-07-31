import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from '@/hooks/useMensajeExito'; 

export default function RootLayout() {
  return (
    <ToastProvider> 
      <StatusBar backgroundColor="black" style="light" />
      <Stack>
        <Stack.Screen name="(autenticacion)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modales)" options={{ headerShown: false }} />
     
      </Stack>
    </ToastProvider>
  );
}
