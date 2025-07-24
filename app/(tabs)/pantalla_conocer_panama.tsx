/*// COMPONENTES DE DISEÑO REACT 
//useCallback
import { useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// COMPONENTES CREADOS POR MI 
import { CardsConocerPanama } from '@/components/conocer-panama/card-conocerPanamá/card_conocerPanama';
import { CardsInformacionPanama } from '@/components/conocer-panama/card-conocerPanamá/card_informacionCompleta';

// COMPONENTES DE INFORMACION.
import provinciasPanama from '../../assets/provincias-Panama.json'
import { puntosDeInteres } from '../../assets/contentPuntosPanama';


// COMPONENTES DE MAPAS
import '../../assets/configuracionMapbox.ts'


export default function ScreenConocerPanama() {

  const provinciasPanamaLimpio = provinciasPanama as GeoJSON.FeatureCollection;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['4%', '4%', '95%'], []);


  const [coordenadaSeleccionada, setCoordenadaSeleccionada] = useState([-79.5167, 8.9833]);
  const [zoom, setZoom] = useState(5);


  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>('panama');

  const renderizarMapa = () => (
    <View style={styles.page}>
      <View style={styles.Mapcontainer}>

        {/*ESTILOS DEL MAPA 
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          styleURL='mapbox://styles/mapbox/streets-v12'
        >
          {/* CONFIGURACION DE LA CAMARA. OSEA PERSPECTIVA DEL MAPA  

          <MapboxGL.Camera
            centerCoordinate={coordenadaSeleccionada}
            zoomLevel={zoom}
            pitch={0}
            animationDuration={1500}
          />

          {/* CREACION DE PUNTOS DE INTEREZ DEL MAPA. 

          {puntosDeInteres.map(({ id, coord }) => (
            <MapboxGL.PointAnnotation key={id} id={id} coordinate={coord}
              onSelected={() => {
                setCoordenadaSeleccionada(coord);
                setZoom(8);
                setProvinciaSeleccionada(id);
                bottomSheetRef.current?.snapToIndex(2);
              }}
              onDeselected={
                () => {
                  setCoordenadaSeleccionada([-79.5167, 8.9833]);
                  setZoom(5);
                }
              }


            >
              <View style={[styles.markerStyle]} />

            </MapboxGL.PointAnnotation>
          ))}


          {/* EXTRACCION DE DATOS DEL GEOJSON 
          <MapboxGL.ShapeSource id="provincias" shape={provinciasPanamaLimpio}>


            {/* VAINA DEL FONDO NO SE COMO SE TRADUCE AL ESPAÑOL 
            <MapboxGL.FillLayer
              id="fill"
              style={{ fillColor: 'rgba(255, 255, 255, 0)' }}
            />

            {/* LINEAS QUE DIVIDEN LAS PROVINCIAS 

            <MapboxGL.LineLayer
              id="lines"
              style={{ lineColor: 'rgba(0, 0, 0, 0.88)', lineWidth: 0.5 }}

            />




          </MapboxGL.ShapeSource>


        </MapboxGL.MapView>

      </View>
    </View>
  );


  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  // const handleOpenBottomSheet = () => {
  //   bottomSheetRef.current?.snapToIndex(0);
  // };





  return (
    <GestureHandlerRootView  >
      {renderizarMapa()}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
      // enablePanDownToClose
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>

          {/* <CardsConocerPanama provinciaSeleccionada={provinciaSeleccionada} />  


          <CardsInformacionPanama provinciaSeleccionada={provinciaSeleccionada} />

        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  )

}
const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Mapcontainer: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  markerStyle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: 'red'
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
*/