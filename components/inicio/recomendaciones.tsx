import { colors } from '@/constants/Colors';
import { useDistancia } from '@/hooks/useDistancia';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity, View
} from 'react-native';
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
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const distancia = useDistancia();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener tu ubicación.');
        setLoading(false);
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    async function cargarActividades() {
      if (!location) return;

      setLoading(true);
      const datos = await fetchActividadesCercanas(location.latitude, location.longitude, distancia);
      setActividades(datos);
      setLoading(false);
    }

    cargarActividades();
  }, [distancia, location]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  if (actividades.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.textSecondary }}>No se encontraron actividades cercanas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Actividades cerca de ti</Text>
        </View>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => {
            router.push({
              pathname: '/modales/ScreenRadio',
              params: { distanciaActual: distancia },
            });
          }}
        >
          <Text style={styles.radioText}>Radio: {distancia / 1000} km</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primaryBlue} />
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
                <Ionicons name="location-outline" size={14} color={colors.white} />
                <Text style={styles.badgeText}> {(item.distancia_m / 1000).toFixed(1)} km</Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.nombreActividad}>{item.encabezado}</Text>
              </View>

              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color={colors.warmYellow} />
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
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
    marginLeft: 8,
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
    color: colors.white,
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
    color: colors.white,
    fontSize: 12,
    marginLeft: 4,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF', // Mantengo este azul claro para contraste sutil
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  radioText: {
    color: colors.primaryBlue,
    fontWeight: '500',
    marginRight: 6,
  },
});

export default Recomendaciones;
