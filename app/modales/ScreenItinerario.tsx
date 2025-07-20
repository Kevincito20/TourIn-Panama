// app/modales/ItinerarioCompletoScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors'; // tu archivo Colors.ts

const mockData = [
  {
    dia: 'Lunes, 21 de julio',
    actividades: [
      {
        id: '1',
        titulo: 'Tour por el Canal',
        hora: '9:00 AM',
        lugar: 'Miraflores',
        tipo: 'tour',
        icon: 'boat-outline',
      },
      {
        id: '2',
        titulo: 'Almuerzo en Causeway',
        hora: '12:30 PM',
        lugar: 'Amador',
        tipo: 'comida',
        icon: 'restaurant-outline',
      },
    ],
  },
  {
    dia: 'Martes, 22 de julio',
    actividades: [
      {
        id: '3',
        titulo: 'Caminata en Parque Metropolitano',
        hora: '7:00 AM',
        lugar: 'Ancón',
        tipo: 'naturaleza',
        icon: 'leaf-outline',
      },
    ],
  },
];

export default function ItinerarioCompletoScreen() {
  const [vista, setVista] = useState<'día' | 'semana'>('día');

  const handleCompletar = (id: string) => {
    Alert.alert('Completado', `Actividad ${id} marcada como completada.`);
  };

  const handleEliminar = (id: string) => {
    Alert.alert('Eliminar', `¿Deseas eliminar la actividad ${id}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => console.log(`Eliminado ${id}`), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Itinerario completo</Text>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, vista === 'día' && styles.switchActive]}
          onPress={() => setVista('día')}
        >
          <Text style={vista === 'día' ? styles.switchTextActive : styles.switchText}>
            Por Día
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, vista === 'semana' && styles.switchActive]}
          onPress={() => setVista('semana')}
        >
          <Text style={vista === 'semana' ? styles.switchTextActive : styles.switchText}>
            Por Semana
          </Text>
        </TouchableOpacity>
      </View>

      {mockData.map((dia) => (
        <View key={dia.dia} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{dia.dia}</Text>
          {dia.actividades.map((actividad) => (
            <View key={actividad.id} style={styles.card}>
              <Ionicons
                name={actividad.icon as any}
                size={24}
                color={colors.primaryBlue}
                style={styles.cardIcon}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{actividad.titulo}</Text>
                <Text style={styles.cardDetails}>
                  {actividad.hora} • {actividad.lugar}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleCompletar(actividad.id)}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.lightBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEliminar(actividad.id)}>
                  <Ionicons name="trash-outline" size={24} color={colors.warmOrange} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addButtonText}>Agregar actividad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    marginRight: 8,
  },
  switchActive: {
    backgroundColor: colors.primaryBlue,
  },
  switchText: {
    textAlign: 'center',
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  switchTextActive: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardDetails: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    backgroundColor: colors.primaryBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 8,
  },
});
