//listo
// mejorar el ref de la camara y agregar una vista del filtro
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFiltroInicial } from "../mapa/FiltroActividades";

import { colors } from "@/constants/Colors";
import Categories from "./optionsNavFiltro";
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
    id: "1",
    title: "Naturaleza y Aventura",
    icon: "leaf-outline",
    type: "tour",
    backgroundColor: "#34D399",
    backgroundImage:
      "https://thumbs.dreamstime.com/b/bosque-lluvioso-de-panama-viejo-puente-colgante-en-la-jungla-centroam%C3%A9rica-237613462.jpg",
  },
  {
    id: "2",
    title: "Actividades Acuáticas",
    icon: "water-outline",
    type: "parque",
    backgroundColor: "#60A5FA",
    backgroundImage:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_700,q_75,w_1200/v1/clients/panama-update/TABAO_17_1__26f6f755-7eae-4952-8b4e-d546d41dfbb0.jpg",
  },
  {
    id: "3",
    title: "Historia y Cultura",
    icon: "book-outline",
    type: "museo",
    backgroundColor: "#FBBF24",
    backgroundImage:
      "https://upinforma.com/nuevo/images/noticias/1538762238panama_viejo.jpg",
  },
  {
    id: "4",
    title: "Arte y Entretenimiento",
    icon: "musical-notes-outline",
    type: "mirador",
    backgroundColor: "#F472B6",
    backgroundImage:
      "https://prensa.com/resizer/v2/2JRMWWP47NDAZEFJ2KLN2LQFPU.jpg?auth=8017de2547c4491befc969dd0b393a76a77071477aea1a1b6c3c00424e50bb8a&width=1200",
  },
  {
    id: "5",
    title: "Compras y Artesanía",
    icon: "cart-outline",
    type: "comida",
    backgroundColor: "#A78BFA",
    backgroundImage:
      "https://media.istockphoto.com/id/155247317/es/foto/mola.jpg?s=612x612&w=0&k=20&c=lbDxog_MrXxqbhuwbj19grO5bK3whOw9RcHCq8ao0JU=",
  },
  {
    id: "6",
    title: "Vida Urbana y Nocturna",
    icon: "moon-outline",
    type: "comida",
    backgroundColor: "#F87171",
    backgroundImage:
      "https://static.vecteezy.com/system/resources/thumbnails/012/435/983/small_2x/panama-city-skyline-at-night-with-water-reflecting-the-light-photo.jpg",
  },
];

const NavFiltro = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(false);

  const mostrarBoton = () => {
    Haptics.selectionAsync();
    setVisible(true);
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 100,
        friction: 15,
        tension: 140,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const ocultarBoton = () => {
    Haptics.selectionAsync();

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.textContainer}>
        <Text style={styles.textoFiltro}>Filtro</Text>
        <TouchableWithoutFeedback
          onPress={visible ? ocultarBoton : mostrarBoton}
        >
          <Animated.View style={styles.icono}>
            <AntDesign
              name={visible ? "caretleft" : "caretright"}
              size={20}
              color="black"
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      {visible && (
        <View>
          <Animated.View style={styles.contenido}>
            <ScrollView>
              {activityItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    useFiltroInicial(item.id, item.backgroundColor);
                    ocultarBoton();
                  }}
                >
                  <Categories item={item} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 24,
    justifyContent: "center",
    position: "relative",
  },

  textoFiltro: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    paddingRight: 28,
  },

  icono: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: colors.navIndicaciones,
    borderRadius: 100,
    padding: 4,
  },

  contenido: {
    flexDirection: "column",
    width: 260,
    height: 300,
  },
  contenedor: {
    backgroundColor: colors.navIndicaciones,
    borderRadius: 24,
    padding: 5,
    minWidth: "21%",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});

export default NavFiltro;
