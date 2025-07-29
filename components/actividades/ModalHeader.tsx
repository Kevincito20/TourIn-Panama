import {View, Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

interface ModalHeaderProps {
  title: string;
  imageUrl: string;
  onClose: () => void;
}

export function ModalHeader({ title, imageUrl, onClose }: ModalHeaderProps) {
  return (
    <View style={styles.header}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  title: {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
