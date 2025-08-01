import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StatusBar, 
  ScrollView, 
  Animated, 
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  AntDesign, 
  Feather, 
  Ionicons, 
  FontAwesome5 
} from '@expo/vector-icons';
import { PerfilHeader } from '@/components/perfil/perfilHeader';
import { OpcionPerfil } from '@/components/perfil/opcionesPerfil';
import { styles } from '@/components/styles/perfilStyles';
import { usePerfil } from '@/hooks/usePerfil';
import { defaultPerfilImage } from '@/constants/defaultPerfil';
import { useUsuario } from '@/hooks/useUsuario';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function PantallaPerfil() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const { handleLogout } = usePerfil();
  const { usuario, cargando, refetch } = useUsuario();
  const router = useRouter();

  // Estado para manejar la imagen temporal mientras se sube
  const [tempProfileImage, setTempProfileImage] = useState(defaultPerfilImage);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 8,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={perfilStyles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0f766e" />

      <SafeAreaView style={perfilStyles.safeArea} edges={['bottom', 'left', 'right']}>
        <ScrollView
          style={perfilStyles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0f766e']}
              tintColor="#0f766e"
            />
          }
        >
          <PerfilHeader
          />

          <View style={perfilStyles.optionsContainer}>
            <OpcionPerfil
              icon={<Ionicons name="calendar-outline" size={24} color="#0f766e" />}
              label="Ver itinerario"
              onPress={() => router.push('/(modales)/ScreenItinerario')}
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

const perfilStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12, 
  },
});