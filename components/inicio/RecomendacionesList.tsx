import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { Actividad } from '../types/ActividadesRecomendadas';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type Props = {
  actividades: Actividad[];
};

export const RecomendacionesList = ({ actividades }: Props) => {
  const router = useRouter();

  const handlePress = (item: Actividad) => {
    router.push({
      pathname: '/(modales)/actividades-info',
      params: {
        id: item.id.toString(),
        encabezado: item.encabezado,
        foto_url: item.foto_url,
        latitud: item.latitud.toString(),
        longitud: item.longitud.toString(),
        descp: item.descp,
        rating: item.rating.toString(),
      },
    });
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width * 0.8 + 16}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.listContent}
      data={actividades.slice(0, 10)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={() => handlePress(item)}>
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
              <Text numberOfLines={1} style={styles.nombreActividad}>{item.encabezado}</Text>
            </View>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={colors.warmYellow} />
              <Text style={styles.badgeText}>{item.rating}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
    maxWidth: width * 0.6,
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
});
