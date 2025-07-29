import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, ScrollView, Animated } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PerfilHeader } from '@/components/perfil/perfilHeader';
import { OpcionPerfil } from '@/components/perfil/opcionesPerfil';
import { styles } from '@/components/styles/perfilStyles';
import { usePerfil } from '@/hooks/usePerfil';
import { defaultPerfilImage } from '@/constants/defaultPerfil';
import { useUsuario } from '@/hooks/useUsuario';
import { obtenerComentariosActividad, Comentario} from '@/components/services/ObtenerComentariosService';
export default function PantallaPerfil() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [profileImageUri, setProfileImageUri] = useState(defaultPerfilImage);
  const { handleLogout } = usePerfil();
  const { usuario } = useUsuario();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 8,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0f766e" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PerfilHeader profileImageUri={usuario?.foto || profileImageUri} setProfileImageUri={setProfileImageUri} animatedValue={animatedValue} />
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <OpcionPerfil icon={<Ionicons name="person" size={24} color="#0f766e" />} label="Mi perfil" />
          <OpcionPerfil icon={<MaterialIcons name="credit-card" size={24} color="#0f766e" />} label="Métodos de pago" />
          <OpcionPerfil icon={<Feather name="settings" size={24} color="#0f766e" />} label="Configuración" />
          <OpcionPerfil icon={<AntDesign name="logout" size={24} color="#dc2626" />} label="Cerrar sesión" onPress={handleLogout} color="#dc2626" />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
