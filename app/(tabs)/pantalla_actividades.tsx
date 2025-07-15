// app/(tabs)/ScreenActividades.tsx
import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import HeaderSeccionActividades from '@/components/actividades/seccion-actividades';
import { CardsActividades } from '@/components/actividades/seccion-cardActividades';

export default function ScreenActividades() {
    return (
        <FlatList
            data={[]} // Para permitir usar ListHeaderComponent + ListFooterComponent
            renderItem={null}
            ListHeaderComponent={
                <View style={styles.sectionContainer}>
                    <HeaderSeccionActividades />
                </View>
            }
            ListFooterComponent={
                <View style={styles.sectionContainer}>
                    <Text style={styles.titulo}>Lugares Recomendados</Text>
                    <CardsActividades />
                </View>
            }
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        paddingVertical: 16,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
});
