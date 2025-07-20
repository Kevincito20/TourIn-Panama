import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors'; // Usa tu archivo Colors.ts

export default function PerfilScreen() {
  const nombreUsuario = 'Kevin González';
  const fotoPerfil = 'https://i.pravatar.cc/150?img=3'; // Simulación

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header con foto y nombre */}
      <View style={styles.header}>
        <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
        <Text style={styles.nombre}>{nombreUsuario}</Text>
        <Text style={styles.ubicacion}>📍 Panamá</Text>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Itinerarios</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Actividades</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
      </View>

      {/* Opciones del perfil */}
      <View style={styles.section}>
        <Opcion icon="create-outline" texto="Editar perfil" />
        <Opcion icon="calendar-outline" texto="Mi itinerario" />
        <Opcion icon="heart-outline" texto="Mis favoritos" />
        <Opcion icon="settings-outline" texto="Configuración" />
        <Opcion icon="log-out-outline" texto="Cerrar sesión" color="red" />
      </View>
    </ScrollView>
  );
}

function Opcion({ icon, texto, color = colors.textPrimary }: { icon: any; texto: string; color?: string }) {
  return (
    <TouchableOpacity style={styles.option}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={[styles.optionText, { color }]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: colors.primaryBlue,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  ubicacion: {
    color: colors.iconAccent,
    fontSize: 14,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F3F4F6',
    paddingVertical: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryBlue,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#E5E7EB',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
  },
});
