import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, router } from "expo-router"
import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  TextInput,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { colors } from "@/constants/Colors"
import { guardarActividadEnItinerario } from "@/components/services/itinerarioService"

const ScreenFormulario = () => {
  const { id, encabezado, foto_url, descp } = useLocalSearchParams<{
    id: string
    encabezado: string
    foto_url: string
    descp: string
  }>()

  const [fecha, setFecha] = useState<Date>(new Date())
  const [hora, setHora] = useState<Date>(new Date())
  const [notas, setNotas] = useState<string>("")

  const [showFechaPicker, setShowFechaPicker] = useState(false)
  const [showHoraPicker, setShowHoraPicker] = useState(false)

  const handleGuardar = async () => {
    try {
      const datos = {
        //fecha es tipo Date
        fecha: fecha.toISOString().split("T")[0], 
        hora: hora.toTimeString().split(" ")[0], 
        nota: notas,
        id_act: 3,    
        id_u: 4,       
      }

      await guardarActividadEnItinerario(datos)
      Alert.alert("Éxito", "Actividad guardada en el itinerario.")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la actividad.")
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.card}>
        <Image source={{ uri: foto_url }} style={styles.image} />
        <Text style={styles.title}>{encabezado}</Text>
        <Text style={styles.desc}>{descp || "Sin descripción disponible"}</Text>

        {/* Fecha */}
        <Text style={styles.label}>Fecha del Itinerario</Text>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => setShowFechaPicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.primaryBlue} />
          <Text style={styles.inputText}>{fecha.toDateString()}</Text>
        </TouchableOpacity>
        {showFechaPicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowFechaPicker(false)
              if (selectedDate) setFecha(selectedDate)
            }}
          />
        )}

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => setShowHoraPicker(true)}
        >
          <Ionicons name="time-outline" size={20} color={colors.primaryBlue} />
          <Text style={styles.inputText}>
            {hora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </TouchableOpacity>
        {showHoraPicker && (
          <DateTimePicker
            value={hora}
            mode="time"
            is24Hour={false}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedTime) => {
              setShowHoraPicker(false)
              if (selectedTime) setHora(selectedTime)
            }}
          />
        )}

        {/* Notas */}
        <Text style={styles.label}>Notas (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Llevar cámara, zapatos cómodos..."
          value={notas}
          onChangeText={setNotas}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
          <Ionicons name="checkmark-circle-outline" size={22} color={colors.white} />
          <Text style={styles.saveButtonText}>Guardar en Itinerario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primaryBlue,
    marginBottom: 4,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primaryBlue,
    marginBottom: 6,
  },
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#F4F4F4",
    marginBottom: 14,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
    textAlignVertical: "top",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default ScreenFormulario
