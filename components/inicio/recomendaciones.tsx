// Recomendaciones.tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/Colors';
import { useDistancia } from '@/hooks/useDistancia';
import { useActividadesCercanas } from '@/hooks/useActividadesCercanas';
import { RecomendacionesHeader } from './RecomendacionesHeader';
import { RecomendacionesList } from './RecomendacionesList';

export const Recomendaciones = () => {
  const distancia = useDistancia();
  const { actividades, loading } = useActividadesCercanas(distancia);
  const router = useRouter();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  if (actividades.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: colors.textSecondary }}>No se encontraron actividades cercanas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RecomendacionesHeader
        distancia={distancia}
        onPress={() => {
          router.push({
            pathname: '/(modales)/ScreenRadio',
            params: { distanciaActual: distancia },
          });
        }}
      />

      <RecomendacionesList actividades={actividades} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 12,
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
