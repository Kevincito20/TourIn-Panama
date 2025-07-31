import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { PerfilHeader } from '@/components/perfil/perfilHeader';
import { OpcionPerfil } from '@/components/perfil/opcionesPerfil';
import { styles } from '@/components/styles/perfilStyles';
import { usePerfil } from '@/hooks/usePerfil';
import { defaultPerfilImage } from '@/constants/defaultPerfil';
import { useUsuario } from '@/hooks/useUsuario';
import { useRouter } from 'expo-router';

export default function PantallaPerfil() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [profileImageUri, setProfileImageUri] = useState(defaultPerfilImage);
  const { handleLogout } = usePerfil();
  const { usuario } = useUsuario();
  const router = useRouter();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 8,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f766e" />

      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <PerfilHeader
            profileImageUri={usuario?.foto || profileImageUri}
            setProfileImageUri={setProfileImageUri}
            animatedValue={animatedValue}
          />

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <OpcionPerfil
              icon={<Ionicons name="calendar-outline" size={24} color="#0f766e" />}
              label="Ver itinerario"
              onPress={() => router.push('/')}
            />

            <OpcionPerfil
              icon={<Feather name="edit-2" size={24} color="#0f766e" />}
              label="Editar perfil"
              onPress={() => router.push('/')}
            />

            <OpcionPerfil
              icon={<FontAwesome5 name="comments" size={22} color="#0f766e" />}
              label="Mis comentarios"
              onPress={() => router.push('/')}
            />

            <OpcionPerfil
              icon={<Feather name="settings" size={24} color="#0f766e" />}
              label="Configuración"
              onPress={() => router.push('/')}
            />

            <OpcionPerfil
              icon={<AntDesign name="logout" size={24} color="#dc2626" />}
              label="Cerrar sesión"
              onPress={handleLogout}
              color="#dc2626"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
