// app/(tabs)/pantalla_actividades.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SeccionActividades from '@/components/actividades/seccion-actividades';

export default function PantallaActividades() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SeccionActividades />
      {/* Puedes seguir agregando otras secciones aquí si lo deseas */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 2,
  },
});
