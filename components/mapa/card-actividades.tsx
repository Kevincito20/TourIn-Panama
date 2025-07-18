import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Actividades = ({ marker, bottomSheetRef, mapRef,seguir,mostrarSoloCuerpo }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [siguiendoRuta, setSiguiendoRuta] = useState(false);
  const router = useRouter();

  const handleSeguir = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  const handleGuardar = () => {
    console.log("Guardado en itinerario");
    setMostrarOpciones(false);
  };

  const handleCancelar = () => {
    setMostrarOpciones(false);
  };

  const panamaView = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 15,
    pitch: 0,
    heading: 0,
    altitude: 1000,
  };
    const panamaView2 = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 12,
    pitch: 0,
    heading: 0,
    altitude: 1000,
  };

  return (
    <View style={styles.card}>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/actividades-info',
            params: {
              id: marker.id,
              encabezado: marker.encabezado,
              descp: marker.descp,
              foto_url: marker.foto_url,
              latitud: marker.latitud,
              longitud: marker.longitud,
              rating: marker.rating,
            },
          })
        }
        style={styles.actividadBtn}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: marker.foto_url }} style={styles.image} />

          {/* Etiqueta */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Parque Nacional</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{marker.rating.toFixed(1)}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{marker.encabezado}</Text>

        <View style={styles.distanceRow}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <Text style={styles.distanceText}>2.3 km</Text>
        </View>

        <Text style={styles.description}>
          {marker.descp}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => {
              setSiguiendoRuta(true); // activar botón de cierre
              mapRef.current?.animateCamera(panamaView, { duration: 1000 });
              bottomSheetRef.current?.snapToIndex(0);
              router.push({
                pathname: '/pantalla_mapa copy',
                params: {
                  lat: String(marker.latitud),
                  lng: String(marker.longitud),
                },
              });
            }}
          >
            <Ionicons name="navigate" size={16} color="white" />
            <Text style={styles.followText}>Ver indicaciones</Text>
          </TouchableOpacity>

           

          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-social-outline" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón flotante para cancelar seguimiento */}
      {siguiendoRuta && (
        <TouchableOpacity
          style={styles.cerrarRutaBtn}
          onPress={() => {
            setSiguiendoRuta(false);
             mapRef.current?.animateCamera(panamaView2, { duration: 1000 });
              bottomSheetRef.current?.snapToIndex(0);
              router.push({
                pathname: '/pantalla_mapa copy',
                params: {
                  lat: String(0),
                  lng: String(0),
                },
              });
            // Aquí podrías agregar más lógica si quieres ocultar una ruta, etc.
          }}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actividadBtn: {
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ffffffb9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  ratingBox: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffffcc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  distanceText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //seguinbtn
  followBtn1: {
    top:10,
    position:'absolute',
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  followBtn: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  followText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  shareBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  cerrarRutaBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#EF4444',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    zIndex: 999,
  },
});

export default Actividades;
