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
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function PantallaDetalleProvincia() {
  const route = useRoute<RouteProp<{ params: { provincia: string } }, 'params'>>();
  const navigation = useNavigation();
  const { provincia } = route.params;

  const data = contentCards.filter((item) => item.provincia === provincia);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header sin fondo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primaryBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{provincia}</Text>
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primaryBlue,
    marginLeft: 10,
  },
  scrollContainer: {
    paddingBottom: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.89,
    backgroundColor: '#fff',
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
});
