/* Listo */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { handlePressCatActivity } from "./handlePress";

export interface ActivityItem {
  id: string;
  title: string;
  icon: string;
  type?: string;
  backgroundColor: string;
  backgroundImage: string; 
}

export const activityItems: ActivityItem[] = [
  {
    id: "1",
    title: "Naturaleza y Aventura ",
    icon: "leaf-outline",
    type: "tour",
    backgroundColor: "#34D399",
    backgroundImage:
      "https://thumbs.dreamstime.com/b/bosque-lluvioso-de-panama-viejo-puente-colgante-en-la-jungla-centroam%C3%A9rica-237613462.jpg",
  },
  {
    id: "2",
    title: "Actividades Acuáticas ",
    icon: "water-outline",
    type: "parque",
    backgroundColor: "#60A5FA",
    backgroundImage:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_700,q_75,w_1200/v1/clients/panama-update/TABAO_17_1__26f6f755-7eae-4952-8b4e-d546d41dfbb0.jpg",
  },
  {
    id: "3",
    title: "Historia y Cultura ",
    icon: "book-outline",
    type: "museo",
    backgroundColor: "#FBBF24",
    backgroundImage:
      "https://upinforma.com/nuevo/images/noticias/1538762238panama_viejo.jpg",
  },
  {
    id: "4",
    title: "Arte y Entretenimiento ",
    icon: "musical-notes-outline",
    type: "mirador",
    backgroundColor: "#F472B6",
    backgroundImage:
      "https://prensa.com/resizer/v2/2JRMWWP47NDAZEFJ2KLN2LQFPU.jpg?auth=8017de2547c4491befc969dd0b393a76a77071477aea1a1b6c3c00424e50bb8a&width=1200",
  },
  {
    id: "5",
    title: "Compras y Artesanía ",
    icon: "cart-outline",
    type: "comida",
    backgroundColor: "#A78BFA",
    backgroundImage:
      "https://media.istockphoto.com/id/155247317/es/foto/mola.jpg?s=612x612&w=0&k=20&c=lbDxog_MrXxqbhuwbj19grO5bK3whOw9RcHCq8ao0JU=",
  },
  {
    id: "null",
    title: "Todos",
    icon: "moon-outline",
    type: "comida",
    backgroundColor: "#ff0000ff",
    backgroundImage:
      "https://static.vecteezy.com/system/resources/thumbnails/012/435/983/small_2x/panama-city-skyline-at-night-with-water-reflecting-the-light-photo.jpg",
  },
  {
    id: "6",
    title: "Vida Urbana y Nocturna ",
    icon: "moon-outline",
    type: "comida",
    backgroundColor: "#d971f8ff",
    backgroundImage:
      "https://static.vecteezy.com/system/resources/thumbnails/012/435/983/small_2x/panama-city-skyline-at-night-with-water-reflecting-the-light-photo.jpg",
  },
];

const Categories = ({setModal}:any) => {
  return (
    <View style={styles.container}>
      {activityItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.cardContainer,
            { backgroundColor: item.backgroundColor },
          ]}
          onPress={() => {
            handlePressCatActivity(item.id);
            setModal(false);
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 25,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});

export default Categories;
