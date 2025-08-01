//listo
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps";
type props = {
  origin: LatLng;
  mapRef: any;
  estado: boolean;
};

const LocationButtom = ({ mapRef, origin, estado }: props) => {
  const [press, setPress] = useState(Boolean);

  const seguimiento = () => {
    if (!press) {
      Haptics.selectionAsync();
      setPress(true);
      mapRef.current?.animateCamera({
        center: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        zoom: 15,
        altitude: 1000,
      });
    } else {
      Haptics.selectionAsync();

      setPress(false);
      mapRef.current?.animateCamera({
        center: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        zoom: 10,
        altitude: 1000,
      });
    }
  };

  return (
    <View>
      {/* abrir btn */}

      <View>
        <TouchableOpacity style={styles.closeOpenBtn} onPress={seguimiento}>
          <MaterialCommunityIcons
            name={press ? "crosshairs-gps" : "crosshairs"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionStyle: {
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    elevation: 20,
  },
  contenedorIconos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    margin: 10,
  },
  activeButton: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
    transform: [{ scale: 0.98 }],
  },
  btnPosicion: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  closeOpenBtn: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  iconImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  buttons: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#FFFFFF",
    color: "#333333",
    fontWeight: "bold",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modal: {
    padding: 12,
    borderRadius: 20,
    width: "100%",
    gap: 12,
    zIndex: 2,
  },
  modalImage: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.navIndicaciones,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
});

export default LocationButtom;
