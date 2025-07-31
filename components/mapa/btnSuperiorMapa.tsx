//Listo, mejorable
//cambiar las ref de map para el movimiento de la camara
import { colors } from "@/constants/Colors";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Info } from "./FuncionSeguimiento";
import { cargarMapType, guardarMapType } from "./functions";
import { PropActivity } from "./MarcadorAct";

interface Actividades2Props {
  marker: PropActivity;
  mapRef: any;
  statusMapDirections: any;
  setDestination: any;
  distancia: any;
  duracion: any;
  activarSeguimiento: any;
}

export function NewPanelIndicaciones({
  marker,
  mapRef,
  distancia,
  duracion,
  setDestination,
  activarSeguimiento,
  statusMapDirections,
}: Actividades2Props) {
  const [pressSeguir, setpressSeguir] = useState(false);
  const [indicacionesBtn, setindicacionesBtn] = useState(true);
  const [seguirbtn, setseguirbtn] = useState(true);
  const [mostrar, setmostrar] = useState(Boolean);
  const [siguiendoRuta, setSiguiendoRuta] = useState(false);

  useEffect(() => {
    cargarSeguimiento();
  }, []);

  const cargarSeguimiento = async () => {
    const { data, error } = await cargarMapType("seguimiento");
    setpressSeguir(data[0]);
    setindicacionesBtn(!data[0]);
    setmostrar(data[0]);
  };

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
      Haptics.selectionAsync();
      setSiguiendoRuta(true);
      setmostrar(true);
      mapRef.current?.animateCamera(panamaView, { duration: 300 });
      statusMapDirections(1);
      setDestination({
        latitude: marker.latitud,
        longitude: marker.longitud,
      });
      setseguirbtn(false);
    } else {
      setmostrar(false);
      setSiguiendoRuta(false);
      mapRef.current?.animateCamera(panamaView2, {
        duration: 1000,
      });
      statusMapDirections(0);
      setseguirbtn(true);
    }
  };

  const handleSeguir = () => {
    if (!pressSeguir) {
      Haptics.selectionAsync();
      const datos = [
        true,
        marker,
      ];
      guardarMapType({ lugar: "seguimiento", tipo: datos });
      setpressSeguir(true);
      activarSeguimiento(true);
      setindicacionesBtn(false);
      setmostrar(true);
    } else {
      guardarMapType({ lugar: "seguimiento", tipo: [false,marker] });
      mapRef.current?.animateCamera(panamaView2, {
        duration: 1000,
      });
      setpressSeguir(false);
      activarSeguimiento(false);
      setindicacionesBtn(true);
      statusMapDirections(0);
      setmostrar(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {indicacionesBtn && (
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
        {seguirbtn && (
          <TouchableOpacity
            style={[styles.actionButton, pressSeguir && styles.activeButton]}
            onPress={handleSeguir}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <View
                style={[
                  styles.iconContainer,
                  pressSeguir && styles.activeIconContainer,
                ]}
              >
                <MaterialIcons
                  name={pressSeguir ? "close" : "navigation"}
                  size={24}
                  color={pressSeguir ? "#fff" : "#000000ff"}
                />
              </View>
              <Text
                style={[
                  styles.buttonText,
                  pressSeguir && styles.activeButtonText,
                ]}
              >
                {pressSeguir ? "Cancelar" : "Seguir"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {mostrar && <Info duracion={duracion} distancia={distancia} />}
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
