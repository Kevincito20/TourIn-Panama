//Listo, mejorable
//cambiar las ref de map para el movimiento de la camara
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//TYPE
type PropActivity = {
  id: number;
  encabezado: string;
  descp: string;
  rating: number;
  latitud: number;
  longitud: number;
  foto_url: string;
  id_cat: number;
};
type latlng = {
  latitude: number;
  longitude: number;
};
interface Actividades2Props {
  marker: PropActivity;
  mapRef: any;
  seguir: any;
  mostrarSoloCuerpo: any;
  statusMapDirections: any;
  setDestination: any;
}

export function PanelIndicaciones({
  marker,
  mapRef,
  seguir,
  mostrarSoloCuerpo,

  statusMapDirections,
  setDestination,
}: Actividades2Props) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

  const [siguiendo, setSiguiendo] = useState(false);
  const [siguiendoRuta, setSiguiendoRuta] = useState(false);

  const panamaView = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 12,
    pitch: 0,
    heading: 0,
    altitude: 1000,
  };

  const panamaView2 = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 12,
    pitch: 0,
    heading: 0,
    altitude: 1000,
  };
  const handleIndicaciones = () => {
    if (!siguiendoRuta) {
      setSiguiendoRuta(true);
      mostrarSoloCuerpo(true);
      mapRef.current?.animateCamera(panamaView, { duration: 1000 });
      statusMapDirections(1);
      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      ocultarBoton();
    } else {
      mostrarSoloCuerpo(false);
      mostrarBoton();
      setSiguiendoRuta(false);
      statusMapDirections(0);
      mapRef.current?.animateCamera(panamaView2, {
        duration: 1000,
      });
    }
  };

  const handleSeguir = () => {
    if (!siguiendo) {
      setSiguiendo(true);
      seguir(true);
      statusMapDirections(1);

      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      ocultarBoton2();
    } else {
      setSiguiendo(false);
      seguir(false);
      statusMapDirections(0);

      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      mostrarBoton2();
    }
  };

  const ocultarBoton = () => {
    Haptics.selectionAsync();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false)); // al terminar, lo ocultamos
  };

  const mostrarBoton = () => {
    setVisible(true); // Mostrar el componente antes de animar

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0, // vuelve a su posición original
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1, // vuelve a ser visible
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const ocultarBoton2 = () => {
    Haptics.selectionAsync();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -1, // se mueve hacia abajo
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible2(false)); // al terminar, lo ocultamos
  };

  const mostrarBoton2 = () => {
    setVisible2(true); // Mostrar el componente antes de animar

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 1, // vuelve a su posición original
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1, // vuelve a ser visible
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.container}>
      <View  >
        {visible2 && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.directionsButton,
              siguiendoRuta && styles.activeButton,
            ]}
            onPress={handleIndicaciones}
          >
            <View style={styles.buttonContent}>
              <View
                style={[
                  styles.iconContainer,
                  siguiendoRuta && styles.activeIconContainer,
                ]}
              >
                <FontAwesome5 name="directions" size={24} color="black" />
              </View>
              <Text
                style={[
                  styles.buttonText,
                  siguiendoRuta && styles.activeButtonText,
                ]}
              >
                {siguiendoRuta ? "Cancelar" : "Indicaciones"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View >
        {visible && (
          <Animated.View
            style={[
              styles.botonAnimado,
              {
                transform: [{ translateY }],
                opacity,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.botonAnimado,
                {
                  transform: [{ translateY }],
                  opacity,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.actionButton,
                
                  siguiendo && styles.activeButton,
                ]}
                onPress={handleSeguir}
                activeOpacity={0.8}
              >
                <View style={styles.buttonContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      siguiendo && styles.activeIconContainer,
                    ]}
                  >
                    <Ionicons
                      name={siguiendo ? "close" : "navigate-outline"}
                      size={30}
                      color={siguiendo ? "#fff" : "#000000ff"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.buttonText,
                      siguiendo && styles.activeButtonText,
                    ]}
                  >
                    {siguiendo ? "Cancelar" : "Seguir"}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    width: 94,
    //top:30,
   // margin: 8,
    
    //backgroundColor: colors.primaryBlue,
    borderRadius: 24,
    padding: 5,
    gap:5,
    //elevation: 8,
    /*shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,*/
  },

  botonAnimado: {
    borderRadius: 8,
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  actionButton: {
    backgroundColor:colors.cardColor ,

    flex: 1,
    //width:50,
    //height:50,

    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 5,
    //borderWidth: 5,
    //backgroundColor: "#007af3ff",
    elevation: 8,
shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  directionsButton: {
    //borderColor: "#000000ff",
  },
  activeButton: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
    transform: [{ scale: 0.98 }],
  },
  buttonContent: {
    
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    //backgroundColor: "#ff0000ff",
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#000000ff",
    textAlign: "center",
  },
  activeButtonText: {
    color: "#ffffff",
  },
});
