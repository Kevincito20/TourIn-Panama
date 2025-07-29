import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

interface ModalContenidoProps {
  description: string;
  ubicacion: string;
  rating: number;
  onCrearComentario: () => void;
  onGuardarEnItinerario: () => void;
}

export function ModalContenido({
  description,
  ubicacion,
  rating,
  onCrearComentario,
  onGuardarEnItinerario,
}: ModalContenidoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={20} color={colors.textPrimary} />
        <Text style={styles.infoText}>{ubicacion}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="star-outline" size={20} color={colors.warmYellow} />
        <Text style={styles.infoText}>{rating.toFixed(1)} / 5</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onCrearComentario}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Escribir comentario </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primaryBlue }]}
        onPress={onGuardarEnItinerario}
      >
        <Ionicons name="calendar-outline" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Guardar en itinerario </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: colors.textPrimary,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    color: colors.textSecondary,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 6,
    color: colors.textPrimary,
    fontSize: 14,
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
