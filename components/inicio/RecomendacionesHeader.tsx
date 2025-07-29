// RecomendacionesHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';

type Props = {
  distancia: number;
  onPress: () => void;
};

export const RecomendacionesHeader = ({ distancia, onPress }: Props) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Text style={styles.headerTitle}>Actividades cerca de ti</Text>
    </View>

    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <Text style={styles.radioText}>Radio: {distancia / 1000} km</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.primaryBlue} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  radioText: {
    color: colors.primaryBlue,
    fontWeight: '500',
    marginRight: 6,
  },
});
