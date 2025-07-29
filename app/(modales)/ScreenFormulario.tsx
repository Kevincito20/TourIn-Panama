import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
  StatusBar,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "@/constants/Colors";
import { guardarActividadEnItinerario } from "@/components/services/itinerarioService";
import { useUsuario } from "@/hooks/useUsuario";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenFormulario = () => {
  const { id, encabezado, foto_url, descp } = useLocalSearchParams<{
    id: string;
    encabezado: string;
    foto_url: string;
    descp: string;
  }>();

  const { usuario } = useUsuario();
  const router = useRouter();

  const [fecha, setFecha] = useState<Date>(new Date());
  const [hora, setHora] = useState<Date>(new Date());
  const [notas, setNotas] = useState<string>("");
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [showHoraPicker, setShowHoraPicker] = useState(false);

  const handleGuardar = async () => {
    try {
      const datos = {
        fecha: fecha.toISOString().split("T")[0],
        hora: hora.toTimeString().split(" ")[0],
        nota: notas,
        id_act: Number(id),
        id_u: usuario?.id_usuario || 0,
      };
      await guardarActividadEnItinerario(datos);
      Alert.alert("Éxito", "Actividad guardada en el itinerario.");
    } catch {
      Alert.alert("Error", "No se pudo guardar la actividad.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar translucent backgroundColor={colors.background} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          {foto_url && <Image source={{ uri: foto_url }} style={styles.image} />}
          <HeaderFlotante onBack={() => router.back()} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{encabezado || "Sin título"}</Text>
          <Text style={styles.desc}>{descp || "Sin descripción disponible"}</Text>
        </View>

        <View style={styles.formCard}>
          <FormularioCampo
            label="Fecha del Itinerario"
            icon="calendar-outline"
            value={fecha.toDateString()}
            onPress={() => setShowFechaPicker(true)}
          />
          {showFechaPicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, selectedDate) => {
                setShowFechaPicker(false);
                if (selectedDate) setFecha(selectedDate);
              }}
            />
          )}

          <FormularioCampo
            label="Hora"
            icon="time-outline"
            value={hora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            onPress={() => setShowHoraPicker(true)}
          />
          {showHoraPicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, selectedTime) => {
                setShowHoraPicker(false);
                if (selectedTime) setHora(selectedTime);
              }}
            />
          )}

          <Text style={styles.label}>Notas (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Llevar cámara, zapatos cómodos..."
            value={notas}
            onChangeText={setNotas}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
          <Ionicons name="checkmark-circle-outline" size={22} color={colors.white} />
          <Text style={styles.saveButtonText}>Guardar en Itinerario</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const FormularioCampo = ({
  label,
  icon,
  value,
  onPress,
}: {
  label: string;
  icon: any;
  value: string;
  onPress: () => void;
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.inputButton} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.primaryBlue} />
      <Text style={styles.inputText}>{value}</Text>
    </TouchableOpacity>
  </View>
);

const HeaderFlotante = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Agregar al Itinerario</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    marginBottom: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryBlue,
    textAlign: "center",
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    backgroundColor: "#F9F9F9",
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
    textAlignVertical: "top",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  headerContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default ScreenFormulario;
