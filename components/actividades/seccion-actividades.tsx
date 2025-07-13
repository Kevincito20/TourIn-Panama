import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import CarruselActividades from '../ui/actividadesPopulares';
import { ActividadesProps } from '@/components/types/Actividades';
import { obtenerActividades } from '../services/ActividadesService';

const { width } = Dimensions.get('window');

interface HeaderSeccionActividadesProps {
  openModal: (actividad: ActividadesProps) => void;
}

export default function HeaderSeccionActividades({ openModal }: HeaderSeccionActividadesProps) {
  const [actividadesHeader, setActividadesHeader] = useState<ActividadesProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      const data = await obtenerActividades();
      setActividadesHeader(data.slice(0, 5)); 
      setLoading(false);
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={actividadesHeader}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
