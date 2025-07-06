import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import CarruselActividades from '../ui/actividadesPopulares';
import { ActividadesProps } from '@/components/types/Actividades';
import { actividadesData } from './data'; 

const { width } = Dimensions.get('window');

interface HeaderSeccionActividadesProps {
  openModal: (actividad: ActividadesProps) => void;
}

export default function HeaderSeccionActividades({ openModal }: HeaderSeccionActividadesProps) {
  return (
    <FlatList
      data={actividadesData}
      renderItem={({ item }) => (
        <CarruselActividades
          {...item}
          onPress={() => openModal(item)}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={width}
      decelerationRate="fast"
      snapToAlignment="center"
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 0,
  },
});
