import { Image, StyleSheet, Text, View } from "react-native";

type ActivityItem = {
  id: string;
  title: string;
  icon?: string;
  type?: string;
  backgroundColor?: string;
  backgroundImage: string;
};

interface prop {
  item: ActivityItem;
}

const Categories = ({ item }: prop) => {
  const cardBackgroundColor = item.backgroundColor || "#F0F0F0"; // Un gris claro por defecto

  return (
    <View
      style={[styles.cardContainer, { backgroundColor: cardBackgroundColor }]}
    >
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: item.backgroundImage }} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    margin: 8,
    minWidth: 120,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    resizeMode: "cover",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});

export default Categories;
