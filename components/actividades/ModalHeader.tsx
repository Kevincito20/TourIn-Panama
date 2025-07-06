import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalHeaderProps {
    titulo: string;
    ubicacion: string;
    onClose: () => void;
}

export default function ModalHeader({ titulo, ubicacion, onClose }: ModalHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{titulo}</Text>
                <Text style={styles.location}>{ubicacion}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
                <Ionicons name="close-circle" size={28} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
});
