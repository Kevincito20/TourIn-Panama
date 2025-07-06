import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import HeaderSeccionActividades from '@/components/actividades/seccion-actividades';
import { CardsActividades } from '@/components/actividades/seccion-cardActividades';
import ScreenModal from '../modales/ScreenModal';
import { useModal } from '@/hooks/useActividades';

export default function ScreenActividades() {
  const { modalVisible, actividadSeleccionada, openModal, closeModal } = useModal();

  return (
    <>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View style={styles.sectionContainer}>
            <HeaderSeccionActividades openModal={openModal} />
          </View>
        }
        ListFooterComponent={
          <View style={styles.sectionContainer}>
            <Text style={styles.titulo}>Lugares Recomendados</Text>
            <CardsActividades openModal={openModal} />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Modal centralizado */}
      <ScreenModal
        visible={modalVisible}
        actividad={actividadSeleccionada}
        onClose={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingBottom: 20,

  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
