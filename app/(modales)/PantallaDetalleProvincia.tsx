import { contentCards } from '@/assets/contentConocerPanama';
import { colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PantallaDetalleProvincia() {
  const route = useRoute<RouteProp<{ params: { provincia: string } }, 'params'>>();
  const navigation = useNavigation();
  const { provincia } = route.params;

  const data = contentCards.filter((item) => item.provincia === provincia);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Image source={{ uri: item.imagen }} style={styles.image} />

              <View style={styles.categoriaContainer}>
                <Text style={[styles.categoriaTexto, { color: item.colorCard }]}>
                  {item.categoria}
                </Text>
              </View>
            </View>

            <View style={styles.overlay}>
              <Text style={styles.tituloTexto}>{item.titulo}</Text>
              <Text style={styles.informacion}>{item.informacion}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,

  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
  },
  card: {
    width: width * 0.89,
    backgroundColor: '#ffffffff',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  categoriaContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 11,
  },
  categoriaTexto: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  overlay: {
    padding: 16,
  },
  tituloTexto: {
    color: colors.primaryBlue,
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10,
  },
  informacion: {
    color: colors.primaryBlue,
    fontSize: 14,
    marginBottom: 6,
  },
  descripcion: {
    color: colors.lightBlue,
    fontSize: 13,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 20,
  },
});
