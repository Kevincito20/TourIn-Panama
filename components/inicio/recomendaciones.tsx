import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchActividadesCercanas } from '../services/ActividadesCercanas';

const { width } = Dimensions.get('window');

type Actividad = {
  id: number;
  encabezado: string;
  descp: string;
  rating: number;
  latitud: number;
  longitud: number;
  distancia_m: number;
  foto_url: string;
  id_cat: number;
};


const Recomendaciones = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const lat = 8.935871;
  const lon = -79.548104;
  const distancia = 10000; 

  useEffect(() => {
    async function cargarActividades() {
      setLoading(true);
      const datos = await fetchActividadesCercanas(lat, lon, distancia);
      setActividades(datos);
      setLoading(false);
    }

    cargarActividades();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (actividades.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#666' }}>No se encontraron actividades cercanas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Actividades cerca de ti </Text>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} style={styles.card}>
            <ImageBackground
              source={{ uri: item.foto_url }}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.distanceBadge}>
                <Ionicons name="location-outline" size={14} color="#fff" />
                <Text style={styles.badgeText}> {(item.distancia_m / 1000).toFixed(1)} km</Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.nombreActividad}>{item.encabezado}</Text>
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
    flex: 1,
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
