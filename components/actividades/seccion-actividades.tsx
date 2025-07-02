import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CarruselActividades from '../ui/actividadesPopulares';
import { useRouter } from 'expo-router';
import { CardsActividades } from './seccion-cardActividades';

const { width } = Dimensions.get('window');

export default function SeccionActividades() {
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

    const filtros = [
        { id: '1', nombre: 'Todos', icono: 'earth', color: '#4CAF50' },
        { id: '2', nombre: 'Montaña', icono: 'trail-sign', color: '#8BC34A' },
        { id: '3', nombre: 'Cultura', icono: 'library', color: '#FFC107' },
        { id: '4', nombre: 'Comida', icono: 'restaurant', color: '#FF5722' },
        { id: '5', nombre: 'Playa', icono: 'umbrella', color: '#03A9F4' },
        { id: '6', nombre: 'Aventura', icono: 'walk', color: '#9C27B0' },
        { id: '7', nombre: 'Naturaleza', icono: 'leaf', color: '#4DB6AC' },
        { id: '8', nombre: 'Historia', icono: 'time', color: '#9E9E9E' },
        { id: '9', nombre: 'Arte', icono: 'color-palette', color: '#E91E63' },
        { id: '10', nombre: 'Nocturno', icono: 'moon', color: '#673AB7' },
    ];

    const renderFiltro = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.filtroButton, { backgroundColor: '#fff', shadowColor: item.color }]}
            onPress={() => console.log('Filtro seleccionado:', item.nombre)}
        >
            <Ionicons name={item.icono as any} size={24} color={item.color} />
            <Text style={styles.filtroText}>{item.nombre}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={() => (
                <FlatList
                    data={carruselData}
                    renderItem={({ item }) => (
                        <CarruselActividades
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
            )}
            ListFooterComponent={
                <View style={styles.footerContainer}>
                    <Text style={styles.title}>Lugares Populares</Text>

                    <FlatList
                        data={filtros}
                        renderItem={renderFiltro}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filtrosContainer}
                    />

                    <CardsActividades />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 0,
    },
    footerContainer: {
        paddingTop: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        paddingHorizontal: 16,
    },
    filtrosContainer: {
        gap: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    filtroButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        padding: 10,
        borderRadius: 16,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        minWidth: 80,
    },
    filtroText: {
        marginTop: 6,
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
    },
});
