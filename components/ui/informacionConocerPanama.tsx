import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import { useNavigation } from '@react-navigation/native';
import { ContentConocerPanama } from "../types/CardsConocer";
import { Ionicons } from "@expo/vector-icons";

export default function InformacionConocerPanama({
    id,
    titulo,
    informacion,
    descripcion,
    imagen,
    nameIcon,
    colorCard,
}: ContentConocerPanama) {

    // const navigation = useNavigation<any>();

    return (
        <View>

            <TouchableOpacity
                style={styles.card}
                onPress={() => {

                }}
                activeOpacity={0.8}
            >

                <Image
                    style={styles.cardImage}
                    source={{
                        uri: imagen
                    }}
                    resizeMode="cover"
                />

                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={nameIcon as any} size={24} color={colorCard} />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.cardTitle}>
                                {titulo}
                            </Text>
                            <Text style={[{ color: colorCard }, styles.cardSubtitle]}>

                                {descripcion}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.cardDescription}>
                        {informacion}
                    </Text>

                    {/* <View style={styles.exploreIndicator}>
                        <Text style={styles.exploreIndicatorText}>Tocar para explorar</Text>
                        <Ionicons name="arrow-forward" size={16} color="#2563EB" />
                    </View> */}

                </View>
            </TouchableOpacity>
        </View>
    );




}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8fafc',
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        width: '100%',
        overflow: 'hidden',
    },

    cardImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#f1f5f9',
    },
    cardContent: {
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    iconContainer: {
        marginRight: 16,
        marginTop: 4,
    },
    headerText: {
        flex: 1,

    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
        lineHeight: 28,
    },
    cardSubtitle: {
        fontSize: 16,
    
        fontWeight: '500',
        lineHeight: 20,
    },
    cardDescription: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22,
        marginBottom: 24,
        textAlign: 'justify',
    },
    exploreIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    exploreIndicatorText: {
        color: '#2563EB',
        fontWeight: '500',
        fontSize: 14,
        marginRight: 8,
    },
});