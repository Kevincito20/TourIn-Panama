//listo
import { colors } from "@/constants/Colors";
import { AntDesign, FontAwesome5, Foundation } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Categories from "./categorias";
import { cargarMapType, guardarBoolean, guardarMapType } from "./functions";

const Filtro = ({ setPress }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [trafficbtn, setTrafficbtn] = useState(false);

  const on = () => {
    toggleTraffic(true), Haptics.selectionAsync();
  };

  const off = () => toggleTraffic(false);

  const toggleTraffic = async (estado: boolean) => {
    guardarBoolean({ tipo: estado, lugar: "traffic" });
    setTrafficbtn(estado);
    setPress(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await cargarMapType("traffic");
      setTrafficbtn(data);
    })();
  }, []);

  return (
    <View>
      {/* abrir btn */}
      <View>
        <TouchableOpacity
          style={styles.closeOpenBtn}
          onPress={() => {
            setModalVisible(true);
            Haptics.selectionAsync();
          }}
        >
          <Foundation name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <ImageBackground
            source={require("./imagenes/fondoAnimales.png")}
            imageStyle={styles.modalImage}
          >
            <View style={styles.modal}>
              
              {/* cerrar btn */}
              <View style={styles.btnPosicion}>
                <TouchableOpacity
                  style={styles.closeOpenBtn}
                  onPress={() => {
                    setModalVisible(false), Haptics.selectionAsync();
                  }}
                >
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {/* Tipos de mapas btn , no tiene style*/}
              <View style={styles.sectionStyle}>
                <Text style={styles.title}>Tipo de mapa</Text>

                <View style={styles.contenedorIconos}>
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={() => {
                        guardarMapType({ tipo: "standard", lugar: "maptype" });
                        setPress(true);
                        setModalVisible(false);
                      }}
                    >
                      <Image
                        style={styles.iconImg}
                        source={{
                          uri: "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg?mbid=social_retweet",
                        }}
                      ></Image>
                    </TouchableOpacity>
                    <Text style={styles.subtitle}>Estandar</Text>
                  </View>

                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={() => {
                        guardarMapType({ tipo: "satellite", lugar: "maptype" });
                        setPress(true);
                        setModalVisible(false);
                      }}
                    >
                      <Image
                        style={styles.iconImg}
                        source={{
                          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvTH-Ewwl909ttdtud0WYmxUk-CZIgSnWBA&s",
                        }}
                      ></Image>
                    </TouchableOpacity>
                    <Text style={styles.subtitle}>Satelital</Text>
                  </View>
                </View>
              </View>

              {/* Detalles mapa  btn */}
              <View style={styles.sectionStyle}>
                <Text style={styles.title}>Detalles del mapa</Text>
                <View style={styles.contenedorIconos}>
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      style={[
                        styles.buttons,
                        trafficbtn && styles.activeButton,
                      ]}
                      onPress={() => (trafficbtn ? off() : on())}
                    >
                      <FontAwesome5
                        name="traffic-light"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Text style={styles.subtitle}>Trafico</Text>
                  </View>
                </View>
              </View>

              {/* Categorias btn */}
              <View style={styles.sectionStyle}>
                <Text style={styles.title}>Categorias</Text>

                <Categories setModal={setModalVisible} />
              </View>
            </View>
            <LinearGradient
              colors={["transparent", "#014755ff"]}
              style={styles.background}
            />
          </ImageBackground>
        </View>
      </Modal>
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

export default Filtro;
