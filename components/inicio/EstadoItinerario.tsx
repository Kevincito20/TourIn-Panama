// components/Itinerario/EstadoItinerario.tsx
import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { ItinerarioCard } from '../ui/ItinerarioCard';
import { ItinerarioItem } from '../types/Itinerario';

// components/Itinerario/EstadoItinerario.tsx
type Props = {
  actividades: ItinerarioItem[];
  cargando: boolean;
  limite?: number; // nueva prop
};

export const EstadoItinerario = ({ actividades, cargando, limite }: Props) => {
  if (cargando)
    return <Text style={styles.textCenter}>Cargando...</Text>;

  if (actividades.length === 0)
    return <Text style={styles.textCenter}>No tienes actividades programadas.</Text>;

  const actividadesAMostrar = limite ? actividades.slice(0, limite) : actividades;

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {actividadesAMostrar.map((actividad, index) => (
        <ItinerarioCard
          key={actividad.id_itinerario}
          actividad={actividad}
          esUltima={index === actividadesAMostrar.length - 1}
        />
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
