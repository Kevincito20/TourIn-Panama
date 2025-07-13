import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

interface Props {
  encabezado: string;
  descp?: string;
  rating: number;
  foto_url: string;
  onPress: () => void;
}

const ListaActividades = ({ encabezado, descp, rating, foto_url, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: foto_url }} style={styles.image} />
      <Text style={styles.title}>{encabezado}</Text>
      {descp && <Text style={styles.desc}>{descp}</Text>}
      <Text style={styles.rating}> {rating}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 8,
  },
  rating: {
    fontSize: 14,
    color: '#000',
    margin: 8,
  },
});

export default ListaActividades;
