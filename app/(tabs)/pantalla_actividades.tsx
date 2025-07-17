import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Filtros from '@/components/actividades/filtros';
import { CardsActividades } from '@/components/actividades/seccion-cardActividades';
import { useModal } from '@/hooks/useActividades';
import ScreenModal from '../modales/ScreenModal';

export default function ScreenActividades() {
  const { modalVisible, actividadSeleccionada, openModal, closeModal } = useModal();
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

  const handleFiltroSeleccionado = (id: number) => {
    setCategoriaId(id);
  };

  return (
    <View style={{ flex: 1 }}>
      <Filtros onFiltroSeleccionado={handleFiltroSeleccionado} />

      <View style={styles.sectionContainer}>
        <Text style={styles.titulo}>
          {categoriaId
            ? `Actividades de la categoría ${categoriaId}`
            : 'Todas las actividades'}
        </Text>

        <CardsActividades openModal={openModal} categoriaId={categoriaId} />
      </View>

      <ScreenModal visible={modalVisible} actividad={actividadSeleccionada} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
});
