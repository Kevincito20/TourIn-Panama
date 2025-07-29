import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ItinerarioItem } from '../types/Itinerario';
import { colors } from '@/constants/Colors';

type Props = {
  actividades: ItinerarioItem[];
  onCompletar: (id: number) => void;
  onEliminar: (id: number) => void;
};

export const ActividadesSemanales = ({ actividades, onCompletar, onEliminar }: Props) => {
  return (
    <>
      {actividades.map((actividad) => (
        <View key={actividad.id_itinerario} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{actividad.titulo_actividad}</Text>
            <Text style={styles.cardDetails}>
              {actividad.fecha_itinerario} — {actividad.hora_itinerario}
            </Text>
            {actividad.nota_itinerario ? (
              <Text style={[styles.cardDetails, { fontStyle: 'italic' }]}>
                Nota: {actividad.nota_itinerario}
              </Text>
            ) : null}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onCompletar(actividad.id_itinerario)}>
              <Text style={{ color: colors.lightBlue, fontWeight: '700' }}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEliminar(actividad.id_itinerario)}>
              <Text style={{ color: colors.warmOrange, fontWeight: '700' }}>✗</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  cardDetails: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12 },
});
