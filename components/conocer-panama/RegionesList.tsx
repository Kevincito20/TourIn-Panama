import { regiones } from '@/components/conocer-panama/regionesData';
import { colors } from '@/constants/Colors';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';


const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.89;
const CARD_HEIGHT = 200;

export default function RegionesList() {
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌎 Conoce Panamá</Text>
        <Text style={styles.subtitle}>Explora su historia, geografía y cultura</Text>
        <View style={styles.divider} />
      </View>

      {regiones.map((region, index) => {
        const flatListRef = useRef<FlatList>(null);
        const [currentIndex, setCurrentIndex] = useState(0);

        const onViewRef = useRef(({ viewableItems }: any) => {
          if (viewableItems.length > 0) {
            setActiveIndices((prev) => ({
              ...prev,
              [region.titulo]: viewableItems[0].index,
            }));
          }
        });

        const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

        useEffect(() => {
          const interval = setInterval(() => {
            const nextIndex =
              (currentIndex + 1) % region.provincias.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
          }, 2000);
          return () => clearInterval(interval);
        }, [currentIndex]);

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
                  onPress={() =>
                    router.push({
                      pathname: '/PantallaDetalleProvincia',
                      params: { provincia: item.nombre },
                    })
                  }
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
    marginBottom: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primaryBlue,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    marginTop: 10,
    width: 60,
    height: 4,
    backgroundColor: colors.primaryBlue,
    borderRadius: 2,
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
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
