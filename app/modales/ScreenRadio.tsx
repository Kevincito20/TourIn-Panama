import SeleccionarRadio from "@/components/inicio/Radio";
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ScreenRadio() {
  return (
    <View style={styles.container}>
      <SeleccionarRadio />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
});