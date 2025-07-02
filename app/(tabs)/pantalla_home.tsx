import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderInicio } from '../../components/inicio/header-inicio';
import Itinerario from '@/components/inicio/itinerario';
import Recomendaciones from '@/components/inicio/recomendaciones';

export default function PantallaHome() {
  const handleMenuPress = () => {

    alert('Menú presionado');
  };

  return (
    // SafeAreaView asegura que el contenido no choque con notch
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
        <HeaderInicio userName="Kevin" onMenuPress={handleMenuPress} />
        <Itinerario />
        <Recomendaciones />
      </ScrollView>
    </SafeAreaView>
  );
}
