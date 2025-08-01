import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";

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
    router.push({
      pathname: "/(tabs)/Actividades",
      params: {
        latitud: latitud.toString(),
        longitud: longitud.toString(),
        titulo: ubicacion,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Ubicación */}
      <Text style={styles.sectionTitle}>Ubicación</Text>
      <View style={styles.mapRow}>
        <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.mapLabel}>{ubicacion}</Text>
      </View>

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
      </TouchableOpacity>

      {/* Rating */}
      <View style={[styles.ratingRow, { marginTop: 12 }]}>
        <Ionicons name="star" size={16} color={colors.warmYellow} />
        <Text style={styles.ratingText}>{rating.toFixed(1)} / 5</Text>
      </View>

      {/* Descripción */}
      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Descripción</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Comentarios */}
      <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Comentarios</Text>
      <TouchableOpacity style={styles.button} onPress={onCrearComentario}>
        <Ionicons name="chatbubble-outline" size={16} color={colors.primaryBlue} />
        <Text style={styles.buttonText}>Escribir comentario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 6,
  },
  map: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 6,
  },
  mapRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  mapLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.primaryBlue,
    fontWeight: "500",
  },
});
