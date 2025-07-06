import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ActividadesProps } from '../types/Actividades';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    actividad: ActividadesProps;
    onClose: () => void;
}

const { height } = Dimensions.get('window');

const ActividadModalHeader: React.FC<Props> = ({ actividad, onClose }) => {
    return (
        <View style={styles.header}>
            <Image source={{ uri: actividad.imagen }} style={styles.image} />
            
            {/* Cerrar modal */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Overlay con ubicación y rating */}
            <View style={styles.overlay}>
                <Text style={styles.ubicacion}>{actividad.ubicacion}</Text>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FBBF24" />
                    <Text style={styles.ratingText}>{actividad.rating}/5</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        width: '100%',
    },
    image: {
        width: '100%',
        height: height * 0.35,
        resizeMode: 'cover',
    },
    closeBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    ubicacion: {
        color: 'white',
        fontSize: 14,
        flex: 1,
        fontWeight: '600',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        color: '#FBBF24',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 4,
    },
});

export default ActividadModalHeader;
