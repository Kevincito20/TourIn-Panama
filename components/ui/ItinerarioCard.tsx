// components/Itinerario/ActividadCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { ItinerarioItem } from '../types/Itinerario';

type Props = {
  actividad: ItinerarioItem;
  esUltima: boolean;
};

export const ItinerarioCard = ({ actividad, esUltima }: Props) => (
  <View style={styles.actividadContainer}>
    <View style={styles.actividadCard}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground, { backgroundColor: colors.primaryBlue + '22' }]}>
          <Ionicons name="location-outline" size={24} color={colors.primaryBlue} />
        </View>
      </View>

      <View style={styles.actividadInfo}>
        <View style={styles.tituloContainer}>
          <Text style={styles.actividadTitulo}>{actividad.titulo_actividad}</Text>
        </View>
        <View style={styles.detalleContainer}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.detalleText}>
            {actividad.hora_itinerario} • {actividad.fecha_itinerario}
          </Text>
        </View>
        {actividad.nota_itinerario && (
          <View style={styles.detalleContainer}>
            <Ionicons name="document-text-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.detalleText}>Nota: {actividad.nota_itinerario}</Text>
          </View>
        )}
      </View>
    </View>

    {!esUltima && <View style={styles.conectorLinea} />}
  </View>
);

const styles = StyleSheet.create({
  actividadContainer: {
    position: 'relative',
  },
  actividadCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actividadInfo: {
    flex: 1,
  },
  tituloContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actividadTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  detalleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detalleText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  conectorLinea: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 43,
    marginBottom: 12,
  },
});
