
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"

// Constantes para el tamaño y espaciado de los botones
const CATEGORY_BUTTON_SIZE = 50
const CATEGORY_BUTTON_SPACING = 10 // Espaciado entre botones de categoría Y entre el último botón de categoría y el FAB principal
const MAIN_FAB_SIZE = 60
const BOTTOM_OFFSET = 20
const RIGHT_OFFSET = 20

const NUM_CATEGORY_BUTTONS = 6

// Calcula el ancho total de los botones de categoría, incluyendo sus márgenes izquierdos individuales.
// Cada botón tiene un marginLeft, por lo que el primer botón también contribuye al ancho total con su margen.
const RENDERED_CATEGORY_BUTTONS_WIDTH =
  NUM_CATEGORY_BUTTONS * CATEGORY_BUTTON_SIZE + NUM_CATEGORY_BUTTONS * CATEGORY_BUTTON_SPACING

// La distancia que el contenedor de los botones de categoría necesita trasladarse para ocultarse.
// Es su propio ancho renderizado más el espaciado que necesita para despejar el FAB principal.
const SLIDE_OUT_DISTANCE = RENDERED_CATEGORY_BUTTONS_WIDTH + CATEGORY_BUTTON_SPACING

export default function FloatingButtonMenu() {
  const [isOpen, setIsOpen] = useState(false)
  // Posición inicial: fuera de la pantalla a la derecha
  const translateX = useSharedValue(SLIDE_OUT_DISTANCE)
  const rotate = useSharedValue(0)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      // Cerrar menú: deslizar a la derecha, rotar de vuelta
      translateX.value = withSpring(SLIDE_OUT_DISTANCE, { damping: 15, stiffness: 100 })
      rotate.value = withTiming(0, { duration: 300, easing: Easing.ease })
    } else {
      // Abrir menú: deslizar a la izquierda, rotar
      translateX.value = withSpring(0, { damping: 15, stiffness: 100 })
      rotate.value = withTiming(45, { duration: 300, easing: Easing.ease })
    }
  }

  const animatedCategoryButtonsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const animatedMainFabStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    }
  })

  const categoryButtons = Array.from({ length: NUM_CATEGORY_BUTTONS }).map((_, index) => (
    <TouchableOpacity key={index} style={styles.categoryButton}>
      <Text style={styles.categoryButtonText}>{`C${index + 1}`}</Text>
    </TouchableOpacity>
  ))

  return (
    <View style={styles.container}>
      <View style={styles.floatingContainer}>
        <Animated.View style={[styles.categoryButtonsWrapper, animatedCategoryButtonsStyle]}>
          {categoryButtons}
        </Animated.View>
        <Animated.View style={[styles.mainFabAnimatedWrapper, animatedMainFabStyle]}>
          <TouchableOpacity style={styles.mainFab} onPress={toggleMenu}>
            <Text style={styles.mainFabText}>{isOpen ? "X" : "+"}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top:80,
 right: -10,

  },
  floatingContainer: {
    bottom: BOTTOM_OFFSET,
    right: RIGHT_OFFSET,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryButtonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: CATEGORY_BUTTON_SPACING, // Espacio entre el último botón de categoría y el FAB principal
  },
  categoryButton: {
    width: CATEGORY_BUTTON_SIZE,
    height: CATEGORY_BUTTON_SIZE,
    borderRadius: CATEGORY_BUTTON_SIZE / 2,
    backgroundColor: "#03dac6", // Color teal
    justifyContent: "center",
    alignItems: "center",
    marginLeft: CATEGORY_BUTTON_SPACING, // Espaciado entre botones de categoría
    elevation: 6, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  categoryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  mainFabAnimatedWrapper: {
    // No se necesita posicionamiento específico aquí, ya que es parte de la fila de floatingContainer
  },
  mainFab: {
    width: MAIN_FAB_SIZE,
    height: MAIN_FAB_SIZE,
    borderRadius: MAIN_FAB_SIZE / 2,
    backgroundColor: "#6200ee", // Color púrpura
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mainFabText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
})
