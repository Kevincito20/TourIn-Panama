import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useItinerario } from '@/hooks/useItinerario';
import { colors } from '@/constants/Colors';
import { ActividadesSemanales } from '@/components/inicio/ActividadesPorDia';

export default function ItinerarioCompletoScreen() {
  const { actividades, cargando, cargarDatos } = useItinerario();

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCompletar = (id: number) => {
    Alert.alert('Completado', `Actividad ${id} marcada como completada.`);
  };

  const handleEliminar = (id: number) => {
    Alert.alert('Eliminar', `¿Deseas eliminar la actividad ${id}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => console.log(`Eliminado ${id}`), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Itinerario semanal</Text>

      {cargando ? (
        <ActivityIndicator size="large" color={colors.primaryBlue} style={{ marginTop: 20 }} />
      ) : actividades.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
          No tienes actividades programadas.
        </Text>
      ) : (
        <ActividadesSemanales
          actividades={actividades}
          onCompletar={handleCompletar}
          onEliminar={handleEliminar}
        />
      )}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar actividad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});
