//Listo
import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  texto: string;
  translateY: Animated.Value;
  opacity: Animated.Value;
  onPress: () => void;
}

export function BotonAccion({ texto, translateY, opacity, onPress }: Props) {
  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.boton}>
        <Text style={styles.texto}>{texto}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  texto: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
