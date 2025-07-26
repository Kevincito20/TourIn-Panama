import React, {useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/Colors';
import { verItinerario } from '@/components/services/verItinerarioService';
import { ItinerarioItem } from '../types/Itinerario';

const Itinerario = () => {
  const router = useRouter();
  const [actividades, setActividades] = useState<ItinerarioItem[]>([]);
  const [cargando, setCargando] = useState(true);


  const cargarDatos = async () => {
    setCargando(true);
    try {
      const userData = await AsyncStorage.getItem('usuario');
      const usuario = userData ? JSON.parse(userData) : null;

      if (usuario?.id_usuario) {
        const idUsuario = Number(usuario.id_usuario);
        const datos = await verItinerario(idUsuario);
        console.log('Respuesta del itinerario:', datos);

        if (Array.isArray(datos)) {
          setActividades(datos);
        } else if (datos && typeof datos === 'object') {
          setActividades([datos]);
        } else {
          console.warn('Formato inesperado:', datos);
          setActividades([]);
        }
      } else {
        console.warn('No se encontró el ID del usuario en AsyncStorage');
        setActividades([]);
      }
    } catch (error) {
      console.error('Error al cargar el itinerario:', error);
      setActividades([]);
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarDatos();
    }, [])
  );

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="calendar-outline" size={24} color={colors.primaryBlue} />
          <Text style={styles.headerTitle}>Itinerario</Text>
        </View>
        <View style={styles.actividadesBadge}>
          <Text style={styles.actividadesText}>{actividades.length} actividades</Text>
        </View>
      </View>

      {cargando ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
      ) : actividades.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No tienes actividades programadas.</Text>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {actividades.map((actividad, index) => (
            <View key={actividad.id_itinerario} style={styles.actividadContainer}>
              <View style={styles.actividadCard}>
                <View style={styles.iconContainer}>
                  <View
                    style={[
                      styles.iconBackground,
                      { backgroundColor: colors.primaryBlue + '22' },
                    ]}
                  >
                    <Ionicons name="location-outline" size={24} color={colors.primaryBlue} />
                  </View>
                </View>

                <View style={styles.actividadInfo}>
                  <View style={styles.tituloContainer}>
                    <Text style={styles.actividadTitulo}>{actividad.titulo_actividad}</Text>
                  </View>

                  <View style={styles.detalleContainer}>
                    <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.detalleText}>
                      {actividad.hora_itinerario} • {actividad.fecha_itinerario}
                    </Text>
                  </View>

                  {actividad.nota_itinerario ? (
                    <View style={styles.detalleContainer}>
                      <Ionicons name="document-text-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.detalleText}>Nota: {actividad.nota_itinerario}</Text>
                    </View>
                  ) : null}
                </View>
              </View>

              {index < actividades.length - 1 && <View style={styles.conectorLinea} />}
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.verCompleto}
        onPress={() => router.push('/modales/ScreenItinerario')}
      >
        <Text style={styles.verCompletoText}>Ver formulario completo</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  actividadesBadge: {
    backgroundColor: colors.lightBlue + '22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actividadesText: {
    fontSize: 12,
    color: colors.primaryBlue,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  actividadContainer: {
    position: 'relative',
  },
  actividadCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actividadInfo: {
    flex: 1,
  },
  tituloContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actividadTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  detalleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detalleText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  conectorLinea: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 43,
    marginBottom: 12,
  },
  verCompleto: {
    backgroundColor: colors.primaryBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 14,
  },
  verCompletoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default Itinerario;
