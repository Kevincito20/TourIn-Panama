// components/Itinerario/ItinerarioHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';

type Props = {
  total: number;
};

export const ItinerarioHeader = ({ total }: Props) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Ionicons name="calendar-outline" size={24} color={colors.primaryBlue} />
      <Text style={styles.headerTitle}>Itinerario</Text>
    </View>
    <View style={styles.actividadesBadge}>
      <Text style={styles.actividadesText}>{total} actividades</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  actividadesBadge: {
    backgroundColor: colors.lightBlue + '22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actividadesText: {
    fontSize: 12,
    color: colors.primaryBlue,
    fontWeight: '500',
  },
});
