import { colors } from "@/constants/Colors";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

const Message = () => {

  return (
    <View
      style={{
        backgroundColor: colors.primaryBlue, // azul más claro
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 24,
        padding: 20,
        margin: 10,
        maxWidth: 350,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Permiso requerido
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        La app necesita acceso a tu ubicación. Puedes habilitarlo desde la
        configuración del dispositivo.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: colors.warmOrange,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
        }}
        onPress={() => {
          Linking.openSettings();
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Abrir ajustes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Message;
