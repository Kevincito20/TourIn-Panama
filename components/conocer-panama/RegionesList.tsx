import { regiones } from '@/components/conocer-panama/regionesData';
import { colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.89;
const CARD_HEIGHT = 200;

export default function RegionesList() {
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>({});
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conoce Panamá</Text>
        <Text style={styles.subtitle}>Historia / Geografía / Tradiciones / Datos Curiosos</Text>
      </View>

      {regiones.map((region, index) => {
        const flatListRef = useRef<FlatList>(null);

        const onViewRef = useRef(({ viewableItems }: any) => {
          if (viewableItems.length > 0) {
            setActiveIndices((prev) => ({
              ...prev,
              [region.titulo]: viewableItems[0].index,
            }));
          }
        });

        const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

        return (
          <View
            key={region.titulo}
            style={[styles.regionContainer, index === 0 && { marginTop: 16 }]}
          >
            <Text style={styles.regionTitle}>{region.titulo}</Text>

            <FlatList
              ref={flatListRef}
              data={region.provincias}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + 4}
              snapToAlignment="start"
              decelerationRate="fast"
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 4 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('PantallaDetalleProvincia', { provincia: item.nombre })}
                >
                  <Image source={{ uri: item.imagen }} style={styles.image} />
                  <View style={styles.textOverlay}>
                    <Text style={styles.provinciaNombre}>{item.nombre}</Text>
                  </View>

                  <View style={styles.dotsOverlay}>
                    {region.provincias.map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.dot,
                          activeIndices[region.titulo] === i && styles.activeDot,
                        ]}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              )}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  header: {
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightBlue,
  },
  regionContainer: {
    marginBottom: 20,
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: 7,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    
  },
  textOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  provinciaNombre: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  dotsOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#ffffffff',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
