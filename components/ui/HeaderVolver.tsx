// components/common/HeaderConVolver.tsx
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "@/constants/Colors"


interface Props {
    titulo: string
}

const HeaderConVolver = ({ titulo }: Props) => {
    return (
        <View style={styles.headerContainer}>

            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.titulo}>{titulo}</Text>
                <View style={{ width: 24 }} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.primaryBlue,
    },
    safeArea: {
        // iOS necesita esto para el SafeAreaView
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        height: 56, // Altura fija para el header
    },
    titulo: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },
})

export default HeaderConVolver