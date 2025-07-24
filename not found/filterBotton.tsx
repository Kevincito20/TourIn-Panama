//Descontinuado
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
  useAnimatedValue,
  View,
} from "react-native";
import IconFilter from "./iconsFilter";

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

interface prop {
  setFiltro: any;
}
const FilterBottom = ({ setFiltro }: prop) => {
  const [ancho, setAncho] = useState("21%");
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {
    console.log("putitas");

    // Cambiará el valor de fadeAnim a 1 en 5 segundos
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Cambiará el valor de fadeAnim a 0 en 3 segundos
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(false);

  const mostrarBoton = () => {
    Haptics.selectionAsync();
    console.log("hello mostrar");
    setVisible(true); // Mostrar el componente antes de animar

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

    console.log("hello ocultar");
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
      </View>
      {visible && (
        <View style={styles.contenido}>
          <Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {activityItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setFiltro(item.id);
                    console.log(item.id);
                  }}
                >
                  <IconFilter item={item} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      )}

      
      <TouchableWithoutFeedback onPress={visible ? ocultarBoton : mostrarBoton}>
        <Animated.View style={[styles.button2]}>
          <AntDesign
            name={visible ? "caretleft" : "caretright"}
            size={28}
            color="black"
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
 textContainer: {
  ...StyleSheet.absoluteFillObject, // Ocupa todo el contenedor
  top: -24, // Ajusta según cuánto quieras que suba el texto
  backgroundColor: "#FFFFFF", // O el mismo color del contenedor si lo prefieres
  alignItems: "center",
  justifyContent: "flex-start", // Para que el texto quede arriba
  paddingTop: 4, 
  borderRadius:24

},


 textoFiltro: {
  fontSize: 14,
  fontWeight: "bold",

  
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 6,
},


  contenido: {
    width: 260,
  },
  contenedor: {
    flexDirection: "row",
    position: "absolute",
    minWidth: "21%",
    top: 180,
    margin: 8,
    backgroundColor: "#e41919ff",
   // borderRadius: 24,
   borderBottomLeftRadius:24,
   borderBottomEndRadius:24,
    padding: 5,
    
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  button2: {
    width: 60,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: "flex-end",
    justifyContent: "center",

    shadowRadius: 10,
    shadowColor: "#FO2A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 },
  

  },
});

export default FilterBottom;
/**
 * <ActivityCard
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    backgroundColor={item.backgroundColor}
                    backgroundImage={item.backgroundImage}
                    onPress={() => {
                      router.push({
                        pathname: "/(tabs)/pantalla_mapa copy",
                        params: {
                          id_cat: String(item.id),
                        },
                      });
                      //console.log('Categoría presionada:', item.title)
                    }}
                  />
 */
