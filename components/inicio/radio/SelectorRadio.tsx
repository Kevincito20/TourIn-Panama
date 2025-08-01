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
          style={[
            styles.radioBtn,
            km === radioKm && styles.radioBtnSelected,
          ]}
          onPress={() => setRadioKm(km)}
        >
          <Text
            style={km === radioKm ? styles.radioTextSelected : styles.radioText}
          >
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: '#e0f2f1', // azul claro apagado
  },
  radioBtnSelected: {
    backgroundColor: '#006d6fff',
  },
  radioText: {
    color: '#005F73', 
    fontWeight: '500',
  },
  radioTextSelected: {
    color: '#ffffff',
    fontWeight: '400',
  },
  confirmBtn: {
    backgroundColor: '#005F73', 
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
