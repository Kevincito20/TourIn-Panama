import CardActivity from "@/components/mapa/cardActividades";
import { colors } from "@/constants/Colors";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { LatLng, MapType } from "react-native-maps";

//local storage
import { NewPanelIndicaciones } from "@/components/mapa/btnSuperiorMapa";
import Filtro from "@/components/mapa/Filtro";
import CustomPolyline from "@/components/mapa/FuncionSeguimiento";
import { cargarMapType } from "@/components/mapa/functions";
import MarcadorAct, { PropActivity } from "@/components/mapa/MarcadorAct";
import CustomUserMarker from "@/components/mapa/userMarker";

type PropSeguimiento = {
  destination: LatLng;
  activarEfecto: boolean | null;
  statusMapViewDirections: boolean;
  selectedId: PropActivity | null;
};

export default function Map() {
  //local storage

  const [press, setPress] = useState(false);
  const [mapType, setMapType] = useState<MapType>("standard");
  const [traffic, setTraffic] = useState(Boolean);
  /* --------------variables----------------*/
  const { id_cat } = useLocalSearchParams();
  const [origin, setOrigin] = useState<LatLng>();
  const [destination, setDestination] = useState<LatLng>();
  const [duracion, setDuracion] = useState("");
  const [distancia, setDistancia] = useState("");
  const mapRef = useRef<MapView | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  /*   const [activarEfecto, setActivarEfecto] = useState(Boolean || null); */
  const [statusMapViewDirections, setStatusMapViewDirections] = useState(false);
  const [selectedId, setSelectedId] = useState<PropActivity | null>(null);
  const [seguiActividad, setSeguirActividad] = useState<PropActivity>();
  const [siguiendoRuta, setSiguiendoRuta] = useState(Boolean || null);


  useEffect(() => {
    if (press) {
      cargar();
      cargar2();
      setPress(false);
    }
  }, [press]);

  const cargar = async () => {
    const { data, error } = await cargarMapType("maptype");
    setMapType(data);
  };

  const cargar2 = async () => {
    const { data, error } = await cargarMapType("traffic");
    setTraffic(data);
  };





  useEffect(() => {
    if (siguiendoRuta) {
      cargar3();

    }
    cargar3();
  }, [siguiendoRuta]);

  const cargar3 = async () => {
    const { data, error } = await cargarMapType("seguimiento");
    const [activar, actividad] = data;

    setStatusMapViewDirections(activar);
    setSeguirActividad(activar);
    setDestination({ latitude: actividad.latitud, longitude: actividad.longitud });
    if (activar) {
      setSelectedId(actividad);
      setSeguirActividad(actividad);
    }
  };

  useEffect(() => {
    if (statusMapViewDirections == true) {
      const iniciarSeguimiento = async () => {
        /*  const { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== "granted") {
           alert("Permiso denegado");
           return;
         } */

        watchRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // ⏱ Actualizar cada 1 segundo
            distanceInterval: 0,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setOrigin({ latitude, longitude });
            /*  console.log("hello", origin);*/
            mapRef.current?.animateCamera({
              center: { latitude, longitude },
              zoom: 15,
              pitch: 0,
              heading: 0,
              altitude: 1000,
            });
          }
        );
      };

      iniciarSeguimiento();
      /*       console.log("hello", routeCoordinates); */
    }

    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }
    };
  }, [statusMapViewDirections]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      mapRef.current?.animateCamera({
        center: { latitude, longitude },
        zoom: 9,
        altitude: 1000,
      });
    })();

    cargar3();
  }, []);

  /* Funciones*/

  /* activar o desactivar el mapViewDirections */
  function handleValueChange(value: number) {
    if (value === 0 || value === 1) {
      setStatusMapViewDirections(Boolean(value));
    } else {
      console.warn("Valor inválido para statusMapViewDirections:", value);
    }
  }

  /*Funcion para saber si el usuario llego a la ubicacion*/
  /*   function getDistanceInMeters(p1: LatLng, p2: LatLng): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Radio de la Tierra en metros
    const dLat = toRad(p2.latitude - p1.latitude);
    const dLon = toRad(p2.longitude - p1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(p1.latitude)) *
        Math.cos(toRad(p2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  useEffect(() => {
    if (origin && destination) {
      const distance = getDistanceInMeters(origin, destination);
      if (distance <= 100) {
      }
    }
  }, [origin, destination]); */

  return (
    <SafeAreaView style={styles.safeArea}>
      {origin ? (
        <GestureHandlerRootView>
          <MapView
            mapType={mapType}
            style={styles.map}
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={false}
            scrollEnabled={true}
            showsTraffic={traffic}
            showsBuildings={false}
            showsCompass={false}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 1.0,
              longitudeDelta: 0.9,
            }}
          >

            {statusMapViewDirections && destination && (
              <CustomPolyline
                origin={origin}
                destination={destination}
                setDuration={setDuracion}
                setDistance={setDistancia}
              />
            )}

            <CustomUserMarker coordinate={origin} />

            <MarcadorAct
              setIdSeleccionado={setSelectedId}
              id_cat={id_cat}
              idActividad={seguiActividad?.id}
              mapref={mapRef}
            />
          </MapView>

          <View style={styles.nav2}>
            {selectedId && (
              <NewPanelIndicaciones
                /*  seguir={setActivarEfecto} */
                mapRef={mapRef}
                marker={selectedId}
                setDestination={setDestination}
                statusMapDirections={handleValueChange}
                distancia={distancia}
                duracion={duracion}
                activarSeguimiento={setSiguiendoRuta}
              />
            )}
          </View>

          <View style={styles.filterContainer}>
            <Filtro setPress={setPress} />
          </View>

          {/*card actividades */}
          {selectedId && <CardActivity marker={selectedId} />}
        </GestureHandlerRootView>
      ) : (
        <Text style={styles.texto}>Obteniendo ubicación...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    position: "absolute",
    top: 630,
    alignContent: "center",
    alignItems: "flex-end",
    right: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
  },
  nav2: {
    width: "100%",
    position: "absolute",
    top: 30,
    padding: 8,
    alignContent: "center",
    alignItems: "center",
  },

  map: {
    flex: 1,
  },
  texto: { textAlign: "center", marginTop: 20 },
});
