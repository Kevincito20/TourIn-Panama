import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { useComentariosActividad } from "@/hooks/useComentarios";
import { Comentario } from "@/components/services/ObtenerComentariosService";
import { useUsuario } from "@/hooks/useUsuario";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ModalContenido } from "@/components/actividades/ModalContenido";
import ComentarioItem from "@/components/ui/Comentario";

type Params = {
  id: string;
  encabezado: string;
  descp: string;
  foto_url: string;
  rating: string;
  latitud: string;
  longitud: string;
};

export default function ActividadDetalleScreen() {
  const { id, encabezado, descp, foto_url, rating, latitud, longitud } =
    useLocalSearchParams<Params>();
  const router = useRouter();

  const { usuario } = useUsuario();
  const id_usuario = usuario?.id_usuario || 0;
  const id_actividad = Number(id);

  const { comentarios, loading, error } = useComentariosActividad(
    id_usuario,
    id_actividad
  );

  const renderComentario = ({ item }: { item: Comentario }) => (
    <ComentarioItem comentario={item} />
  );

  const handleGuardarEnItinerario = () => {
    router.push({
      pathname: "/(modales)/ScreenFormulario",
      params: { id, encabezado, foto_url, descp },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: foto_url }} style={styles.image} />

        {/* Botón Cerrar */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Botón Guardar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleGuardarEnItinerario}
        >
          <Ionicons name="bookmark" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{encabezado}</Text>
      </View>

      <View style={styles.spacing} />

      <View style={styles.contentBox}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primaryBlue}
            style={styles.centered}
          />
        ) : error ? (
          <Text style={[styles.errorText, styles.centered]}>{error}</Text>
        ) : (
          <FlatList
            data={comentarios}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderComentario}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay comentarios aún.</Text>
            }
            ListHeaderComponent={
              <ModalContenido
                description={descp}
                ubicacion="Ubicación de la actividad"
                rating={Number(rating)}
                latitud={Number(latitud)}
                longitud={Number(longitud)}
                onCrearComentario={() =>
                  router.push({
                    pathname: "/(modales)/ScreenComentario",
                    params: { id_usuario, id_actividad },
                  })
                }
              />
            }
            contentContainerStyle={{ paddingBottom: 40 }}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  imageContainer: {
    position: "relative",
    height: 240,
    width: "100%",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 50,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  saveButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 50,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  title: {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    zIndex: 2,
  },
  spacing: {
    height: 0,
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  centered: {
    marginTop: 20,
    alignSelf: "center",
  },
  emptyText: {
    fontStyle: "italic",
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
