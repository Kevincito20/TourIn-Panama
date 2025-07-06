import { Stack } from 'expo-router';

export default function ConocerPanamaLayout() {
  return (
    <Stack>
      <Stack.Screen name="historia" options={{ title: 'Historia' }} />
      <Stack.Screen name="geografia" options={{ title: 'Geografía' }} />
      <Stack.Screen name="datos-curiosos" options={{ title: 'Datos Curiosos' }} />
      <Stack.Screen name="cultura" options={{ title: 'Cultura' }} />
    </Stack>
  );
}