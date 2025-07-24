//Descontinuado
import React from "react";
import { Image, StyleSheet, View } from "react-native";
type ActivityItem = {
  id: string;
  title: string;
  icon: string;
  type?: string;
  backgroundColor: string;
  backgroundImage: string;
};

interface prop {
  item: ActivityItem;
}

const IconFilter = ({ item }: prop) => {
  return (
    <View>
      
      <Image style={styles.imgBtn} source={{ uri: item.backgroundImage }} />

    </View>
  );
};

const styles = StyleSheet.create({
  imgBtn: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#FO2A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 },
    margin: 5,
  },
  titulo:{
    fontSize:12,
  }
});

export default IconFilter;
