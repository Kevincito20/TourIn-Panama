
//NO TOCAR PERRAS
import { fetchActividades } from '@/components/mapa/api_actividades';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';

import { Accelerometer, Magnetometer } from 'expo-sensors';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//card
//import { Markers } from '@/components/mapa/actividades_ubicacion';
import { OverlayComponent } from '@/components/mapa/card';


type latlng = {
    latitude:number;
    longitude:number;
}
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
export default function Map() {
    // Trae lat y lng por parámetros desde otra pantalla
    const { lat, lng } = useLocalSearchParams<{ lat: string; lng: string }>();

    // Referencia al mapa
    const mapRef = useRef<MapView | null>(null);

    // Estado para destino
    const [destination, setDestination] = useState<latlng>();

    // Estado para ubicación del usuario
    const [origin, setOrigin] = useState<latlng>();

    //tiempo
    const [duracion, setDuracion] = useState<number | null>(null);

    //Distancia
    const [distancia, setDistancia] = useState<number | null>(null);

    //magnetometro para el segimiento de la camara
    const [heading, setHeading] = React.useState(0);

    
    // API KEY
    const GOOGLE_MAPS_APIKEY = 'AIzaSyChaSCcvas9UNfnvyJRW1sF5MiPRcqzH78';

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

  

    // Mueve cámara cuando ya se tenga origin válido
    useEffect(() => {
        if (origin?.latitude !== 0 && origin?.longitude !== 0 && mapRef.current) {
            mapRef.current.animateCamera({
                center: {
                    latitude: Number(origin?.latitude),
                    longitude: Number(origin?.longitude),
                },
                pitch: 90,
                heading:heading,
                zoom: 18,
                altitude: 900,
            });
        }
        
    }, [origin,heading]);

    // Solicita permisos y obtiene ubicación actual

  const [pitch, setPitch] = useState(60);    // inclinación vertical
      useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      
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
            heading,
            pitch,
            zoom: 18,
            altitude: 1000,
          });
        }
      );

      // 🧭 Dirección con magnetómetro
      Magnetometer.setUpdateInterval(500);
      Magnetometer.addListener((data) => {
        const angle = getHeadingFromMagnetometer(data.x, data.y);
        setHeading(angle);
      });

      // 🎥 Inclinación con acelerómetro
      Accelerometer.setUpdateInterval(500);
      Accelerometer.addListener((data) => {
        const angle = getPitchFromAccelerometer(data.x, data.y, data.z);
        setPitch(angle);
      });
    })();
   
  }, []);
// 🔄 Calcula el heading a partir del magnetómetro
function getHeadingFromMagnetometer(x: number, y: number): number {
  let angle = Math.atan2(-y, -x) * (180 / Math.PI); // signos invertidos
  angle += 90;
  if (angle < 0) angle += 360;
  return angle;
}


// 🔄 Estima la inclinación con el acelerómetro
function getPitchFromAccelerometer(x: number, y: number, z: number): number {
  const norm = Math.sqrt(x * x + y * y + z * z);

  // Usamos Z para detectar inclinación hacia adelante o atrás
  const pitchRad = Math.acos(z / norm); 
  const pitchDeg = pitchRad * (180 / Math.PI);

  // Invertimos el ángulo: 0 = vertical, 90 = plano
  const invertedPitch = 90 - pitchDeg;

  // Clamp entre 30 y 80 para que no se deforme la cámara
  return Math.min(Math.max(invertedPitch, 30), 80);
}


   /* DistanceMatrixResponse
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=9.0049115,-79.5098307&destination=8.4333,-82.4333&key=${GOOGLE_MAPS_APIKEY}`;
    const [routeCoords, setRouteCoords] = React.useState<{ latitude: number; longitude: number }[]
    >([]);
        const [matrix,setMatrix] = useState<DistanceMatrixResponse>();
        const [durationText, setDurationText] = useState('');
        const DistanceMatrixResponse = async() =>{
            const response = await fetch (url)
            const results = await response.json()

            const encodedPolyline = results.routes[0].overview_polyline.points;
            const decoded = polyline.decode(encodedPolyline);
            
            const coords = decoded.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
        }));
            
            setRouteCoords(coords);
            console.log( "origen",origin)
            console.log("destino",destination)
            console.log(results);

            const distance = results.rows[0].elements[0].distance.text;

            setDurationText(distance);
            setMatrix(results); 
            
        }
   */

  

            
        
   


// Escuchar el magnetómetro
    /*useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
        let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
        angle = angle >=0 ? angle : angle +360;
        setHeading(angle);
    });

    return () => subscription.remove();
    }, []);*/

//new
// Cargar actividades al iniciar
  const [actividades, setActividades] = useState<PropActivity[]>([]);
  const [selectedId, setSelectedId] = useState<PropActivity | null>(null);

    useEffect(() => {
        const getData = async () => {
        const { data, error } = await fetchActividades();
        if (data) setActividades(data);
        };

        getData();
    }, []);
    return (
        <View style={styles.container}>
        <View style={styles.header}> <Text style={styles.headerText}>Durancion: {duracion} Distancia: {distancia} sfdsfd: {} </Text>
        </View>
            <MapView
                mapType="standard"
                style={styles.map}
                ref={mapRef}
                showsUserLocation={true}
                showsMyLocationButton={true}
                scrollEnabled={true}
                showsTraffic={true}
                showsBuildings={false}
                
            >
                                    
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
                    onReady={result => {            
                        setDistancia(result.distance );
                        setDuracion(result.duration);
                    }}
                />
                 {/* Marcadores dinámicos desde API */}
             
                
            </MapView>
           
            <OverlayComponent style={{position: "absolute", bottom: 50}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    header: {
        backgroundColor: 'black',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
//consistencia en la pantalla
// zoom directo al usuario
//agregar estilo diferente
//

//installs
/**
 * npx expo install react-native-maps
 * npm install react-native-maps
 * npx expo install expo-location
 * npm install react-native-maps-directions
 * npx expo install react-native-permissions
 * npx expo install expo-task-manager este no 
 *npx expo install @react-native-async-storage/async-storage
     npm install @mapbox/polyline
npm expo sensors----
     magnetometro y aceleration


 */

//run
/**
 * npx expo prebuild
 * npx expo run:android

 */