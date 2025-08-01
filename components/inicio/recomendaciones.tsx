import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/Colors';
import { useActividadesCercanas } from '@/hooks/useActividadesCercanas';
import { RecomendacionesHeader } from './RecomendacionesHeader';
import { RecomendacionesList } from './RecomendacionesList';
import { obtenerRadioKm } from './radio/RadioStorage';
import { useUsuario } from '@/hooks/useUsuario';

export const Recomendaciones = () => {
  const [distancia, setDistancia] = useState(10000); 
  const [cargandoDistancia, setCargandoDistancia] = useState(true);
  const router = useRouter();
  const { usuario } = useUsuario();

  useEffect(() => {
    if (!usuario?.id_usuario) return;

    (async () => {
      try {
        const radioKm = await obtenerRadioKm(usuario.id_usuario);
        setDistancia(radioKm * 1000);
      } catch (error) {
        console.error('Error obteniendo radioKm en Recomendaciones:', error);
        setDistancia(10000); 
      } finally {
        setCargandoDistancia(false);
      }
    })();
  }, [usuario]);

  const { actividades, loading } = useActividadesCercanas(distancia);

  if (cargandoDistancia || loading) {
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
