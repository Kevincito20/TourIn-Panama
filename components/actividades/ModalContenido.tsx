import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActividadesProps } from '../types/Actividades';

interface Props {
  actividad: ActividadesProps;
}

const ActividadModalContent: React.FC<Props> = ({ actividad }) => {
  const handleOpenMap = () => {
    let url = '';

    if (actividad.latitud && actividad.longitud) {
      url = `https://www.google.com/maps/search/?api=1&query=${actividad.latitud},${actividad.longitud}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        actividad.ubicacion
      )}`;
    }

    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.descripcion}>
          {actividad.descripcion || 'Sin descripción disponible para esta actividad.'}
        </Text>
      </View>

      <TouchableOpacity style={styles.mapaBtn} onPress={handleOpenMap}>
        <Ionicons name="map-outline" size={20} color="white" />
        <Text style={styles.mapaText}> Ver ruta en el mapa</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué puedes hacer aquí?</Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>• Senderismo</Text>
          <Text style={styles.bullet}>• Fotografías panorámicas</Text>
          <Text style={styles.bullet}>• Avistamiento de aves</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividades similares</Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>• Tour Isla Taboga</Text>
          <Text style={styles.bullet}>• Camping en Cerro Azul</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.guardarBtn}>
        <Ionicons name="bookmark-outline" size={20} color="white" />
        <Text style={styles.guardarText}> Guardar en Itinerario</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
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
  },
  mapaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 24,
  },
  mapaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  list: {
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  guardarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  guardarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ActividadModalContent;