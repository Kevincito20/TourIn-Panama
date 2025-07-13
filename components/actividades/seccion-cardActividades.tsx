import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import ListaActividades from '@/components/ui/cardActividades';
import { ActividadesProps } from '../types/Actividades';
import { useActividadesPorCategoria } from '../services/filtrosCategoria';

interface CardsActividadesProps {
  openModal: (actividad: ActividadesProps) => void;
  categoriaId: number | null;
}

export function CardsActividades({ openModal, categoriaId }: CardsActividadesProps) {
  const { actividades, loading, error } = useActividadesPorCategoria(
    categoriaId ? categoriaId.toString() : null
  );

  console.log('Actividades recibidas:', actividades);  

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (actividades.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No hay actividades para esta categoría.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={actividades}
      key={'2col'}
      keyExtractor={(item, index) => item.id?.toString() ?? item.encabezado ?? index.toString()}
      renderItem={({ item }) => (
        <ListaActividades
          encabezado={item.encabezado}
          foto_url={item.foto_url}
          rating={item.rating}
          onPress={() => openModal(item)}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
