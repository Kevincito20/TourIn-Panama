// components/PerfilHeader.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/perfilStyles';
import { colors } from '@/constants/Colors';
import { useImagePerfil } from '@/hooks/useImagePerfil';
import { useUsuario } from '@/hooks/useUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/components/types/Usuario';
import { defaultPerfilImage } from '@/constants/defaultPerfil';

export const PerfilHeader = () => {
  const { selectImage, status, error, isLoading, resetState } = useImagePerfil();
  const { usuario, cargando } = useUsuario();
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (usuario?.foto) {
      setProfileImageUri(usuario.foto);
    }
  }, [usuario]);

  useEffect(() => {
    const cargarImagenActualizada = async () => {
      const jsonValue = await AsyncStorage.getItem('usuario');
      if (jsonValue) {
        const usuarioActualizado: Usuario = JSON.parse(jsonValue);
        if (usuarioActualizado?.foto) {
          setProfileImageUri(usuarioActualizado.foto);
        } else {
          setProfileImageUri(null); // fuerza fallback a imagen default
        }
      }
    };

    if (status === 'success') {
      cargarImagenActualizada();
      resetState();
    }
  }, [status]);

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.primaryBlue, '#115e59', colors.primaryBlue]}
      style={styles.header}
    >
      <View style={styles.patternOverlay} />

      {isLoading && (
        <View style={styles.uploadOverlay}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.uploadText}>Subiendo imagen...</Text>
        </View>
      )}

      {status === 'error' && (
        <TouchableOpacity style={styles.errorBanner} onPress={resetState}>
          <Ionicons name="warning" size={20} color="white" />
          <Text style={styles.errorText}>{error}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.profileContent}>
        <TouchableOpacity
          onPress={selectImage}
          activeOpacity={0.7}
          style={styles.profileImageWrapper}
          disabled={isLoading}
        >
          <LinearGradient
            colors={[colors.primaryBlue, '#5ffdf0ff']}
            style={styles.gradientBorder}
          >
            <Image
              source={profileImageUri ? { uri: profileImageUri } : require('../../assets/images/fondo_default.jpg')}
              style={styles.profileImage}
            />

            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Animated.View style={styles.pulse} />
            </View>

            <View style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {usuario?.nombre_usuario} {usuario?.apellido_usuario}
          </Text>
          <Text style={styles.userUsername} numberOfLines={1}>
            {usuario?.cuenta_usuario}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};
