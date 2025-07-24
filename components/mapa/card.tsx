//Listo, mejorable
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
  style?: StyleProp<ViewStyle>;
};

export function OverlayComponent({ title, description, imageUrl, style }: Props) {
  return (
    <View style={[styles.overlay, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#0008",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    width: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "white",
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
});
