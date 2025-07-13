import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { ActividadesProps } from '../types/Actividades';

const { width, height } = Dimensions.get('window');

export default function CarruselActividades({
  encabezado,
  descp,
  latitud,
  longitud,
  rating,
  foto_url,
  onPress,
}: ActividadesProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={1}>
      <ImageBackground source={{ uri: foto_url }} style={styles.imagen} imageStyle={{ borderRadius: 0 }}>
        
        {/* Capa de opacidad sobre la imagen */}
        <View style={styles.darkOverlay} />

        <View style={styles.overlay}>
          <Text style={styles.titulo}>{encabezado}</Text>

          <Text
            style={styles.descripcion}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {descp}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.ubicacion}>
              Lat: {latitud ?? '---'} / Lon: {longitud ?? '---'}
            </Text>
            <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
          </View>
        </View>
        
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width,
    height: height * 0.5,
  },
  
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    borderRadius: 0,
  },

  imagen: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    width: '75%',
    lineHeight: 20,
  },
  infoRow: {
    marginTop: 10,
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between',
  },
  ubicacion: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    color: '#ccc',
    flexShrink: 1,
  },
  rating: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    color: '#ccc',
    flexShrink: 1,
  },
});
