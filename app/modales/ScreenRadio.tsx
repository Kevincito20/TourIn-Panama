import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';

const opcionesKm = [5, 10, 15, 20];

export default function SeleccionarRadio() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [radioKm, setRadioKm] = useState(10);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener tu ubicación.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();

    if (params?.distanciaActual) {
      const km = parseInt(params.distanciaActual as string) / 1000;
      setRadioKm(km);
    }
  }, []);

  const handleConfirmar = () => {
    router.push({
      pathname: '/(tabs)/pantalla_home',
      params: { nuevaDistancia: radioKm * 1000 },
    });
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Cargando mapa y ubicación...</Text>
      </View>
    );
  }

  const { latitude, longitude } = location.coords;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Tu ubicación" />
        <Circle
          center={{ latitude, longitude }}
          radius={radioKm * 1000}
          strokeColor="rgba(79, 70, 229, 0.8)"
          fillColor="rgba(79, 70, 229, 0.2)"
        />
      </MapView>

      <View style={styles.selectorContainer}>
        <View style={styles.radioContainer}>
          {opcionesKm.map((km) => (
            <TouchableOpacity
              key={km}
              style={[styles.radioBtn, km === radioKm && styles.radioBtnSelected]}
              onPress={() => setRadioKm(km)}
            >
              <Text style={km === radioKm ? styles.radioTextSelected : styles.radioText}>
                {km} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmar}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 12,
    elevation: 6,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radioBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  radioBtnSelected: {
    backgroundColor: '#4F46E5',
  },
  radioText: {
    color: '#1F2937',
    fontWeight: '500',
  },
  radioTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
