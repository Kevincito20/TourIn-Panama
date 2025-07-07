import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListaActividades from '@/components/ui/cardActividades';
import { actividadesCardsData } from './data';

interface CardsActividadesProps {
  openModal: (actividad: any) => void;
}

export function CardsActividades({ openModal }: CardsActividadesProps) {
  // Ahora sí usamos openModal que viene de props
  const actividadesConOnPress = actividadesCardsData.map((actividad) => ({
    ...actividad,
    onPress: () => openModal(actividad),
  }));

  return (
    <FlatList
      data={actividadesConOnPress}
      key={'2col'}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListaActividades
          id={item.id}
          categoria={item.categoria}
          titulo={item.titulo}
          ubicacion={item.ubicacion}
          rating={item.rating}
          imagen={item.imagen}
          onPress={item.onPress}
        />
      )}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#000',
  },
});
