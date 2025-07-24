//Pin de la actividad
//Listo, Mejorar el diseño de las ubicaciones 
import React from 'react';
import { Marker } from 'react-native-maps';

interface prop{
    marker:any;
    onPress:() => void;
    color:any;
}

const CustomMarker= ({marker,onPress,color}:prop) =>{
    return(
        <Marker
            onPress={onPress}
            coordinate={{
            latitude: marker.latitud,
            longitude: marker.longitud,
            }}    
            pinColor= {color}
        />              
    );
};

export default CustomMarker;
