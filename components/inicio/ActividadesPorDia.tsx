import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ItinerarioItem } from '../types/Itinerario';
import { colors } from '@/constants/Colors';
import { formatFecha, formatHora12 } from '@/components/ui/ItinerarioCard';

type Props = {
  actividades: ItinerarioItem[];
};

export const ActividadesSemanales = ({ actividades}: Props) => {
  return (
    <>
      {actividades.map((actividad) => (
        <View key={actividad.id_itinerario} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{actividad.titulo_actividad}</Text>
            <Text style={styles.cardDetails}>
              {formatFecha(actividad.fecha_itinerario)} — {formatHora12(actividad.hora_itinerario)}
            </Text>
            {actividad.nota_itinerario ? (
              <Text style={[styles.cardDetails, { fontStyle: 'italic' }]}>
                Nota: {actividad.nota_itinerario}
              </Text>
            ) : null}
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
