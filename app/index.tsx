/* import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (userToken) {
        router.replace('/(tabs)/pantalla_home');
      } else if (hasCompletedOnboarding) {
        // Usuario no autenticado pero ya completó onboarding
        router.replace('/(autenticacion)/pantalla_iniciar_sesion');
      } else {
        // Primera vez - mostrar onboarding
        router.replace('/(autenticacion)/pantalla_iniciar_sesion');
      }
      
    } catch (error) {
      console.error('Error checking initial route:', error);
      // En caso de error, ir a autenticación
      router.replace('/(autenticacion)/pantalla_iniciar_sesion');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
       
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🏝️</Text>
            <Text style={styles.logoText}>PANAMA</Text>
          </View>
          
          <Text style={styles.title}>Tour in Panama</Text>
          <Text style={styles.subtitle}>Descubre la belleza de Panamá</Text>
          
         
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Iniciando aplicación...</Text>
          </View>
        </View>
        
        <Text style={styles.footer}>© 2024 Tour in Panama</Text>
      </View>
    );
  }

  
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E40AF',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 100,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    textAlign: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#93C5FD',
    textAlign: 'center',
    marginBottom: 60,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500',
  },
  footer: {
    color: '#93C5FD',
    textAlign: 'center',
    paddingBottom: 40,
    fontSize: 14,
    fontWeight: '400',
  },
}); */