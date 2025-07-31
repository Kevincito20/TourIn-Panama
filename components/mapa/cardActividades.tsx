//Listo
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PropActivity = {
  id: number;
  encabezado: string;
  descp: string;
  rating: number;
  latitud: number;
  longitud: number;
  foto_url: string;
  id_cat: number;
};

interface props {
  marker: PropActivity;
}

const CardActivity = ({ marker }: props) => {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/actividades-info",
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
      >
        <View style={styles.row}>
          {/* Imagen a la izquierda */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: marker.foto_url }} style={styles.image} />

            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{marker.rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Contenido a la derecha */}
          <View style={styles.content}>
            <Text style={styles.title}>{marker.encabezado}</Text>

            <Text numberOfLines={2} style={styles.description}>
              {marker.descp}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    backgroundColor: colors.cardColor,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#333",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: "100%",
    position: "relative",
  },
  image: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    width: "100%",
    height: "100%",
  },
  ratingBox: {
    position: "absolute",
    bottom: 6,
    left: 6,
    flexDirection: "row",
    backgroundColor: "#ffffffcc",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 3,
    fontWeight: "bold",
    fontSize: 12,
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005F73",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#0A9396",
  },
});

export default CardActivity;
