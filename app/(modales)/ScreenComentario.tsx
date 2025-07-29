import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCrearComentario } from "@/hooks/CrearComentario";
import { useLocalSearchParams } from "expo-router";

interface Props {
    onComentarioCreado?: () => void;
}

const CrearComentarioScreen: React.FC<Props> = ({ onComentarioCreado }) => {
    const [titulo, setTitulo] = useState("");
    const [comentario, setComentario] = useState("");
    const [calificacion, setCalificacion] = useState(0);

    const { id_usuario, id_actividad } = useLocalSearchParams<{ id_usuario: string; id_actividad: string }>();
    const idUsuarioNum = Number(id_usuario);
    const idActividadNum = Number(id_actividad);

    const { crearComentario, loading, error, success } = useCrearComentario();

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleSubmit = async () => {
        if (titulo.trim() === "" || comentario.trim() === "" || calificacion === 0) {
            Alert.alert("Error", "Por favor completa todos los campos y la calificación.");
            return;
        }

        await crearComentario({
            id_usuario: idUsuarioNum,
            id_actividad: idActividadNum,
            titulo,
            comentario,
            calificacion,
        });

        setShowSuccessAlert(true);
    };

    useEffect(() => {
        if (showSuccessAlert && success) {
            Alert.alert("Éxito", "Comentario creado correctamente.");
            setTitulo("");
            setComentario("");
            setCalificacion(0);
            onComentarioCreado && onComentarioCreado();
            setShowSuccessAlert(false);
        }
    }, [success, showSuccessAlert, onComentarioCreado]);

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => setCalificacion(i)}
                    activeOpacity={0.7}
                    style={{ marginHorizontal: 6 }}
                >
                    <Ionicons
                        name={i <= calificacion ? "star" : "star-outline"}
                        size={36}
                        color="#f4b400"
                    />
                </TouchableOpacity>
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.header}>Crear Comentario</Text>

                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe el título"
                        value={titulo}
                        onChangeText={setTitulo}
                        editable={!loading}
                    />

                    <Text style={styles.label}>Comentario</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Escribe tu opinión"
                        value={comentario}
                        onChangeText={setComentario}
                        multiline
                        numberOfLines={4}
                        editable={!loading}
                    />

                    <Text style={styles.label}>Calificación</Text>
                    {renderStars()}

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? "Guardando..." : "Enviar"}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4285F4", // azul Google Play
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 10,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 24,
        color: "#202124",
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#5f6368",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#f1f3f4",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 18,
        color: "#202124",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    starsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#4285F4",
        paddingVertical: 14,
        borderRadius: 28,
        alignItems: "center",
        marginTop: "auto",
        shadowColor: "#4285F4",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: "#a3c2fa",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 12,
        textAlign: "center",
    },
});

export default CrearComentarioScreen;
