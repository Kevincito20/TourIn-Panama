import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActividadesProps } from '../types/Actividades';

interface Props {
  actividad: ActividadesProps;
}

const ActividadModalContent: React.FC<Props> = ({ actividad }) => {
  const [guardado, setGuardado] = useState(false);
  const toggleGuardar = () => setGuardado(!guardado);

  const handleOpenMap = () => {
    let url = '';

    if (actividad.latitud && actividad.longitud) {
      url = `https://www.google.com/maps/search/?api=1&query=${actividad.latitud},${actividad.longitud}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        actividad.encabezado
      )}`;
    }

    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

   
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
        {[1, 2, 3].map((i) => (
          <Image
            key={i}
            source={{ uri: actividad.foto_url }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.descripcion}>
          {actividad.descp || 'Sin descripción disponible para esta actividad.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duración estimada</Text>
        <Text style={styles.descripcion}>Aproximadamente 3 horas</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        <Text style={styles.descripcion}>Provincia de Panamá, Cerro Ancón</Text>
        <TouchableOpacity style={styles.mapaBtn} onPress={handleOpenMap}>
          <Ionicons name="map-outline" size={20} color="white" />
          <Text style={styles.mapaText}> Ver ruta en el mapa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué puedes hacer aquí?</Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>• Senderismo</Text>
          <Text style={styles.bullet}>• Fotografías panorámicas</Text>
          <Text style={styles.bullet}>• Avistamiento de aves</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Sabías que...?</Text>
        <Text style={styles.descripcion}>
          Este sendero fue usado por comunidades indígenas como ruta espiritual hacia la cima.
        </Text>
      </View>

      <TouchableOpacity style={styles.guardarBtn} onPress={toggleGuardar}>
        <Ionicons name={guardado ? "bookmark" : "bookmark-outline"} size={20} color="white" />
        <Text style={styles.guardarText}>
          {guardado ? ' Guardado en tu itinerario' : ' Guardar en Itinerario '}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    color: '#374151',
    marginRight: 8,
  },
  gallery: {
    marginBottom: 24,
  },
  galleryImage: {
    width: 120,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
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
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 12,
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
    marginBottom: 4,
  },
  guardarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  guardarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ActividadModalContent;
