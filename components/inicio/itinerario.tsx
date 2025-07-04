import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const Itinerario = () => {
  const router = useRouter(); 

  const actividades = [
    {
      id: 1,
      tipo: 'tour',
      titulo: 'Tour Casco Viejo',
      horario: '10:00 AM - 12:00 PM',
      ubicacion: 'Plaza Independencia',
      icon: 'business-outline',
      iconColor: '#6366F1',
      estado: 'Ahora',
    },
    {
      id: 2,
      tipo: 'almuerzo',
      titulo: 'Almuerzo en Mercado de Mariscos',
      horario: '01:00 PM',
      ubicacion: 'Cinta Costera',
      icon: 'restaurant-outline',
      iconColor: '#EF4444',
      estado: null,
    },
    {
      id: 3,
      tipo: 'visita',
      titulo: 'Visita al Biomuseo',
      horario: '03:30 PM',
      ubicacion: 'Amador',
      icon: 'flower-outline',
      iconColor: '#F97316',
      estado: null,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="calendar-outline" size={24} color="#4F46E5" />
          <Text style={styles.headerTitle}>Tu itinerario</Text>
        </View>
        <View style={styles.actividadesBadge}>
          <Text style={styles.actividadesText}>5 actividades</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {actividades.map((actividad, index) => (
          <View key={actividad.id} style={styles.actividadContainer}>
            <View style={styles.actividadCard}>
              <View style={styles.iconContainer}>
                <View style={[styles.iconBackground, { backgroundColor: actividad.iconColor + '20' }]}>
                  <Ionicons
                    name={actividad.icon as any}
                    size={24}
                    color={actividad.iconColor}
                  />
                </View>
              </View>

              <View style={styles.actividadInfo}>
                <View style={styles.tituloContainer}>
                  <Text style={styles.actividadTitulo}>{actividad.titulo}</Text>
                  {actividad.estado && (
                    <View style={styles.estadoBadge}>
                      <Text style={styles.estadoText}>{actividad.estado}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.detalleContainer}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.detalleText}>
                    {actividad.horario} • {actividad.ubicacion}
                  </Text>
                </View>
              </View>
            </View>

            {index < actividades.length - 1 && (
              <View style={styles.conectorLinea} />
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.verCompleto}
        onPress={() => router.push('./autenticacion/pantalla_iniciar_sesion')}
      >
        <Text style={styles.verCompletoText}>Ver itinerario completo</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  actividadesBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actividadesText: {
    fontSize: 12,
    color: '#4F46E5',
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
    color: '#1F2937',
    flex: 1,
  },
  estadoBadge: {
    backgroundColor: '#4F8FF7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  detalleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detalleText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  conectorLinea: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 43,
    marginBottom: 8,
  },
  verCompleto: {
    backgroundColor: '#4F8FF7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
  },
  verCompletoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default Itinerario;
