import type { ActividadesProps } from "@/components/types/Actividades"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import type React from "react"
import { useState } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

interface Props {
  actividad: ActividadesProps
}

const { width } = Dimensions.get("window")

const ActividadModalContent: React.FC<Props> = () => {
  const {
    id,
    encabezado,
    descp,
    foto_url,
    latitud,
    longitud,
    rating,
  } = useLocalSearchParams<{
    id: string
    encabezado: string
    descp: string
    foto_url: string
    latitud: string
    longitud: string
    rating: string
  }>()

  const [guardado, setGuardado] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const router = useRouter()

  const toggleGuardar = () => {
    if (!guardado) {
      router.push({
        pathname: "/modales/ScreenFormulario",
        params: {
          id,
          encabezado,
          foto_url,
          descp,
        },
      })
    } else {
      setGuardado(false)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#F59E0B" />)
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#F59E0B" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color="#D1D5DB"
        />
      )
    }

    return stars
  }

  const activities = [
    { icon: "walk-outline", text: "Senderismo" },
    { icon: "camera-outline", text: "Fotografías panorámicas" },
    { icon: "eye-outline", text: "Avistamiento de aves" },
  ]

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* Header con título y rating */}
      <View style={styles.header}>
        <Text style={styles.title}>{encabezado}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(Number.parseFloat(rating) || 4.5)}
          </View>
          <Text style={styles.ratingText}>{rating || "4.5"}</Text>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Ionicons name="time-outline" size={14} color="#059669" />
          <Text style={styles.tagText}>3 horas</Text>
        </View>
        <View style={styles.tag}>
          <Ionicons name="location-outline" size={14} color="#DC2626" />
          <Text style={styles.tagText}>Cerro Ancón</Text>
        </View>
        <View style={styles.tag}>
          <Ionicons name="people-outline" size={14} color="#7C3AED" />
          <Text style={styles.tagText}>Familiar</Text>
        </View>
      </View>

      {/* Galería */}
      <View style={styles.gallerySection}>
        <Text style={styles.sectionTitle}>Galería</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
          pagingEnabled
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (width * 0.8)
            )
            setActiveImageIndex(index)
          }}
        >
          {[1, 2, 3].map((i, index) => (
            <View key={i} style={styles.imageContainer}>
              <Image
                source={{ uri: foto_url }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageCounter}>{index + 1}/3</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Indicadores */}
        <View style={styles.imageIndicators}>
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeImageIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="document-text-outline" size={20} color="#6366F1" />
          <Text style={styles.sectionTitle}>Descripción</Text>
        </View>
        <Text style={styles.descripcion}>
          {descp || "Sin descripción disponible para esta actividad."}
        </Text>
      </View>

      {/* Ubicación */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={20} color="#EF4444" />
          <Text style={styles.sectionTitle}>Ubicación</Text>
        </View>
        <Text style={styles.descripcion}>
          Provincia de Panamá, Cerro Ancón
        </Text>
        <TouchableOpacity
          style={styles.mapaBtn}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/pantalla_mapa copy",
              params: {
                lat: String(latitud),
                lng: String(longitud),
              },
            })
          }
          activeOpacity={0.8}
        >
          <Ionicons name="map" size={20} color="white" />
          <Text style={styles.mapaText}>Ver ruta en el mapa</Text>
        </TouchableOpacity>
      </View>

      {/* Actividades */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>¿Qué puedes hacer aquí?</Text>
        </View>
        <View style={styles.activitiesList}>
          {activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons
                  name={activity.icon as any}
                  size={18}
                  color="#10B981"
                />
              </View>
              <Text style={styles.activityText}>{activity.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Dato curioso */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb-outline" size={20} color="#F59E0B" />
          <Text style={styles.sectionTitle}>¿Sabías que...?</Text>
        </View>
        <View style={styles.factContainer}>
          <Text style={styles.descripcion}>
            Este sendero fue usado por comunidades indígenas como ruta espiritual
            hacia la cima.
          </Text>
        </View>
      </View>

      {/* Botón Guardar / Enviar al Formulario */}
      <TouchableOpacity
        style={[styles.guardarBtn, guardado && styles.guardarBtnActive]}
        onPress={toggleGuardar}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Ionicons
            name={guardado ? "bookmark" : "bookmark-outline"}
            size={22}
            color="white"
          />
          <Text style={styles.guardarText}>
            {guardado
              ? "Guardado en tu itinerario"
              : "Guardar en Itinerario "}
          </Text>
        </View>
        {guardado && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F8FAFC",
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "white",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    lineHeight: 32,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },

  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },

  gallerySection: {
    marginBottom: 20,
  },

  gallery: {
    marginBottom: 12,
  },

  imageContainer: {
    position: "relative",
    marginRight: 12,
  },

  galleryImage: {
    width: width * 0.8,
    height: 200,
    borderRadius: 16,
    marginLeft: 20,
  },

  imageOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  imageCounter: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  imageIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },

  activeIndicator: {
    backgroundColor: "#6366F1",
    width: 24,
  },

  section: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },

  descripcion: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 24,
  },

  mapaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  mapaText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  activitiesList: {
    gap: 12,
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  activityText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },

  factContainer: {
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },

  guardarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B981",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  guardarBtnActive: {
    backgroundColor: "#059669",
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  guardarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  checkmark: {
    marginLeft: 8,
  },
})

export default ActividadModalContent
