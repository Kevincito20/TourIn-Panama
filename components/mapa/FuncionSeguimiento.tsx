//Listo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { decode } from "@mapbox/polyline";
import * as Haptics from "expo-haptics";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LatLng, Polyline } from "react-native-maps";
const GOOGLE_MAPS_APIKEY = "AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78";

type Props = {
  origin: LatLng;
  destination: LatLng;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setDistance: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;

  Mode: string;
};

const CustomPolyline: React.FC<Props> = ({
  origin,
  destination,
  setDuration,
  setDistance,
  Mode,
}) => {
  const origen = [origin.latitude, origin.longitude].toString();
  const destino = [destination.latitude, destination.longitude].toString();
  const [polylineCoords, setPolylineCoords] = useState<LatLng[]>([]);
  /*   const mode = "walking"; */
  useEffect(() => {
    const obtenerRutaDetallada = async () => {
      const key = GOOGLE_MAPS_APIKEY;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origen}&destination=${destino}&mode=${Mode}&key=${key}`;
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.routes.length) {
          const steps = json.routes[0].legs[0].steps;
          const leg = json.routes[0].legs[0];
          let coords: { latitude: number; longitude: number }[] = [];
          const tiempo = leg.duration.text;
          setDuration(tiempo);

          const distancia = leg.distance.text;
          setDistance(distancia);

          steps.forEach((step: any) => {
            const points = decode(step.polyline.points);
            const stepCoords = points.map(([lat, lng]: [number, number]) => ({
              latitude: lat,
              longitude: lng,
            }));
            coords = coords.concat(stepCoords);
          });

          setPolylineCoords(coords);
        }
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      }
    };
    obtenerRutaDetallada();
  }, [origin, destination, Mode]);

  useEffect(() => {
    const updateRouteWithUserPosition = () => {
      if (!polylineCoords.length) return;

      const nextIndex = polylineCoords.findIndex(
        (coord) => getDistance(origin, coord) < 20
      );

      if (nextIndex > 0) {
        setPolylineCoords(polylineCoords.slice(nextIndex));
      }
    };
    updateRouteWithUserPosition();
  }, [origin]);

  return (
    <View>
      <Polyline
        coordinates={polylineCoords}
        strokeColor="#0000FF"
        strokeWidth={4}
      />
    </View>
  );
};

type InfoProps = {
  duracion: string;
  distancia: string;
  setMode: any;
};

export function Info({ duracion, distancia, setMode }: InfoProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [mainIcon, setMainIcon] = useState<
    "directions-walk" | "directions-bike" | "directions-car"
  >("directions-walk");

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleIconPress = (
    icon: "directions-walk" | "directions-bike" | "directions-car"
  ) => {
    Haptics.selectionAsync();
    if (icon == "directions-walk") {
      setMode("walking");
    } else if (icon == "directions-bike") {
      setMode("bicycling");
    } else {
      setMode("driving");
    }

    const previousMain = mainIcon;
    setMainIcon(icon);
    setShowOptions(false);
  };

  const otherIcons = [
    "directions-walk",
    "directions-bike",
    "directions-car",
  ].filter((icon) => icon !== mainIcon) as (
    | "directions-walk"
    | "directions-bike"
    | "directions-car"
  )[];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "flex-start",
        alignContent: "center",
      }}
    >
      <View style={styles.followBtn1}>
        <Text style={styles.title}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={24}
            color="black"
          />
          Tiempo: {duracion}
        </Text>
        <Text style={styles.title}>
          <MaterialIcons name="access-time" size={24} color="black" />
          distancia: {distancia}
        </Text>
      </View>

      <View>
        {/* Botón principal */}
        <TouchableOpacity style={styles.closeOpenBtn} onPress={toggleOptions}>
          <MaterialIcons name={mainIcon} size={24} color="black" />
        </TouchableOpacity>

        {/* Botones alternativos (cuando showOptions es true) */}
        {showOptions && (
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              marginTop: 5,
            }}
          >
            {otherIcons.map((icon) => (
              <TouchableOpacity
                key={icon}
                style={styles.closeOpenBtn}
                onPress={() => handleIconPress(icon)}
              >
                <MaterialIcons name={icon} size={24} color="black" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeOpenBtn: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  followBtn1: {
    backgroundColor: "white",
    flexDirection: "column",
    width: 220,
    elevation: 5,
    padding: 8,
    borderRadius: 12,
    gap: 5,
  },
  title: {
    fontSize: 14,

    color: "#000000ff",
  },
});

export default CustomPolyline;
