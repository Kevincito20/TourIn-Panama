// components/modales/ScreenModal.tsx
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ActividadesProps } from '@/components/types/Actividades';
import ModalHeader from '@/components/actividades/ModalHeader';
import ModalContenido from '@/components/actividades/ModalContenido';

interface ScreenModalProps {
    visible: boolean;
    actividad: ActividadesProps | null;
    onClose: () => void;
}

export default function ScreenModal({ visible, actividad, onClose }: ScreenModalProps) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalBackground}>
                <View style={styles.modalBox}>
                    {actividad && (
                        <>
                            <ModalHeader
                                titulo={actividad.titulo}
                                ubicacion={actividad.ubicacion}
                                onClose={onClose}
                            />
                            <ModalContenido actividad={actividad} />
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 10,
    },
});
