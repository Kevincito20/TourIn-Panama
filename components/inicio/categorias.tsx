import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';

export interface ActivityItem {
  id: string;
  title: string;
  icon: string;
  type?: string;
  backgroundColor: string;
  backgroundImage: string; // URL
}

export const activityItems: ActivityItem[] = [
  {
    id: '1',
    title: 'Naturaleza y Aventura',
    icon: 'leaf-outline',
    type: 'tour',
    backgroundColor: '#34D399',
    backgroundImage: 'https://thumbs.dreamstime.com/b/bosque-lluvioso-de-panama-viejo-puente-colgante-en-la-jungla-centroam%C3%A9rica-237613462.jpg',
  },
  {
    id: '2',
    title: 'Actividades Acuáticas',
    icon: 'water-outline',
    type: 'parque',
    backgroundColor: '#60A5FA',
    backgroundImage: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_700,q_75,w_1200/v1/clients/panama-update/TABAO_17_1__26f6f755-7eae-4952-8b4e-d546d41dfbb0.jpg',
  },
  {
    id: '3',
    title: 'Historia y Cultura',
    icon: 'book-outline',
    type: 'museo',
    backgroundColor: '#FBBF24',
    backgroundImage: 'https://upinforma.com/nuevo/images/noticias/1538762238panama_viejo.jpg',
  },
  {
    id: '4',
    title: 'Arte y Entretenimiento',
    icon: 'musical-notes-outline',
    type: 'mirador',
    backgroundColor: '#F472B6',
    backgroundImage: 'https://prensa.com/resizer/v2/2JRMWWP47NDAZEFJ2KLN2LQFPU.jpg?auth=8017de2547c4491befc969dd0b393a76a77071477aea1a1b6c3c00424e50bb8a&width=1200',
  },
  {
    id: '5',
    title: 'Compras y Artesanía',
    icon: 'cart-outline',
    type: 'comida',
    backgroundColor: '#A78BFA',
    backgroundImage: 'https://media.istockphoto.com/id/155247317/es/foto/mola.jpg?s=612x612&w=0&k=20&c=lbDxog_MrXxqbhuwbj19grO5bK3whOw9RcHCq8ao0JU=',
  },
  {
    id: '6',
    title: 'Vida Urbana y Nocturna',
    icon: 'moon-outline',
    type: 'comida',
    backgroundColor: '#F87171',
    backgroundImage: 'https://static.vecteezy.com/system/resources/thumbnails/012/435/983/small_2x/panama-city-skyline-at-night-with-water-reflecting-the-light-photo.jpg',
  },
];

const ActivityCard = ({
  title,
  icon,
  backgroundColor,
  backgroundImage,
  onPress,
}: Omit<ActivityItem, 'id' | 'type'> & { onPress?: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <ImageBackground
      source={{ uri: backgroundImage }}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
      style={[styles.imageBackground, { backgroundColor }]}
    >
      <Ionicons name={icon as any} size={32} color="#FFFFFF" style={styles.iconTopRight} />
      <Text style={styles.label}>{title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

export default function Categorias() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explora por Categoría</Text>
      <View style={styles.grid}>
        {activityItems.map((item) => (
          <ActivityCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
            onPress={() => console.log('Categoría presionada:', item.title)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 50,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 100,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  iconTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: colors.iconPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
