import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

type Filtro = {
    id: number;
    nombre: string;
};

const filtros: Filtro[] = [
    { id: 1, nombre: 'Naturales y aventura' },
    { id: 2, nombre: 'Actividades acuáticas' },
    { id: 3, nombre: 'Historia y cultura' },
    { id: 4, nombre: 'Arte y entretenimiento' },
    { id: 5, nombre: 'Compras y artesanía' },
    { id: 6, nombre: 'Vida urbana y nocturna' },
];

type FiltrosProps = {
    onFiltroSeleccionado?: (id: number) => void;
};

const Filtros: React.FC<FiltrosProps> = ({ onFiltroSeleccionado }) => {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState<number | null>(null);

    const handlePress = (id: number) => {
        setFiltroSeleccionado(id);
        onFiltroSeleccionado?.(id);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filtros}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.filtro,
                            filtroSeleccionado === item.id && styles.filtroSeleccionado,
                        ]}
                        onPress={() => handlePress(item.id)}
                    >
                        <Text
                            style={[
                                styles.texto,
                                filtroSeleccionado === item.id && styles.textoSeleccionado,
                            ]}
                        >
                            {item.nombre}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    filtro: {
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 6,
    },
    filtroSeleccionado: {
        backgroundColor: '#007AFF',
    },
    texto: {
        color: '#333',
        fontWeight: '500',
    },
    textoSeleccionado: {
        color: '#fff',
    },
});

export default Filtros;