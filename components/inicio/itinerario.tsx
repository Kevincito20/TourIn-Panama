// app/(tabs)/Itinerario.tsx
import { colors } from '@/constants/Colors';
import { useItinerario } from '@/hooks/useItinerario';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EstadoItinerario } from './EstadoItinerario';
import { ItinerarioHeader } from './ItinerarioHeader';

const Itinerario = () => {
  const router = useRouter();
  const { actividades, cargando, cargarDatos } = useItinerario();

  useFocusEffect(
    React.useCallback(() => {
      cargarDatos();
    }, [])
  );

  return (
    <View>
      <ItinerarioHeader total={actividades.length} />
      <EstadoItinerario actividades={actividades} cargando={cargando} limite={3} />

      <TouchableOpacity
        style={styles.verCompleto}
        onPress={() => router.push('/(modales)/ScreenItinerario')}
      >
        <Text style={styles.verCompletoText}>Ver itinerario completo</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  verCompleto: {
    backgroundColor: colors.primaryBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 14,
  },
  verCompletoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default Itinerario;
