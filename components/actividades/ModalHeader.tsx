import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ActividadesProps } from '../types/Actividades';
import { Ionicons, AntDesign } from '@expo/vector-icons';

interface Props {
  actividad: ActividadesProps;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

const ActividadModalHeader: React.FC<Props> = ({ actividad, onClose }) => {
  return (
    <View style={styles.header}>
      <Image source={{ uri: actividad.foto_url }} style={styles.image} />

      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <AntDesign name="hearto" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.encabezado}>{actividad.encabezado}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#FBBF24" />
          <Text style={styles.ratingText}>{actividad.rating}/5</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
  },
  topIcons: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  encabezado: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FBBF24',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
});

export default ActividadModalHeader;
