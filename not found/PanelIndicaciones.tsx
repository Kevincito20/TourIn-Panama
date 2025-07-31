//Listo, mejorable
//cambiar las ref de map para el movimiento de la camara
import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cargarMapType, guardarMapType } from "./functions";
import InfoViaje from "./infoViaje";

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
  distancia: any;
  duracion: any;
  activarSeguimiento: any;
}

export function PanelIndicaciones({
  marker,
  mapRef,
  seguir,
  mostrarSoloCuerpo,
  distancia,
  duracion,
  statusMapDirections,
  setDestination,
  activarSeguimiento,
}: Actividades2Props) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

  const [siguiendo, setSiguiendo] = useState(false);
  const [mostrar, setmostrar] = useState(Boolean);
  //new consts
  const [destino, setDestino] = useState<latlng>();
  const [pressSeguir, setpressSeguir] = useState(Boolean);
  const [actividad, setActividad] = useState<PropActivity | null>(null);

  //seguimiento
  const [siguiendoRuta, setSiguiendoRuta] = useState(false);

  /*   useEffect(() => {
   

    if (siguiendo) {
 
      guardarMapType({ lugar: "seguimiento", tipo: seguiActividad });
      console.log("desde panel aplicaciones datos de seguimiento", seguiActividad);
    }
  }, [siguiendo]);
 */

  useEffect(() => {
    cargarSeguimiento();
  }, [pressSeguir]);

  const cargarSeguimiento = async () => {
    const { data, error } = await cargarMapType("seguimiento1");
    console.log("dede el panel de indicaciones press seguir");
    setSiguiendo(data[1]);
    if (data[1] === true) {
      setVisible2(false);
      setSiguiendo(data[1]);
      setmostrar(data[1]);
    }
    setVisible2(true);
  };

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
      setmostrar(true);
      mapRef.current?.animateCamera(panamaView, { duration: 1000 });
      statusMapDirections(1);

      //destino
      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });

      ocultarBoton();
    } else {
      setmostrar(false);
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

      // setmostrar(true);

      // statusMapDirections(1);

      setDestino({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      setpressSeguir(true);
      setActividad(marker);

      const datos = [destino, pressSeguir, actividad];

      guardarMapType({ lugar: "seguimiento1", tipo: datos });
      activarSeguimiento(true);

      ocultarBoton2();
    } else {
      setSiguiendo(false);
      seguir(false);

      guardarMapType({ lugar: "seguimiento", tipo: false });

      statusMapDirections(0);
      setmostrar(false);

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
      <View>
        {visible2 && (
          <TouchableOpacity
            style={[styles.actionButton, siguiendoRuta && styles.activeButton]}
            onPress={handleIndicaciones}
          >
            <View style={styles.buttonContent}>
              <View
                style={[
                  styles.iconContainer,
                  siguiendoRuta && styles.activeIconContainer,
                ]}
              >
                <FontAwesome5 name="directions" size={25} color="black" />
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

      <View>
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
                style={[styles.actionButton, siguiendo && styles.activeButton]}
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
                    <MaterialIcons
                      name={siguiendo ? "close" : "navigation"}
                      size={24}
                      color={siguiendo ? "#fff" : "#000000ff"}
                    />
                    {/* <Ionicons
                      name={siguiendo ? "close" : "navigate-circle-sharp"}
                      size={25}
                      color={siguiendo ? "#fff" : "#000000ff"}
                    />*/}
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

      {mostrar && <InfoViaje distancia={distancia} duracion={duracion} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    borderRadius: 12,
    padding: 8,
    gap: 10,
  },
  botonAnimado: {
    borderRadius: 8,
  },
  actionButton: {
    elevation: 5,
    backgroundColor: colors.navIndicaciones,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 5,
  },

  activeButton: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
    transform: [{ scale: 0.98 }],
  },
  buttonContent: {
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    fontSize: 12,
    color: "#000000ff",
    textAlign: "center",
  },
  activeButtonText: {
    color: "#ffffff",
  },
});
