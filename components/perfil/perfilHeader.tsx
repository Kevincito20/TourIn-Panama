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
    return <Text>Cargando...</Text>;
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
            colors={[colors.primaryBlue, '#0f766e']}
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

        <Text style={styles.userName}>{usuario?.nombre_usuario +' '+ usuario?.apellido_usuario}</Text>

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#a7f3d0" />
          <Text style={styles.location}>Panamá</Text>
        </View>

        <View style={styles.premiumBadge}>
          <Ionicons name="trophy" size={14} color="#b45309" />
          <Text style={styles.premiumText}>Explorador Premium</Text>
        </View>
      </View>
    </LinearGradient>
  );
};
