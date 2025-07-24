import { StyleSheet, Text, View } from "react-native";



const InfoViaje = ({ distancia, duracion }) => {
  const km = (distancia); // redondea a 1 decimal
  const hr = (duracion / 60).toFixed(1);

  return (
    <View style={styles.followBtn1}>
      <Text style={styles.title}>
        Distancia: {km} km
      </Text>
      <Text style={styles.title}>
        Tiempo: {hr} hr
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  followBtn1: {
    backgroundColor:"white",

    width:220,
    elevation: 5,
    padding: 8,
   borderRadius: 12,
  },
  title: {
    fontSize: 14,
    
    color: "#000000ff",
   
  },
});

export default InfoViaje;
