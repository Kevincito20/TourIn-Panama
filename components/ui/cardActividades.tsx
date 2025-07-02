import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import { ActividadesProps } from './actividadesPopulares';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ListaActividades({
    titulo,
    ubicacion,
    rating,
    imagen,
    onPress,
}: ActividadesProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{ uri: imagen }}
                        style={styles.image}
                        imageStyle={{ borderRadius: 12 }}
                    >
                        <View style={styles.favoriteIconContainer}>
                            <Ionicons name="heart-outline" size={24} color="#fff" />
                        </View>

                        <View style={styles.overlay}>
                            <Text style={styles.title}>{titulo}</Text>
                            <Text style={styles.location}>{ubicacion}</Text>
                            <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.45,
        height: 225, // Aumentada la altura
        marginHorizontal: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        marginVertical: 10,
    },
    imageContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: 10,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    favoriteIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    location: {
        color: '#eee',
        fontSize: 14,
        marginBottom: 4,
    },
    rating: {
        color: '#ffd700',
        fontSize: 14,
        fontWeight: '600',
    },
});