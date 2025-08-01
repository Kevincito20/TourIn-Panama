import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { handlePressUbicacion } from "../mapa/handlePress";

interface ModalContenidoProps {
  description: string;
  ubicacion: string;
  rating: number;
  latitud: number;
  longitud: number;
  onCrearComentario: () => void;
  
}

export function ModalContenido({
  description,
  ubicacion,
  rating,
  latitud,
  longitud,
  onCrearComentario,
}: ModalContenidoProps) {
  const router = useRouter();

  const handleAbrirMapa = () => {
    handlePressUbicacion(latitud,longitud)
   /*  router.push({
      pathname: "/(tabs)/Actividades", 
      params: {
        latitud: latitud.toString(),
        longitud: longitud.toString(),
        titulo: ubicacion,
      },
    }); */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity onPress={handleAbrirMapa} activeOpacity={0.9}>
        <MapView
          style={styles.map}
          region={{
            latitude: latitud,
            longitude: longitud,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={{ latitude: latitud, longitude: longitud }} />
        </MapView>
        <Text style={styles.mapLabel}>
          <Ionicons name="location-outline" size={16} /> {ubicacion}
        </Text>
      </TouchableOpacity>

      <View style={styles.ratingRow}>
        <Ionicons name="star-outline" size={18} color={colors.warmYellow} />
        <Text style={styles.ratingText}>{rating.toFixed(1)} / 5</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onCrearComentario}>
        <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.white} />
        <Text style={styles.buttonText}>Escribir comentario </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14.5,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  map: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  mapLabel: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
