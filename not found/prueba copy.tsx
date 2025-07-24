//Fue reemplazado por PanelIndicaciones
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
 bottomSheetRef:any;
  mapRef:any;
  seguir: any;
  mostrarSoloCuerpo?: boolean;
  statusMapDirections: any;
  setDestination: any;
}

export function ComponenteDiseño({
  marker,
  mapRef,
  seguir,
  mostrarSoloCuerpo,
  bottomSheetRef,
  statusMapDirections,
  setDestination,
}: Actividades2Props) {
  const [siguiendo, setSiguiendo] = useState(false);
  const [siguiendoRuta, setSiguiendoRuta] = useState(false);

  const router = useRouter();

  const panamaView = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 15,
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
      // mapRef.current?.animateCamera(panamaView, { duration: 1000 })
      bottomSheetRef.current?.snapToIndex(0);
      statusMapDirections(1);
      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      ocultarBoton();
     
    } else {
      mostrarBoton();
      setSiguiendoRuta(false);
      statusMapDirections(0);
      mapRef.current?.animateCamera(panamaView2, {
        duration: 1000,
      });
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  const handleSeguir = () => {
    if (!siguiendo) {
      setSiguiendo(true);
      seguir(true);
      statusMapDirections(1);
      bottomSheetRef.current?.snapToIndex(0);
      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      
    } else {
      setSiguiendo(false);
      seguir(false);
      statusMapDirections(0);
      bottomSheetRef.current?.snapToIndex(0);
       setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
    }
  };

  //animacion de los botones
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);

  const ocultarBoton = () => {
        Haptics.selectionAsync()
    
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 50, // se mueve hacia abajo
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setSiguiendo(false)); // al terminar, lo ocultamos
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
  //navigate-outline
  /*<Ionicons
                    name={siguiendoRuta ? "close" : "navigate-outline"}
                    size={20}
                    color={siguiendoRuta ? "#fff" : "#2563eb"}
                  />*/
  return (
    <>
      {!mostrarSoloCuerpo && (
        <View style={styles.container}>
          <View style={styles.buttonRow}>
            {/* Botón de Indicaciones */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.directionsButton,
                siguiendoRuta && styles.activeButton,
              ]}
              onPress={handleIndicaciones}
              activeOpacity={0.8}
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

            {/* Botón de Seguir */}
            {visible && ( 
              
              <Animated.View style={[styles.botonAnimado, {
                        transform: [{ translateY }],
                        opacity,
                      }]}>
                        <TouchableOpacity
              style={[
                styles.actionButton,
                styles.followButton,
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
            )}
            
          </View>
        </View>
      )}
      
    </>
  );
}

export const styles = StyleSheet.create({
  botonAnimado: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8
  },
  container: {
    position: "absolute",
    width: "21%",
    margin: 8,
    backgroundColor: "#ffffffff",
    borderRadius: 24,
    padding: 5,
    zIndex: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  buttonRow: {
    flexDirection: "column",
    gap: 10,
  },

  actionButton: {
    flex: 1,
    //width:50,
    //height:50,

    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 5,
    //borderWidth: 5,
    //backgroundColor: "#007af3ff",
  },

  directionsButton: {
    //borderColor: "#000000ff",
  },

  followButton: {
    //borderColor: "#ff0000ff",
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
    backgroundColor: "#ffffffff",
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
