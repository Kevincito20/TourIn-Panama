/* import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ActividadesProps } from '@/components/types/Actividades';

interface Props {
  actividad: ActividadesProps;
  onClose: () => void;
}

const ActividadModalContent: React.FC<Props> = ({ actividad, onClose }) => {
  const handleOpenMap = () => {
    if (actividad.latitud && actividad.longitud) {
      const url = `https://www.google.com/maps/search/?api=1&query=${actividad.latitud},${actividad.longitud}`;
      Linking.openURL(url);
    } else {
      alert('No hay ubicación disponible para esta actividad.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: actividad.foto_url }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageInfo}>
            <Text style={styles.location}>
              <Ionicons name="location-outline" size={16} /> {actividad.encabezado}
            </Text>
            <Text style={styles.rating}>
              <MaterialIcons name="star-rate" size={16} color="gold" /> {actividad.rating}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.descripcion}>
          {actividad.descp || 'Sin descripción disponible para esta actividad.'}
        </Text>

        <TouchableOpacity style={styles.mapaBtn} onPress={handleOpenMap}>
          <Ionicons name="map-outline" size={20} color="white" />
          <Text style={styles.mapaText}> Ver ubicación en el mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guardarBtn}>
          <Ionicons name="bookmark-outline" size={20} color="white" />
          <Text style={styles.guardarText}> Agregar a itinerario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  imageInfo: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 12,
  },
  location: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rating: {
    color: 'white',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 20,
  },
  mapaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  mapaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  guardarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
  },
  guardarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ActividadModalContent;
 */