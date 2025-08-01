import { colors } from "@/constants/Colors";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { LatLng, MapType } from "react-native-maps";

//local storage
import { NewPanelIndicaciones } from "@/components/mapa/btnSuperiorMapa";
import CardActivity from "@/components/mapa/cardActividades";
import Filtro from "@/components/mapa/Filtro";
import CustomPolyline from "@/components/mapa/FuncionSeguimiento";
import { cargarMapType } from "@/components/mapa/functions";
import LocationButtom from "@/components/mapa/locationButtom";
import MarcadorAct, { PropActivity } from "@/components/mapa/MarcadorAct";
import SolicitarUbicacionUnaVez from "@/components/mapa/permisoUbicacion";

export default function Map() {
  const { id_cat, latitud, longitud } = useLocalSearchParams();
  const [mapReady, setMapReady] = useState(false);
  const [press, setPress] = useState(false);
  const [mapType, setMapType] = useState<MapType>("standard");
  const [traffic, setTraffic] = useState(Boolean);
  const [origin, setOrigin] = useState<LatLng>();
  const [destination, setDestination] = useState<LatLng>();
  const [duracion, setDuracion] = useState("");
  const [distancia, setDistancia] = useState("");
  const mapRef = useRef<MapView | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  const [statusMapViewDirections, setStatusMapViewDirections] = useState(false);
  const [selectedId, setSelectedId] = useState<PropActivity | null>(null);
  const [seguiActividad, setSeguirActividad] = useState<PropActivity>();
  const [siguiendoRuta, setSiguiendoRuta] = useState(Boolean || null);
  const [ubicacionConcedida, setUbicacionConcedida] = useState(false);
  const [loc, setLoc] = useState(Boolean);
  const [mode, setMode] = useState(String);

  useEffect(() => {
    if (mapReady && latitud && longitud) {
      const latitude = Number(latitud);
      const longitude = Number(longitud);
      mapRef.current?.animateCamera({
        center: { latitude, longitude },
        zoom: 20,
        altitude: 1000,
      });
    }
  }, [mapReady, origin]);

  useEffect(() => {
    if (press) {
      const cargarTodo = async () => {
        const [{ data: tipoMapa }, { data: trafico }] = await Promise.all([
          cargarMapType("maptype"),
          cargarMapType("traffic"),
        ]);

        setMapType(tipoMapa);
        setTraffic(trafico);
        setPress(false);
      };

      cargarTodo();
    }
  }, [press]);

  useEffect(() => {
    if (siguiendoRuta) {
      cargarDatosSeguimiento();
    }
    cargarDatosSeguimiento();
  }, [siguiendoRuta]);

  const cargarDatosSeguimiento = async () => {
    const { data, error } = await cargarMapType("seguimiento");
    const [activar, actividad] = data;

    setStatusMapViewDirections(activar);
    setSeguirActividad(activar);
    setDestination({
      latitude: actividad.latitud,
      longitude: actividad.longitud,
    });
    if (activar) {
      setSelectedId(actividad);
      setSeguirActividad(actividad);
    }
  };

  useEffect(() => {
    const obtenerUbicacionInicial = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setUbicacionConcedida(true);

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
    };

    obtenerUbicacionInicial();
    cargarDatosSeguimiento();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(async () => {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        clearInterval(intervalo);
        setUbicacionConcedida(true);

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
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (statusMapViewDirections) {
      const iniciarSeguimiento = async () => {
        watchRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 9000,
            distanceInterval: 5,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setOrigin({ latitude, longitude });
            setLoc(true);
            mapRef.current?.animateCamera({
              center: {
                latitude: latitude,
                longitude: longitude,
              },
              zoom: 15,
              altitude: 1000,
            });
          }
        );
      };

      iniciarSeguimiento();
    }

    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }
    };
  }, [statusMapViewDirections]);

  function handleValueChange(value: number) {
    if (value === 0 || value === 1) {
      setStatusMapViewDirections(Boolean(value));
    } else {
      console.warn("Valor inválido para statusMapViewDirections:", value);
    }
  }
  const mapstyle = [
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100,
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#C6E2FF",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#C5E3BF",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#D1D1B8",
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.safeArea}>
      {ubicacionConcedida && origin ? (
        <GestureHandlerRootView>
          <MapView
            customMapStyle={mapstyle}
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
            onMapReady={() => setMapReady(true)}
          >
            {statusMapViewDirections && destination && (
              <CustomPolyline
                origin={origin}
                destination={destination}
                setDuration={setDuracion}
                setDistance={setDistancia}
                setMode={setMode}
                Mode={mode}
              />
            )}

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
                mapRef={mapRef}
                marker={selectedId}
                setDestination={setDestination}
                statusMapDirections={handleValueChange}
                distancia={distancia}
                duracion={duracion}
                activarSeguimiento={setSiguiendoRuta}
                setMode={setMode}
              />
            )}
          </View>

          <View
            style={{
              left: 10,
              right: 10,
              position: "absolute",
              bottom: 10,
              flexDirection: "column",
            }}
          >
            <View style={styles.filterContainer}>
              <Filtro setPress={setPress} />
              <LocationButtom mapRef={mapRef} origin={origin} estado={loc} />
            </View>

            {selectedId && <CardActivity marker={selectedId} />}
          </View>
        </GestureHandlerRootView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!ubicacionConcedida && <SolicitarUbicacionUnaVez />}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    alignContent: "center",
    alignItems: "flex-end",
    gap: 10,
    margin: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
});
