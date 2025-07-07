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
                                actividad={actividad}
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
        width: '99%',
        height: '90%',

        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        borderRadius: 20,
    },
});
