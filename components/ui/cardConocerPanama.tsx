import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import { useNavigation } from '@react-navigation/native';
import { ContentConocerPanama } from "../types/CardsConocer";

export default function CardConocerPanama({
    id,
    titulo,
    informacion,
    descripcion,
    imagen,
    provincia,
    categoria,
    colorCard,
}: ContentConocerPanama) {

    // const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}>
                <View style={styles.cardContent}>
                    <View style={styles.contImagen}>
                        <Image
                            source={{
                                uri: imagen,
                            }}
                            style={styles.imagen}
                            resizeMode="cover"
                        />
                    </View>


                    <View style={styles.textContainer}>
                        <View style={styles.titleRow}>
                            <View style={styles.badgesRow}>
                                <View style={[{ backgroundColor: colorCard }, styles.badge]}>
                                    <Text style={styles.badgeText}>{categoria}</Text>
                                </View>
                                <View style={[{ backgroundColor: colorCard }, styles.badge]}>
                                    <Text style={styles.badgeText}>{provincia}</Text>
                                </View>
                            </View>

                            <View style={styles.titleIconRow}>
                                <Text style={styles.title}>{titulo}</Text>
                            </View>
                        </View>

                        <Text style={styles.description} numberOfLines={4}> {descripcion}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
        overflow: 'hidden',
        margin: 0
    },
    cardContent: {
        flexDirection: 'row',
        gap: 16,
        height: 180,
        minHeight: 180,
    },
    contImagen: {
        width: 90,
        height: '100%',

        overflow: 'hidden',
        margin: 0,
        padding: 0,
    },
    imagen: {
        width: '100%',
        height: '100%',
        borderRadius: 8,

    },


    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 11,
        paddingHorizontal: 10,
    },
    titleRow: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 12,
    },
    titleIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    iconContainer: {
        width: 26,
        height: 26,
        backgroundColor: '#ECFDF5',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1F2937',
    },
    badge: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 16,
        borderWidth: 1,

        borderColor:'white'

    },
    badgeText: {
        fontSize: 10,
        fontWeight: 800,
        textTransform: 'uppercase',
        color: 'white',

    },
    description: {
        fontSize: 14,
        color: '#3e4146ff',
        marginBottom: 16,
        marginTop: 4,
        textAlign: 'left'
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    exploreText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#10B981',
    },
});
