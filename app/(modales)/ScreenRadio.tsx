import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { MapaConRadio } from '@/components/inicio/radio/MapaRadio';
import { SelectorDeRadio } from '@/components/inicio/radio/SelectorRadio';
import { obtenerRadioKm, guardarRadioKm } from '@/components/inicio/radio/RadioStorage';
import { Ionicons } from '@expo/vector-icons';

export default function SeleccionarRadioScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [radioKm, setRadioKm] = useState(10);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener tu ubicación.');
        return;
      }

      const savedKm = await obtenerRadioKm();
      setRadioKm(savedKm);

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleConfirmar = async () => {
    await guardarRadioKm(radioKm);
    router.push({
      pathname: '/(tabs)/pantalla_home',
      params: { nuevaDistancia: radioKm * 1000 },
    });
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
