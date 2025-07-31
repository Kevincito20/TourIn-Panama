//Listo
import { decode } from "@mapbox/polyline";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LatLng, Polyline } from "react-native-maps";

const GOOGLE_MAPS_APIKEY = "AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78";

type Props = {
  origin: LatLng;
  destination: LatLng;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setDistance: React.Dispatch<React.SetStateAction<string>>;
};

const CustomPolyline: React.FC<Props> = ({
  origin,
  destination,
  setDuration,
  setDistance,
}) => {
  const origen = [origin.latitude, origin.longitude].toString();
  const destino = [destination.latitude, destination.longitude].toString();
  const [polylineCoords, setPolylineCoords] = useState<LatLng[]>([]);

  useEffect(() => {
    const obtenerRutaDetallada = async () => {
      const key = GOOGLE_MAPS_APIKEY;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origen}&destination=${destino}&key=${key}`;
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
  }, [origin, destination]);

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
};

export function Info({ duracion, distancia }: InfoProps) {
  return (
    <View style={styles.followBtn1}>
      <Text style={styles.title}>
        Tiempo: {duracion} distancia: {distancia}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  followBtn1: {
    backgroundColor: "white",

    width: 220,
    elevation: 5,
    padding: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,

    color: "#000000ff",
  },
});

export default CustomPolyline;
