import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  radioKm: number;
  setRadioKm: (km: number) => void;
  onConfirm: () => void;
};

const opcionesKm = [5, 10, 15, 20];

export const SelectorDeRadio = ({ radioKm, setRadioKm, onConfirm }: Props) => (
  <View style={styles.selectorContainer}>
    <View style={styles.radioContainer}>
      {opcionesKm.map((km) => (
        <TouchableOpacity
          key={km}
          style={[styles.radioBtn, km === radioKm && styles.radioBtnSelected]}
          onPress={() => setRadioKm(km)}
        >
          <Text style={km === radioKm ? styles.radioTextSelected : styles.radioText}>
            {km} km
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
      <Text style={styles.confirmText}>Confirmar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  selectorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 14,
    elevation: 6,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  radioBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
  radioBtnSelected: {
    backgroundColor: '#4F46E5',
  },
  radioText: {
    color: '#1F2937',
    fontWeight: '500',
  },
  radioTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
