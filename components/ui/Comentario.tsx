import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Comentario } from '../services/ObtenerComentariosService';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors'; // Asegúrate que la ruta sea correcta

const ComentarioItem = ({ comentario }: { comentario: Comentario }) => {
  const esPropio = comentario.sesion;

  const renderRating = (rating: number) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={colors.warmYellow}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.rating}>{estrellas}</View>;
  };

  return (
    <View style={[styles.container, esPropio && styles.propioContainer]}>
      <Image source={{ uri: comentario.foto }} style={styles.avatar} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.author}>
              {comentario.nombre_usuario} {comentario.apellido_usuario}
            </Text>
            <Text style={styles.date}>{comentario.fecha_creacion}</Text>
          </View>

          {esPropio && (
            <TouchableOpacity style={styles.options}>
              <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {comentario.encabezado ? (
          <Text style={styles.title}>{comentario.encabezado}</Text>
        ) : null}

        <Text style={styles.body}>{comentario.opinion}</Text>

        {renderRating(comentario.rating)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: colors.white,
  },
  propioContainer: {
    backgroundColor: '#e6f7f8',
    borderLeftWidth: 4,
    borderLeftColor: colors.lightBlue,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userInfo: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.primaryBlue,
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  options: {
    padding: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
    marginTop: 6,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ComentarioItem;
