import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { MapaConRadio } from '@/components/inicio/radio/MapaRadio';
import { SelectorDeRadio } from '@/components/inicio/radio/SelectorRadio';
import { obtenerRadioKm, guardarRadioKm } from '@/components/inicio/radio/RadioStorage';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '@/hooks/useMensajeExito';
import { useUsuario } from '@/hooks/useUsuario';

export default function SeleccionarRadioScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [radioKm, setRadioKm] = useState(10);
  const router = useRouter();
  const mostrarMensaje = useToast();
  const { usuario } = useUsuario();

  // Solo ejecuta el efecto cuando el usuario esté cargado
  useEffect(() => {
    if (!usuario?.id_usuario) return;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso denegado', 'No se pudo obtener tu ubicación.');
          return;
        }

        // Obtener radio guardado solo si hay usuario válido
        const savedKm = await obtenerRadioKm(usuario.id_usuario);
        setRadioKm(savedKm);
       

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error cargando datos de ubicación y radio:', error);
      }
    })();
  }, [usuario]);

  const handleConfirmar = async () => {
    if (!usuario?.id_usuario) return;

    try {
      await guardarRadioKm(usuario.id_usuario, radioKm);
     
      mostrarMensaje('Radio guardado');
      setTimeout(() => {
        router.push({
          pathname: '/(tabs)/pantalla_home',
          params: { nuevaDistancia: radioKm * 1000 },
        });
      }, 1000);
    } catch (error) {
      console.error('Error guardando radioKm:', error);
    }
  };

  const handleVolver = () => {
    router.back();
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Obteniendo tu ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <TouchableOpacity onPress={handleVolver} style={styles.botonVolver}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <MapaConRadio location={location} radioKm={radioKm} />
      <View style={styles.selectorContainer}>
        <SelectorDeRadio radioKm={radioKm} setRadioKm={setRadioKm} onConfirm={handleConfirmar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonVolver: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    left: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 8,
  },
  selectorContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
