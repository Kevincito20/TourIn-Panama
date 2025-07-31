import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useItinerario } from '@/hooks/useItinerario';
import { colors } from '@/constants/Colors';
import { ActividadesSemanales } from '@/components/inicio/ActividadesPorDia';

export default function ItinerarioCompletoScreen() {
  const { actividades, cargando, cargarDatos } = useItinerario();
  const navigation = useNavigation();

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primaryBlue} />
        </TouchableOpacity>
        <Text style={styles.title}>Itinerario semanal</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {cargando ? (
          <ActivityIndicator size="large" color={colors.primaryBlue} style={{ marginTop: 20 }} />
        ) : actividades.length === 0 ? (
          <Text style={styles.emptyText}>No tienes actividades programadas.</Text>
        ) : (
          <ActividadesSemanales
            actividades={actividades}
            onCompletar={handleCompletar}
            onEliminar={handleEliminar}
          />
        )}

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>Agregar actividad</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
