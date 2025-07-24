import CustomMarker from "@/components/mapa/activity_marker";
import { fetchActividades } from "@/components/mapa/api_actividades";
import Actividades from "@/components/mapa/cardActividades";
import NavFiltro from "@/components/mapa/navFiltro";
import { PanelIndicaciones2 } from "@/components/mapa/PanelIndicaciones2";
import { colors } from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
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


type latlng2 = {
  latitude: 9.0049;
  longitude: -79.5095;
};


export default function Map() {
  /* --------------variables----------------*/
  const { id_cat, color } = useLocalSearchParams();
  const [statusMapViewDirections, setStatusMapViewDirections] = useState(false);

  const GOOGLE_MAPS_APIKEY = "AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78";
  const [origin, setOrigin] = useState<latlng>();
  const [destination, setDestination] = useState<latlng>();
  const mapRef = useRef<MapView | null>(null);
  const [actividades, setActividades] = useState<PropActivity[]>([]);
  const [selectedId, setSelectedId] = useState<PropActivity | null>(null);
  const [duracion, setDuracion] = useState<number | null>(null);
  const [distancia, setDistancia] = useState<number | null>(null);
  const [activarEfecto, setActivarEfecto] = useState(Boolean);
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  const [mostrar, setmostrar] = useState(Boolean);
  //not use
  const snapPoints = useMemo(() => ["4%", "55%", "50%", "60%"], []);
  const { lat, lng } = useLocalSearchParams<{ lat: string; lng: string }>();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [nav, setNav] = useState(Boolean);
  const bottomSheetRef = useRef<BottomSheet>(null);
  //Filtro para actividades
  const [filtro, setFiltro] = useState<number | null>(null);
  const filtrados = actividades.filter((marker) => marker.id_cat === filtro);
  const datosParaMostrar = filtrados.length > 0 ? filtrados : actividades;
  const [colorMarker, setColorMarket] = useState<string>("red");
  /* --------------Seguimiento----------------*/
  const [prueba,setPrueba]=useState(
    {  latitude: 9.0049,
  longitude: -79.5095 }
  );
  useEffect(() => {
    console.log(destination);
  }, [destination]);

  useEffect(() => {
    //agregar kilometrage y tiempo cuando preciona el boton de recorrido
    if (activarEfecto == true) {
      const iniciarSeguimiento = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permiso denegado");
          return;
        }

        watchRef.current = await Location.watchPositionAsync(
          {
            timeInterval: 2000,
            accuracy: Location.Accuracy.Low,
            distanceInterval: 5,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setOrigin({ latitude, longitude });

            mapRef.current?.animateCamera({
              center: { latitude, longitude },

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
  }, [activarEfecto]);

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
      //mapRef.current?.animateCamera({center: { latitude, longitude },zoom: 9,altitude: 1000,});
    })();
  }, []);

  /* Funciones*/

  const abrirBottomSheet = () => {
    setmostrar(false); // ¡Esto lo abre!
  };

  //activar o desactivar el mapViewDirections
  function updateStatusMapViewDirections(
    value: number,
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (value === 1) {
      setStatus(true);
      console.log("abierto");
    } else if (value === 0) {
      setStatus(false);
      console.log("cerrado");
    } else {
      console.warn("Valor inválido para statusMapViewDirections:", value);
    }
  }

  function handleValueChange(value: number) {
    updateStatusMapViewDirections(value, setStatusMapViewDirections);
  }

  // Cargar actividades al iniciar
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await fetchActividades();
      if (data) setActividades(data);

      if (id_cat !== undefined) {
        const id_categoria = Number(id_cat);
        setFiltro(id_categoria);
      }
    };

    getData();
  }, [id_cat]);
  const [routeCoordinates, setRouteCoordinates] = useState<latlng[]>([]);

  const mapStyle = [
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          color: "#878787",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f9f5ed",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#aee0f4",
        },
      ],
    },
  ];

  const map2 = [
    {
      featureType: "water",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#b5cbe4",
        },
      ],
    },
    {
      featureType: "landscape",
      stylers: [
        {
          color: "#efefef",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#83a5b0",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#bdcdd3",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e3eed3",
        },
      ],
    },
    {
      featureType: "administrative",
      stylers: [
        {
          visibility: "on",
        },
        {
          lightness: 33,
        },
      ],
    },
    {
      featureType: "road",
    },
    {
      featureType: "poi.park",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
        {
          lightness: 20,
        },
      ],
    },
    {},
    {
      featureType: "road",
      stylers: [
        {
          lightness: 20,
        },
      ],
    },
  ];
/*
  function getDistanceInMeters(p1: latlng, p2: latlng): number {
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
  if (origin && prueba) {
    const distance = getDistanceInMeters(origin, prueba);
    if (distance <= 100) {
      alert("🚨 Estás dentro del área segura");
    }
  }
}, [origin, prueba]);
*/
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {origin ? (
          <GestureHandlerRootView>
            <MapView
              style={styles.map}
              //customMapStyle={}

              ref={mapRef}
              showsUserLocation={true}
              showsMyLocationButton={false}
              scrollEnabled={true}
              showsTraffic={true}
              showsBuildings={false}
              showsCompass={false}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 1.0,
                longitudeDelta: 0.9,
              }}
            >
              {/* Dirección entre origen y destino */}
              {statusMapViewDirections && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  //paradas :V
                  //waypoints={[{ latitude: 9.03044, longitude: -79.50674 }]}
                  //lineDashPattern={[5, 10]}
                  lineDashPattern={[10, 5]}
                  strokeWidth={6}
                  strokeColor={colors.primaryBlue}
                  optimizeWaypoints={true}
                  mode={"DRIVING"}
                  onStart={() => {
                    console.log("Buscando ruta...");
                  }}
                  onReady={(result) => {
                    setDistancia(result.distance);
                    setDuracion(result.duration);
                    setRouteCoordinates(result.coordinates);
                    /*mapRef.current?.fitToCoordinates(result.coordinates,{
                      edgePadding:{
                        right:30,
                        bottom: 300,
                        left:30,
                        top:100
                      }
                    })*/
                  }}
                />
              )}

              {/* Marcador Del usuario 
              <CustomUserMarker coordinate={origin}/>*/}
              {/* Marcadores dinámicos desde API */}
              {datosParaMostrar.map((marker) => (
                <CustomMarker
                  key={marker.id}
                  marker={marker}
                  color={color}
                  onPress={() => {
                    setSelectedId(marker);
                    setmostrar(false);
                  }}
                />
              ))}

              {/* Círculo de 100 metros de radio */}

              <Marker
              
             coordinate={prueba}
      title="My Location"
      description="This is a sample marker"
      pinColor="green"
              />
              {prueba && (
  <Circle
    center={prueba}
    radius={100} // radio en metros
    strokeColor="#FF5733"
    fillColor="rgba(255, 87, 51, 0.2)"
    strokeWidth={2}
  />
)}

            </MapView>
            {/*2222222222222222222222222222222222222*/}
            <View style={styles.nav2}>
              {selectedId && (
                <PanelIndicaciones2
                  seguir={setActivarEfecto}
                  mapRef={mapRef}
                  mostrarSoloCuerpo={setmostrar}
                  marker={selectedId}
                  statusMapDirections={handleValueChange}
                  setDestination={setDestination}
                  distancia={distancia}
                  duracion={duracion}
                />
              )}
              <NavFiltro />

            </View>

         {/*
            {mostrar && <InfoViaje distancia={distancia} duracion={duracion} />}

            Nav indicaciones y filtro
            <View style={styles.nav}>
              {selectedId && (
                <PanelIndicaciones
                  seguir={setActivarEfecto}
                  mapRef={mapRef}
                  mostrarSoloCuerpo={setmostrar}
                  marker={selectedId}
                  statusMapDirections={handleValueChange}
                  setDestination={setDestination}
                />
              )}
              <NavFiltro />
            </View>*/}

            {selectedId && <Actividades marker={selectedId} />}
          </GestureHandlerRootView>
        ) : (
          <Text style={styles.texto}>Obteniendo ubicación...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
  },
  nav: {
    minWidth: "21%",
    flexDirection: "column",
    position: "absolute",
    top: "25%",

    right: 1,
    margin: 8,
    gap: 5,
    // backgroundColor: "red",
  },
  nav2: {
    width: "100%",
    position: "absolute",
    top: 30,
    padding: 8,
    alignContent: "center",
    alignItems: "center",
    //backgroundColor: "red",
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 1,
    alignItems: "center",
  },
  dd: {
    flex: 1,
  },
  texto: { textAlign: "center", marginTop: 20 },
});

// Actualiza destino cuando cambian los parámetros
/*useEffect(() => {
    if (lat && lng) {
      const ubilatitude = parseFloat(lat);
      const ubilongitude = parseFloat(lng);

      setDestination({
        latitude: ubilatitude,
        longitude: ubilongitude,
      });
    }
  }, [lat, lng]);*/

/* Bottom Sheet con detalles 
            
            <ComponenteDiseño marker={marker} mostrarSoloCuerpo={mostrarSoloCuerpo} />
            {selectedId && (
              <ComponenteDiseño
                seguir={setActivarEfecto}
                mapRef={mapRef}
                bottomSheetRef={bottomSheetRef}
                mostrarSoloCuerpo={mostrar}
                marker={selectedId}
                statusMapDirections={handleValueChange}
                setDestination={setDestination}
              />
            )}
            

            <BottomSheet
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              index={-1}
              snapPoints={snapPoints}
              enablePanDownToClose
              backgroundStyle={{ backgroundColor: "white" }}
            >
              <BottomSheetView style={styles.bottomSheetContent}>
                
                
              </BottomSheetView>
            </BottomSheet>*/

/*if (activarEfecto 
        == true
      ) {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 1,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setOrigin({ latitude, longitude });

            // 🎯 Actualiza la cámara
            mapRef.current?.animateCamera({
              center: { latitude, longitude },
              zoom: 15,
              altitude: 1000,
            });
          }
        );
      }*/

/*Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setOrigin({ latitude, longitude });

          // 🎯 Actualiza la cámara
          //mapRef.current?.animateCamera({center: { latitude:8.9954, longitude:-79.5640 },zoom: 1,altitude: 1000,});
          
        }
      );*/
/*const activarDesdeFuncion = () => {
      setActivarEfecto(true);
    };*/
/*<FloatingButtonMenu></FloatingButtonMenu>
            
            <FilterBottom setFiltro={setFiltro} />*/
