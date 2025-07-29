import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ModalContenido } from "@/components/actividades/ModalContenido";
import { ModalHeader } from "@/components/actividades/ModalHeader";
import { colors } from "@/constants/Colors";
import { useComentariosActividad } from "@/hooks/useComentarios";
import { Comentario } from "@/components/services/ObtenerComentariosService";
import { useUsuario } from "@/hooks/useUsuario";

type Params = {
  id: string;
  encabezado: string;
  descp: string;
  foto_url: string;
  rating: string;
};

type ComentarioItemProps = {
  comentario: Comentario;
};


const ComentarioItem = ({ comentario }: ComentarioItemProps) => (
  <View style={styles.commentItem}>
    <Image source={{ uri: comentario.foto }} style={styles.commentFoto} />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.commentAuthor}>
        {comentario.nombre_usuario} {comentario.apellido_usuario}
      </Text>
      <Text style={styles.commentEncabezado}>{comentario.encabezado}</Text>
      <Text style={styles.commentText}>{comentario.opinion}</Text>
      <Text style={styles.commentFecha}>{comentario.fecha_creacion}</Text>
    </View>
  </View>
);

const ActividadDetalleScreen = () => {
  const { id, encabezado, descp, foto_url, rating } = useLocalSearchParams<Params>();
  const router = useRouter();

  const { usuario } = useUsuario();
  const id_usuario = usuario?.id_usuario || 0;
  const id_actividad = Number(id);

  const { comentarios, loading, error } = useComentariosActividad(id_usuario, id_actividad);

  const renderComentario = ({ item }: { item: Comentario }) => (
    <ComentarioItem comentario={item} />
  );

  if (loading) {
    return (
      <>
        <ModalHeader title={encabezado} imageUrl={foto_url} onClose={() => router.back()} />
        <ActivityIndicator size="large" color={colors.primaryBlue} style={styles.centered} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ModalHeader title={encabezado} imageUrl={foto_url} onClose={() => router.back()} />
        <Text style={[styles.errorText, styles.centered]}>{error}</Text>
      </>
    );
  }

  return (
    <>
      <ModalHeader title={encabezado} imageUrl={foto_url} onClose={() => router.back()} />

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
            ubicacion="Cinta Costera, Panamá"
            rating={Number(rating)}
            onCrearComentario={() =>
              router.push({
                pathname: "/(modales)/ScreenComentario",
                params: { id_usuario, id_actividad }
              })
            }
            onGuardarEnItinerario={() =>
              router.push({
                pathname: "/(modales)/ScreenFormulario",
                params: { id, encabezado, foto_url, descp },
              })
            }
          />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        style={styles.list}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#FAFAFA",
  },
  centered: {
    marginTop: 20,
    alignSelf: "center",
  },
  commentItem: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
  },
  commentFoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentAuthor: {
    fontWeight: "700",
    color: colors.textPrimary,
    fontSize: 14,
  },
  commentEncabezado: {
    fontWeight: "600",
    color: colors.primaryBlue,
    fontSize: 13,
    marginTop: 2,
  },
  commentText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  commentFecha: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
    fontStyle: "italic",
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

export default ActividadDetalleScreen;
