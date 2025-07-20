// app/(tabs)/pantalla_home.tsx
import { StyleSheet, View } from 'react-native';
import InformacionConocerPanama from '@/components/ui/informacionConocerPanama'
import { contentCards } from '../../../assets/contentConocerPanama';

type Props = {
  provinciaSeleccionada: string;
};
export function CardsInformacionPanama({ provinciaSeleccionada }: Props) {

  const tarjetasFiltradas = contentCards.filter(
    (item) => item.provincia === provinciaSeleccionada
  );

  // const tarjetasFiltradas = provinciaSeleccionada
  //   ? contentCards.filter((item) => item.provincia === provinciaSeleccionada)
  //   : contentCards;

  return (
    <View style={styles.listContainer}>
      {tarjetasFiltradas.map((item) => (
        <InformacionConocerPanama
          key={item.id}
          titulo={item.titulo}
          descripcion={item.descripcion}
          informacion={item.informacion}
          imagen={item.imagen}
          provincia={item.provincia}
          categoria={item.categoria}
          colorCard={item.colorCard}
          nameIcon={item.nameIcon}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 17,
    paddingHorizontal: 12,


  },
});
