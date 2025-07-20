//NO TOCAR PERRAS
import { useLocalSearchParams } from "expo-router";

import { fetchActividades } from "@/components/mapa/api_actividades";
import * as Location from "expo-location";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
// Cards y marcadores personalizados
import CustomMarker from "@/components/mapa/activity_marker";
import Actividades from "@/components/mapa/card-actividades";
import { ComponenteDiseño } from "@/components/mapa/prueba";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//prueba
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";

//prueba
// Tipo de datos
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
  mostrarSoloCuerpo?: boolean;
}

export default function Map() {
  // --------------variables----------------
  const { lat, lng } = useLocalSearchParams<{ lat: string; lng: string }>();
  const GOOGLE_MAPS_APIKEY = "AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78";
  const [origin, setOrigin] = useState<latlng>();
  const [destination, setDestination] = useState<latlng>();
  const mapRef = useRef<MapView | null>(null);
  const [actividades, setActividades] = useState<PropActivity[]>([]);
  const [selectedId, setSelectedId] = useState<PropActivity | null>(null);
  const [duracion, setDuracion] = useState<number | null>(null);
  const [distancia, setDistancia] = useState<number | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["4%", "55%", "50%", "60%"], []);
  // Función para abrir bottom sheet
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const isFocused = useIsFocused();

  // --------------variables----------------

  // Actualiza destino cuando cambian los parámetros
  useEffect(() => {
    if (lat && lng) {
      const ubilatitude = parseFloat(lat);
      const ubilongitude = parseFloat(lng);

      setDestination({
        latitude: ubilatitude,
        longitude: ubilongitude,
      });
    }
  }, [lat, lng]);

  // Permiso de ubicación

  const [activarEfecto, setActivarEfecto] = useState(Boolean);
  /*const activarDesdeFuncion = () => {
      setActivarEfecto(true);
    };*/

  const watchRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
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
            accuracy: Location.Accuracy.High,
            distanceInterval: 1,
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

    // 🧼 Limpieza al desmontar o al desactivar activarEfecto
    return () => {
      if (watchRef.current) {
        watchRef.current.remove(); // muy importante
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
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      //mapRef.current?.animateCamera({center: { latitude, longitude },zoom: 9,altitude: 1000,});
    })();
  }, []);
  //seguimiento

  const [mostrar, setmostrar] = useState(Boolean);

  const abrirBottomSheet = () => {
    setmostrar(false); // ¡Esto lo abre!
  };

  //animacion para cuando el usuario salga de otra pantalla

  // Cargar actividades al iniciar
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await fetchActividades();
      if (data) setActividades(data);
    };
    getData();
  }, []);

  return (

<View style={styles.container}>
      {origin ? (
        <GestureHandlerRootView>
          <MapView
            style={styles.map}
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={false}
            scrollEnabled={true}
            showsTraffic={true}
            showsBuildings={false}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 1.0,
              longitudeDelta: 0.9,
            }}
          >
            {/* Dirección entre origen y destino */}
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              //paradas :V
              //waypoints={[{ latitude: 9.03044, longitude: -79.50674 }]}

              strokeColor="#4F8FF9"
              strokeWidth={8}
              //opciones de modos
              mode={"DRIVING"}
              onReady={(result) => {
                setDistancia(result.distance);
                setDuracion(result.duration);
              }}
            />

            {/* Marcadores dinámicos desde API */}
            {actividades.map((marker) => (
              <CustomMarker
                key={marker.id}
                marker={marker}
                onPress={() => {
                  setSelectedId(marker);
                  bottomSheetRef.current?.snapToIndex(1);
                  setmostrar(false);
                }}
              />
            ))}
          </MapView>

          {/* Bottom Sheet con detalles 
            
            <ComponenteDiseño marker={marker} mostrarSoloCuerpo={mostrarSoloCuerpo} />*/}
          {selectedId && (
            <ComponenteDiseño
              seguir={setActivarEfecto}
              mapRef={mapRef}
              bottomSheetRef={bottomSheetRef}
              mostrarSoloCuerpo={mostrar}
              marker={selectedId}
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
              {selectedId && (
                <Actividades
                  mostrarSoloCuerpo={false}
                  marker={selectedId}
                  bottomSheetRef={bottomSheetRef}
                  mapRef={mapRef}
                  seguir={setActivarEfecto}
                />
              )}
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      ) : (
        <Text style={styles.texto}>Obteniendo ubicación...</Text>
      )}
      <StatusBar style="dark" />

    </View>

  );
}

const styles = StyleSheet.create({
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
  followBtn1: {
    top: 10,
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});
