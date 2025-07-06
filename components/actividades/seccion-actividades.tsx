// components/secciones/SeccionActividades.tsx
import {
    FlatList,
    StyleSheet,
    Dimensions,
} from 'react-native';
import CarruselActividades from '../ui/actividadesPopulares';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HeaderSeccionActividades() {
    const router = useRouter();

    const carruselData = [
        {
            id: '1',
            titulo: 'Excursión a la montaña',
            descripcion: 'Disfruta de un día en la naturaleza con esta emocionante excursión.',
            ubicacion: 'Parque Nacional',
            rating: 4.5,
            imagen: 'https://images.unsplash.com/photo-1747767763480-a5b4c7a82aef?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0',
        },
        {
            id: '2',
            titulo: 'Clase de cocina local',
            descripcion: 'Aprende a cocinar platos típicos de la región con un chef local.',
            ubicacion: 'Centro Cultural',
            rating: 4.8,
            imagen: 'https://plus.unsplash.com/premium_photo-1683707120391-6c0da3cac6be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
        },
    ];

    return (
        <FlatList
            data={carruselData}
            renderItem={({ item }) => (
                <CarruselActividades
                    id={item.id}
                    categoria="Actividades"
                    titulo={item.titulo}
                    descripcion={item.descripcion}
                    ubicacion={item.ubicacion}
                    rating={item.rating}
                    imagen={item.imagen}
                    onPress={() => router.push('/(tabs)/pantalla_home')}
                />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width}
            decelerationRate="fast"
            snapToAlignment="center"
            contentContainerStyle={styles.listContent}
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 0,
    },
});
