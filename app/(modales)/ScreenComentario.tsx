import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCrearComentario } from "@/hooks/CrearComentario";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "@/hooks/useMensajeExito";

interface Props {
  onComentarioCreado?: () => void;
}

const CrearComentarioScreen: React.FC<Props> = ({ onComentarioCreado }) => {
  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const mostrarMensaje = useToast();
  const router = useRouter();

  const { id_usuario, id_actividad } = useLocalSearchParams<{
    id_usuario: string;
    id_actividad: string;
  }>();
  const idUsuarioNum = Number(id_usuario);
  const idActividadNum = Number(id_actividad);

  const { crearComentario, loading, error, success } = useCrearComentario();

  const handleSubmit = async () => {
    if (!titulo.trim() || !comentario.trim() || calificacion === 0) {
      mostrarMensaje("Completa todos los campos.");
      return;
    }

    await crearComentario({
      id_usuario: idUsuarioNum,
      id_actividad: idActividadNum,
      titulo,
      comentario,
      calificacion,
    });

    setShowSuccessAlert(true);
  };

  useEffect(() => {
    if (showSuccessAlert && success) {
      mostrarMensaje("Comentario enviado");
      setTitulo("");
      setComentario("");
      setCalificacion(0);
      onComentarioCreado?.();
      setShowSuccessAlert(false);
      setTimeout(() => router.back(), 1000);
    }
  }, [success, showSuccessAlert]);

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setCalificacion(i)}
            style={{ marginHorizontal: 4 }}
          >
            <Ionicons
              name={i <= calificacion ? "star" : "star-outline"}
              size={30}
              color="#F4D35E"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#005F73" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo comentario</Text>
          <View style={{ width: 24 }} /> 
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Título del comentario"
            placeholderTextColor="#999"
            value={titulo}
            onChangeText={setTitulo}
            editable={!loading}
          />

          <Text style={styles.label}>Comentario</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe tu opinión..."
            placeholderTextColor="#999"
            value={comentario}
            onChangeText={setComentario}
            multiline
            numberOfLines={4}
            editable={!loading}
          />

          <Text style={styles.label}>Calificación</Text>
          {renderStars()}

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Guardando..." : "Enviar"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#005F73",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#005F73",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#edf6f9",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 18,
    color: "#001219",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#0A9396",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#94d2bd",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CrearComentarioScreen;
