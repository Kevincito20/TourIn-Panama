
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type PropActivity = {
  id: number
  encabezado: string
  descp: string
  rating: number
  latitud: number
  longitud: number
  foto_url: string
  id_cat: number
}

interface Actividades2Props {
  marker: PropActivity
  mapRef: any
  bottomSheetRef: any
  seguir: any
  mostrarSoloCuerpo?: boolean
}

export function ComponenteDiseño({ marker, mapRef, seguir, mostrarSoloCuerpo, bottomSheetRef }: Actividades2Props) {
  const [siguiendo, setSiguiendo] = useState(false)
  const [siguiendoRuta, setSiguiendoRuta] = useState(false)
  const router = useRouter()

  const panamaView = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 15,
    pitch: 0,
    heading: 0,
    altitude: 1000,
  }

  const panamaView2 = {
    center: {
      latitude: marker.latitud,
      longitude: marker.longitud,
    },
    zoom: 12,
    pitch: 0,
    heading: 0,
    altitude: 1000,
  }

  const handleIndicaciones = () => {
    if (!siguiendoRuta) {
      setSiguiendoRuta(true)
      mapRef.current?.animateCamera(panamaView, { duration: 1000 })
      bottomSheetRef.current?.snapToIndex(0)
      router.push({
        pathname: "/pantalla_mapa_copy",
        params: {
          lat: String(marker.latitud),
          lng: String(marker.longitud),
        },
      })
    } else {
      setSiguiendoRuta(false)
      mapRef.current?.animateCamera(panamaView2, {
        duration: 1000,
      })
      bottomSheetRef.current?.snapToIndex(0)
      router.push({
        pathname: "/pantalla_mapa_copy",
        params: {
          lat: String(0),
          lng: String(0),
        },
      })
    }
  }

  const handleSeguir = () => {
    if (!siguiendo) {
      setSiguiendo(true)
      seguir(true)
      bottomSheetRef.current?.snapToIndex(0)
      router.push({
        pathname: "/pantalla_mapa_copy",
        params: {
          lat: String(marker.latitud),
          lng: String(marker.longitud),
        },
      })
    } else {
      setSiguiendo(false)
      seguir(false)
      bottomSheetRef.current?.snapToIndex(0)
      router.push({
        pathname: "/pantalla_mapa_copy",
        params: {
          lat: String(0),
          lng: String(0),
        },
      })
    }
  }
//navigate-outline
/*<Ionicons
                    name={siguiendoRuta ? "close" : "navigate-outline"}
                    size={20}
                    color={siguiendoRuta ? "#fff" : "#2563eb"}
                  />*/
  return (
    <>
      {!mostrarSoloCuerpo && (
        <View style={styles.container}>
          <View style={styles.buttonRow}>
            {/* Botón de Indicaciones */}
            <TouchableOpacity
              style={[styles.actionButton, styles.directionsButton, siguiendoRuta && styles.activeButton]}
              onPress={handleIndicaciones}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <View style={[styles.iconContainer, siguiendoRuta && styles.activeIconContainer]}>
                  <MaterialCommunityIcons name="sign-direction" size={24} color="white" />
                  
                </View>
                <Text style={[styles.buttonText, siguiendoRuta && styles.activeButtonText]}>
                  {siguiendoRuta ? "Cancelar" : "Indicaciones"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Botón de Seguir */}
            <TouchableOpacity
              style={[styles.actionButton, styles.followButton, siguiendo && styles.activeButton]}
              onPress={handleSeguir}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <View style={[styles.iconContainer, siguiendo && styles.activeIconContainer]}>
                  <Ionicons
                    name={siguiendo ? "close" : "location-outline"}
                    size={20}
                    color={siguiendo ? "#fff" : "#ffffffff"}
                  />
                </View>
                <Text style={[styles.buttonText, siguiendo && styles.activeButtonText]}>
                  {siguiendo ? "Cancelar" : "Seguir"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width:'100%',
    backgroundColor: "#ffffff05",
    borderBottomEndRadius:16,
    borderBottomLeftRadius:16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 15,
    backgroundColor: "#007af3ff",
    
  },

  directionsButton: {
    borderColor: "#000000ff",
  },

  followButton: {
    borderColor: "#000000ff",
  },

  activeButton: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
    transform: [{ scale: 0.98 }],
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#000000ff",
    alignItems: "center",
    justifyContent: "center",
  },

  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffffff",
    textAlign: "center",
  },

  activeButtonText: {
    color: "#ffffff",
  },
})
