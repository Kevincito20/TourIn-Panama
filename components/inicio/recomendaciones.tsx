import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Recomendaciones = () => {
  const actividades = [
    {
      id: 1,
      titulo: 'Casco Viejo',
      descripcion: 'Arquitectura colonial',
      categoria: 'Historia',
      rating: 4.9,
      duracion: '2h',
      precio: 'Gratis',
      precioColor: '#10B981',
      icon: 'business-outline',
      iconColor: '#F59E0B',
      categoriaColor: '#F59E0B',
      imagenFondo: '#FEF3C7',
    },
    {
      id: 2,
      titulo: 'Festival Cinta Costera',
      descripcion: 'Música y cultura',
      categoria: 'Evento',
      rating: 4.7,
      duracion: 'Todo el día',
      precio: 'B/.10',
      precioColor: '#6B7280',
      icon: 'musical-notes-outline',
      iconColor: '#8B5CF6',
      categoriaColor: '#8B5CF6',
      imagenFondo: '#F3E8FF',
    },
    {
      id: 3,
      titulo: 'Cerro Ancón',
      descripcion: 'Vista panorámica',
      categoria: 'Aventura',
      rating: 4.6,
      duracion: '1h',
      precio: 'Gratis',
      precioColor: '#10B981',
      icon: 'musical-notes-outline',
      iconColor: '#10B981',
      categoriaColor: '#10B981',
      imagenFondo: '#D1FAE5',
    },
    {
      id: 4,
      titulo: 'Mercado de Mariscos',
      descripcion: 'Gastronomía local',
      categoria: 'Gastronomía',
      rating: 4.8,
      duracion: '1.5h',
      precio: 'B/.25',
      precioColor: '#6B7280',
      icon: 'restaurant-outline',
      iconColor: '#EF4444',
      categoriaColor: '#EF4444',
      imagenFondo: '#FEE2E2',
    },
    {
      id: 5,
      titulo: 'Biomuseo',
      descripcion: 'Ciencia y naturaleza',
      categoria: 'Cultura',
      rating: 4.5,
      duracion: '2.5h',
      precio: 'B/.22',
      precioColor: '#6B7280',
      icon: 'leaf-outline',
      iconColor: '#06B6D4',
      categoriaColor: '#06B6D4',
      imagenFondo: '#CFFAFE',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="sparkles" size={24} color="#F59E0B" />
          <Text style={styles.headerTitle}>Recomendaciones</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.verTodas}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={width * 0.7 + 16}
        snapToAlignment="start"
      >
        {actividades.map((actividad, index) => (
          <TouchableOpacity key={actividad.id} style={[
            styles.actividadCard,
            index === 0 && styles.firstCard,
            index === actividades.length - 1 && styles.lastCard
          ]}>
            {/* Imagen de fondo con ícono */}
            <View style={[styles.imagenContainer, { backgroundColor: actividad.imagenFondo }]}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={actividad.icon as any} 
                  size={32} 
                  color={actividad.iconColor} 
                />
              </View>
              
              {/* Badge de categoría */}
              <View style={[styles.categoriaBadge, { backgroundColor: actividad.categoriaColor }]}>
                <Text style={styles.categoriaText}>{actividad.categoria}</Text>
              </View>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.ratingText}>{actividad.rating}</Text>
              </View>
            </View>

            {/* Información de la actividad */}
            <View style={styles.infoContainer}>
              <Text style={styles.titulo}>{actividad.titulo}</Text>
              <Text style={styles.descripcion}>{actividad.descripcion}</Text>

              <View style={styles.detallesContainer}>
                <View style={styles.duracionContainer}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.duracionText}>{actividad.duracion}</Text>
                </View>
                
                <Text style={[styles.precio, { color: actividad.precioColor }]}>
                  {actividad.precio}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
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
  verTodas: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '500',
  },
  scrollContainer: {
    paddingLeft: 20,
  },
  actividadCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstCard: {
    // marginLeft: 20, // Ya se maneja con paddingLeft del ScrollView
  },
  lastCard: {
    marginRight: 20,
  },
  imagenContainer: {
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  categoriaBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoriaText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  ratingContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 2,
  },
  infoContainer: {
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  detallesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duracionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duracionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Recomendaciones;