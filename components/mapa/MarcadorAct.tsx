//Listo y funcionando
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import { fetchActividades } from "./api_actividades";
import { activityItems } from "./categorias";

export type PropActivity = {
  id: number;
  encabezado: string;
  descp: string;
  rating: number;
  latitud: number;
  longitud: number;
  foto_url: string;
  id_cat: number;
  pinColor: string;
};

const MarcadorAct = ({
  setIdSeleccionado,
  id_cat,
  idActividad,
  mapref,
}: any) => {
  const [actividades, setActividades] = useState<PropActivity[]>([]);
  const [filtro, setFiltro] = useState<number | null>(null);

  const filtrados = actividades.filter((marker) => {
    if (idActividad !== undefined && idActividad !== null) {
      return marker.id === Number(idActividad);
    }

    if (filtro !== null) {
      return marker.id_cat === filtro;
    }

    return true;
  });

  const datosParaMostrar = filtrados.length > 0 ? filtrados : actividades;

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await fetchActividades();

      if (data && Array.isArray(data)) {
        const dataConColor = data.map((actividad) => {
          const categoria = activityItems.find(
            (item) => Number(item.id) === actividad.id_cat
          );

          return {
            ...actividad,
            pinColor: categoria ? categoria.backgroundColor : "#ff0000ff",
          };
        });

        setActividades(dataConColor);
      }

      if (id_cat !== undefined) {
        const id_categoria = Number(id_cat);
        setFiltro(id_categoria);
      }
    };

    getData();
  }, [id_cat]);

  return (
    <View>
      {datosParaMostrar.map((marker) => (
        <Marker
          key={marker.id}
          pinColor={marker.pinColor}
          coordinate={{
            latitude: marker.latitud,
            longitude: marker.longitud,
          }}
          onPress={() => {
            const coordenadas = {
              latitude: marker.latitud,
              longitude: marker.longitud,
            };

            setIdSeleccionado(marker);
            mapref.current?.animateCamera({
              center: coordenadas,
              zoom: 20,
              altitude: 1000,
            });
          }}
        />
      ))}
    </View>
  );
};

export default MarcadorAct;
