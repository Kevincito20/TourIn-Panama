// hooks/useModal.ts
import { useState } from 'react';
import { ActividadesProps } from '@/components/types/Actividades';

export const useModal = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState<ActividadesProps | null>(null);

    const openModal = (actividad: ActividadesProps) => {
        setActividadSeleccionada(actividad);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setActividadSeleccionada(null);
    };

    return {
        modalVisible,
        actividadSeleccionada,
        openModal,
        closeModal,
    };
};