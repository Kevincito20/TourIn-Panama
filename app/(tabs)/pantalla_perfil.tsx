import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PantallaPerfil() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleLogoutConfirm = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      // Puedes borrar otros valores si deseas
      router.replace('/(autenticacion)/pantalla_iniciar_sesion');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión correctamente.');
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: handleLogoutConfirm, style: 'destructive' },
      ]
    );
  };

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 8,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedNumber = animatedValue.interpolate({
    inputRange: [0, 8],
    outputRange: [0, 8],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0f766e" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <LinearGradient
          colors={['#0f766e', '#115e59', '#134e4a']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Background Pattern */}
          <View style={styles.patternOverlay} />

          {/* Profile Content */}
          <View style={styles.profileContent}>
            {/* Profile Image with gradient border */}
            <View style={styles.profileImageWrapper}>
              <LinearGradient
                colors={['#14b8a6', '#0f766e']}
                style={styles.gradientBorder}
              >
                <Image
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
                  }}
                  style={styles.profileImage}
                />
                {/* Online indicator with pulsating animation */}
                <View style={styles.onlineIndicator}>
                  <View style={styles.onlineDot} />
                  <Animated.View style={styles.pulse} />
                </View>
              </LinearGradient>
            </View>

            {/* User Info */}
            <Text style={styles.userName}>Kevin González</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color="#a7f3d0" />
              <Text style={styles.location}>Panamá</Text>
            </View>

            {/* Premium Badge */}
            <View style={styles.premiumBadge}>
              <Ionicons name="trophy" size={14} color="#b45309" />
              <Text style={styles.premiumText}>Explorador Premium</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <AntDesign name="profile" size={24} color="#0f766e" />
              <Animated.Text style={styles.statNumber}>
                {animatedValue.interpolate({
                  inputRange: [0, 8],
                  outputRange: ['0', '8'],
                })}
              </Animated.Text>
              <Text style={styles.statLabel}>Itinerarios</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="local-activity" size={24} color="#0f766e" />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Actividades</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="heart" size={24} color="#0f766e" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              activeOpacity={0.8}
              onPress={() => alert('Editar Perfil')}
            >
              <LinearGradient
                colors={['#14b8a6', '#0f766e']}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Feather name="edit-3" size={28} color="white" />
                <Text style={styles.quickActionText}>Editar Perfil</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionCard}
              activeOpacity={0.8}
              onPress={() => alert('Nuevo Viaje')}
            >
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="calendar" size={28} color="white" />
                <Text style={styles.quickActionText}>Nuevo Viaje</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mi Cuenta</Text>
          <View style={styles.menuCard}>
            {/* {[
              { icon: 'calendar-outline', color: '#ccfbf1', iconColor: '#0f766e', label: 'Mi itinerario' },
              { icon: 'heart-outline', color: '#fecaca', iconColor: '#dc2626', label: 'Mis favoritos' },
              { icon: 'settings-outline', color: '#dbeafe', iconColor: '#2563eb', label: 'Configuración' },
            ].map(({ icon, color, iconColor, label }, i) => (
              <TouchableOpacity key={i} style={[styles.menuItem, styles.menuItemBorder]} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: color }]}>
                    <Ionicons name={icon} size={20} color={iconColor} />
                  </View>
                  <Text style={styles.menuItemText}>{label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))} */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: '#fecaca' }]}>
                  <Ionicons name="log-out" size={20} color="#dc2626" />
                </View>
                <Text style={[styles.menuItemText, { color: '#dc2626' }]}>Cerrar sesión</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#fca5a5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        {/* <View style={[styles.section, { marginBottom: 80 }]}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>
          {[
            {
              icon: <Ionicons name="walk" size={20} color="#059669" />,
              text: 'Iniciaste una actividad: Caminar en el Parque',
              time: 'hace 3 horas',
            },
            {
              icon: <Ionicons name="star" size={20} color="#eab308" />,
              text: 'Completaste: Visita a la Catedral',
              time: 'ayer',
            },
          ].map(({ icon, text, time }, i) => (
            <View key={i} style={styles.activityItem}>
              <View style={styles.activityIcon}>{icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityText}>{text}</Text>
                <Text style={styles.activityTime}>{time}</Text>
              </View>
            </View>
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90, // Espacio para el tab bar (65px de altura + 25px extra)
  },
  header: {
    paddingTop: 30, // Reducido porque SafeAreaView ya maneja el top
    paddingBottom: 35,
    paddingHorizontal: 25,
    position: 'relative',
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,184,166,0.12)',
    borderRadius: 20,
  },
  profileContent: {
    alignItems: 'center',
  },
  profileImageWrapper: {
    borderRadius: 80,
    padding: 4,
    marginBottom: 12,
  },
  gradientBorder: {
    borderRadius: 80,
    padding: 4,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
  },
  pulse: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#22c55e',
    opacity: 0.5,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#a7f3d0',
    marginLeft: 6,
    fontWeight: '600',
  },
  premiumBadge: {
    flexDirection: 'row',
    backgroundColor: '#d6d3d1cc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 16,
    borderRadius: 50,
    alignItems: 'center',
    gap: 6,
  },
  premiumText: {
    color: '#b45309',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 6,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f766e',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '600',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f766e',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#0f766e',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  quickActionGradient: {
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activityIcon: {
    marginRight: 16,
  },
  activityText: {
    fontSize: 15,
    color: '#4b5563',
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
});