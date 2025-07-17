import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const actividades = [
  {
    id: '1',
    nombreActividad: 'Tour Histórico',
    titulo: 'Casco Viejo',
    rating: 4.9,
    imagen: 'https://www.freetour.com/images/tours/33927/free-walking-tour-in-casco-viejo-05.jpg',
    kmCercanos: 1.2,
  },
  {
    id: '2',
    nombreActividad: 'Mirador',
    titulo: 'Cerro Ancón',
    rating: 4.7,
    imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/e9/f5/b3/ancon-hill.jpg?w=1200&h=-1&s=1',
    kmCercanos: 3.8,
  },
  {
    id: '3',
    nombreActividad: 'Biomuseo',
    titulo: 'Calzada de Amador',
    rating: 4.8,
    imagen: 'https://meetingspanama.com/wp-content/uploads/cache/images/Biomuseo-Gehry-Partners-2/Biomuseo-Gehry-Partners-2-306163389.jpg',
    kmCercanos: 2.5,
  },
  {
    id: '4',
    nombreActividad: 'Comida Rápida',
    titulo: 'Wendy´s',
    rating: 5.0,
    imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/ac/9f/96/wendy-s-dover-oh.jpg?w=900&h=500&s=1',
    kmCercanos: 10.5,
  },
  {
    id: '5',
    nombreActividad: 'Play Land Park',
    titulo: 'Villa Lucre',
    rating: 4.8,
    imagen: 'https://aprende.guatemala.com/wp-content/uploads/2024/07/Play-Land-Park-en-Guatemala-Datos-curiosos-sobre-estos-juegos-mecanicos-1.jpg',
    kmCercanos: 0.5,
  },
];

const Recomendaciones = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="sparkles" size={24} color="#F59E0B" />
          <Text style={styles.headerTitle}>Actividades cerca de ti</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.verTodas}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.8 + 16}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        data={actividades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} style={styles.card}>
            <ImageBackground
              source={{ uri: item.imagen }}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.distanceBadge}>
                <Ionicons name="location-outline" size={14} color="#fff" />
                <Text style={styles.badgeText}> {item.kmCercanos} km</Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.nombreActividad}>{item.nombreActividad}</Text>
                <Text style={styles.title}>{item.titulo}</Text>
              </View>

              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FCD34D" />
                <Text style={styles.badgeText}>{item.rating}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  backgroundColor: '#F8FAFC',
  marginTop: 12,
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  marginBottom: 16,
  paddingTop: 8,
  backgroundColor: 'transparent', 
},

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
verTodas: {
  fontSize: 14,
  color: '#4F46E5',
  fontWeight: '500',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 12,
  backgroundColor: '#EEF2FF',
},
  listContent: {
    paddingLeft: 20,
  },
  card: {
    width: width * 0.8,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: 16,
  },
  distanceBadge: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  titleContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
nombreActividad: {
  color: 'white',
  fontSize: 18, 
  fontWeight: 'bold',
  marginBottom: 2,
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
},
title: {
  color: 'white',
  fontSize: 14, 
  fontWeight: '500',
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
},

  ratingBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },

});

export default Recomendaciones;
