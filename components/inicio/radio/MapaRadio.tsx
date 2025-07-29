import React from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import { LocationObject } from 'expo-location';

type Props = {
  location: LocationObject;
  radioKm: number;
};

export const MapaConRadio = ({ location, radioKm }: Props) => {
  const { latitude, longitude } = location.coords;

  return (
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
  );
};
