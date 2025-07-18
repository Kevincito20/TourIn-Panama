import React from 'react';
import { Marker } from 'react-native-maps';


const CustomMarker= ({marker,onPress}) =>{
    return(
        <Marker
            onPress={onPress}
            coordinate={{
            latitude: marker.latitud,
            longitude: marker.longitud,
            }}    
            pinColor="purple"
        />              
    );
};

export default CustomMarker;
