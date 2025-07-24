import { Ionicons } from '@expo/vector-icons'; // o 'react-native-vector-icons/Ionicons'
import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

const CustomUserMarker = ({ coordinate }) => {
  return (
    <Marker coordinate={coordinate}>
      <View style={{
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#3880ff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Ionicons name="person-circle" size={40} color="#3880ff" />
      </View>
    </Marker>
  );
};

export default CustomUserMarker;
 