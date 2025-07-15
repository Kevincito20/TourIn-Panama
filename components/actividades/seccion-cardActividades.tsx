// app/(tabs)/pantalla_home.tsx
import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import ListaActividades from '@/components/ui/cardActividades';
import { useState } from 'react';

export function CardsActividades() {

    const [modalVisible, setModalVisible] = useState(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

    const actividades = [
        {
            id: '1',
            titulo: 'Tour al Canal',
            ubicacion: 'Ciudad de Panamá',
            rating: 4.7,
            imagen: 'https://elfarodelcanal.com/wp-content/uploads/2022/09/2022-07-01-003-ElCanaldePanama-108-operacion-2.jpg',
            onPress: () => console.log('Ir al Tour al Canal'),
        },
        {
            id: '2',
            titulo: 'Isla Taboga',
            ubicacion: 'Archipiélago de las Perlas',
            rating: 4.9,
            imagen: 'https://th.bing.com/th/id/R.ef82c38849ac1e843425a5c659d3a39b?rik=%2bz%2fJC5dtBdC6LA&pid=ImgRaw&r=0',
            onPress: () => console.log('Ir a Isla Taboga'),
        },
        {
            id: '3',
            titulo: 'Cerro Ancón',
            ubicacion: 'Ciudad de Panamá',
            rating: 4.5,
            imagen: 'https://th.bing.com/th/id/R.ef82c38849ac1e843425a5c659d3a39b?rik=%2bz%2fJC5dtBdC6LA&pid=ImgRaw&r=0',
            onPress: () => console.log('Ir a Cerro Ancón'),
        },
        {
            id: '4',
            titulo: 'Biomuseo',
            ubicacion: 'Calzada de Amador',
            rating: 4.6,
            imagen: 'https://elfarodelcanal.com/wp-content/uploads/2022/09/2022-07-01-003-ElCanaldePanama-108-operacion-2.jpg',
            onPress: () => console.log('Ir al Biomuseo'),
        },
        {
            id: '5',
            titulo: 'Casco Antiguo',
            ubicacion: 'Ciudad de Panamá',
            rating: 4.8,
            imagen: 'https://elfarodelcanal.com/wp-content/uploads/2022/09/2022-07-01-003-ElCanaldePanama-108-operacion-2.jpg',
            onPress: () => console.log('Ir al Casco Antiguo'),
        },
        {
            id: '6',
            titulo: 'Isla Contadora',
            ubicacion: 'Archipiélago de las Perlas',
            rating: 4.9,
            imagen: 'https://th.bing.com/th/id/R.ef82c38849ac1e843425a5c659d3a39b?rik=%2bz%2fJC5dtBdC6LA&pid=ImgRaw&r=0',
            onPress: () => console.log('Ir a Isla Contadora'),
        },
    ];

    return (
            <FlatList
                data={actividades}
                key={'2col'}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListaActividades
                    id={item.id}
                        categoria="Actividades"
                        titulo={item.titulo}
                        ubicacion={item.ubicacion}
                        rating={item.rating}
                        imagen={item.imagen}
                        onPress={item.onPress}
                    />
                )}
                contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
                // columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={true}
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
