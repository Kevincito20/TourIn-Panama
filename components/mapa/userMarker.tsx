import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Marker } from 'react-native-maps';

const CustomUserMarker = ({ coordinate }) => {
  return (
    <Marker coordinate={coordinate}
    title="Custom Marker"
      description="This is a custom marker"
    >
      <MaterialCommunityIcons name="navigation" size={30} color="black" />
    </Marker>
  );
};

export default CustomUserMarker;
 