import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('usuario');
        const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

        if (usuario && usuario.autenticado) {
          router.replace('/(tabs)/pantalla_home');
        } else {
          router.replace('/(autenticacion)/pantalla_iniciar_sesion');
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        router.replace('/(autenticacion)/pantalla_iniciar_sesion');
      } finally {
        setIsLoading(false);
      }
    };

    verificarSesion();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image
            source={require('@/assets/logo_Tour.jpg')}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.madeBy}>Hecho por Carniceros</Text>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAF0F8', // azul claro bonito
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80, // lo hace circular
    marginBottom: 20,
  },
  madeBy: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0077B6',
  },
});
