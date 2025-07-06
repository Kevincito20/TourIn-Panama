import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ActividadesProps } from '../types/Actividades';

interface ModalContenidoProps {
    actividad: ActividadesProps;
}

export default function ModalContenido({ actividad }: ModalContenidoProps) {
    return (
        <View style={styles.content}>
            <Image source={{ uri: actividad.imagen }} style={styles.image} />
            <Text style={styles.rating}>Rating: {actividad.rating.toFixed(1)}</Text>
            {actividad.descripcion && (
                <Text style={styles.description}>{actividad.descripcion}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f1c40f',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
    },
});
