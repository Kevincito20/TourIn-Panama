import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
        <Image
          source={require('@/assets/logo_Tour.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});