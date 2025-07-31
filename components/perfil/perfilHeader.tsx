import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/perfilStyles';
import { colors } from '@/constants/Colors';
import { useImageUploader } from '@/hooks/useImagePerfil';
import { useUsuario } from '@/hooks/useUsuario';

interface Props {
  profileImageUri: string;
  setProfileImageUri: (uri: string) => void;
  animatedValue: Animated.Value;
}

export const PerfilHeader = ({
  profileImageUri,
  setProfileImageUri,
  animatedValue,
}: Props) => {
  const { selectImage } = useImageUploader(setProfileImageUri);
  const { usuario, cargando } = useUsuario();

  if (cargando) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Cargando...</Text>;
  }

  return (
    <LinearGradient
      colors={[colors.primaryBlue, '#115e59', colors.primaryBlue]}
      style={styles.header}
    >
      <View style={styles.patternOverlay} />

      <View style={styles.profileContent}>
        <TouchableOpacity
          onPress={selectImage}
          activeOpacity={0.7}
          style={styles.profileImageWrapper}
        >
          <LinearGradient
            colors={[colors.primaryBlue, '#5ffdf0ff']}
            style={styles.gradientBorder}
          >
            <Image
              source={{ uri: profileImageUri }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Animated.View style={styles.pulse} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.userName}>
            {usuario?.nombre_usuario} {usuario?.apellido_usuario}
          </Text>
          <Text style={styles.userUsername}>
            @{usuario?.cuenta_usuario}
          </Text>
        </View>

      </View>
    </LinearGradient>
  );
};
