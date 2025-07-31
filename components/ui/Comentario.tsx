import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Comentario } from '../services/ObtenerComentariosService';
import { Ionicons } from '@expo/vector-icons';

const ComentarioItem = ({ comentario }: { comentario: Comentario }) => {
  const esPropio = comentario.sesion;

  return (
    <View style={[styles.container, esPropio && styles.propioContainer]}>
      <Image source={{ uri: comentario.foto }} style={styles.avatar} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.author}>
            {comentario.nombre_usuario} {comentario.apellido_usuario}
          </Text>
          <Text style={styles.date}>{comentario.fecha_creacion}</Text>
          {esPropio && (
            <TouchableOpacity style={styles.options}>
              <Ionicons name="ellipsis-vertical" size={18} color="#444" />
            </TouchableOpacity>
          )}
        </View>

        {comentario.encabezado ? (
          <Text style={styles.title}>{comentario.encabezado}</Text>
        ) : null}

        <Text style={styles.body}>{comentario.opinion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  propioContainer: {
    backgroundColor: '#f0f8ff',
    borderLeftWidth: 4,
    borderLeftColor: '#0A9396', // Azul claro de tu paleta
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
    color: '#222',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  options: {
    marginLeft: 'auto',
    padding: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    color: '#111',
  },
  body: {
    fontSize: 14,
    marginTop: 2,
    color: '#333',
  },
});

export default ComentarioItem;
