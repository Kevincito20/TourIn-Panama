import AsyncStorage from "@react-native-async-storage/async-storage";


type prop ={
    lugar:string;
    tipo:any;
}



export const guardarMapType = async ({lugar,tipo}:prop) => {
    try {
      await AsyncStorage.setItem(lugar, JSON.stringify(tipo));
    
    } catch (error) {
      console.error("Error guardando región:", error);
    }
  };

export const cargarMapType = async (lugar: string) => {
  try {
    const regionString = await AsyncStorage.getItem(lugar);
    if (regionString !== null) {
      const data = JSON.parse(regionString);
      return { data, error: null };
    } else {
      return { data: null, error: "No se encontró el dato" };
    }
  } catch (error) {
    console.error('Error cargando región del mapa:', error);
    return { data: null, error };
  }
};



type propBoolean ={
    lugar:string;
    tipo:Boolean;
}


export const guardarBoolean = async ({lugar,tipo}:propBoolean) => {
    try {
      await AsyncStorage.setItem(lugar, JSON.stringify(tipo));
      
    } catch (error) {
      console.error("Error guardando región:", error);
    }
  };
