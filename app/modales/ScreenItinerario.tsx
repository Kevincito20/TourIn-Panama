import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verItinerario } from '@/components/services/verItinerarioService';
import { colors } from '@/constants/Colors';
import { ItinerarioItem } from '@/components/types/Itinerario';

type ActividadPorDia = {
  dia: string; // fecha formateada, ejemplo: "Lunes, 21 de julio"
  actividades: ItinerarioItem[];
};

export default function ItinerarioCompletoScreen() {
  const [vista, setVista] = useState<'día' | 'semana'>('día');
  const [actividadesPorDia, setActividadesPorDia] = useState<ActividadPorDia[]>([]);
  const [cargando, setCargando] = useState(true);

  // Función para formatear fecha a un string legible "Lunes, 21 de julio"
  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  // Organizar actividades por días
  const organizarPorDia = (actividades: ItinerarioItem[]): ActividadPorDia[] => {
    const diasMap = new Map<string, ItinerarioItem[]>();

    actividades.forEach((act) => {
      const dia = formatearFecha(act.fecha_itinerario);
      if (!diasMap.has(dia)) {
        diasMap.set(dia, []);
      }
      diasMap.get(dia)!.push(act);
    });

    // Convertir Map a arreglo ordenado por fecha
    return Array.from(diasMap.entries())
      .map(([dia, actividades]) => ({ dia, actividades }))
      .sort((a, b) => {
        // Ordena según la fecha (parseando la cadena dia)
        const parseFecha = (diaStr: string) => {
          // "lunes, 21 de julio"
          const parts = diaStr.split(', ');
          return new Date(parts[1] + ' ' + new Date().getFullYear()); // año actual
        };
        return parseFecha(a.dia).getTime() - parseFecha(b.dia).getTime();
      });
  };

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const userData = await AsyncStorage.getItem('usuario');
      const usuario = userData ? JSON.parse(userData) : null;

      if (usuario?.id_usuario) {
        const idUsuario = Number(usuario.id_usuario);
        const datos = await verItinerario(idUsuario);

        let actividadesArray: ItinerarioItem[] = [];
        if (Array.isArray(datos)) {
          actividadesArray = datos;
        } else if (datos && typeof datos === 'object') {
          actividadesArray = [datos];
        }

        const organizadas = organizarPorDia(actividadesArray);
        setActividadesPorDia(organizadas);
      } else {
        setActividadesPorDia([]);
      }
    } catch (error) {
      console.error('Error al cargar el itinerario:', error);
      setActividadesPorDia([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCompletar = (id: number) => {
    Alert.alert('Completado', `Actividad ${id} marcada como completada.`);
  };

  const handleEliminar = (id: number) => {
    Alert.alert('Eliminar', `¿Deseas eliminar la actividad ${id}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => console.log(`Eliminado ${id}`), style: 'destructive' },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Itinerario completo</Text>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, vista === 'día' && styles.switchActive]}
          onPress={() => setVista('día')}
        >
          <Text style={vista === 'día' ? styles.switchTextActive : styles.switchText}>
            Por Día
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, vista === 'semana' && styles.switchActive]}
          onPress={() => setVista('semana')}
        >
          <Text style={vista === 'semana' ? styles.switchTextActive : styles.switchText}>
            Por Semana
          </Text>
        </TouchableOpacity>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color={colors.primaryBlue} style={{ marginTop: 20 }} />
      ) : actividadesPorDia.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
          No tienes actividades programadas.
        </Text>
      ) : (
        actividadesPorDia.map((dia) => (
          <View key={dia.dia} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{dia.dia}</Text>
            {dia.actividades.map((actividad) => (
              <View key={actividad.id_itinerario} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{actividad.titulo_actividad}</Text>
                  <Text style={styles.cardDetails}>
                    {actividad.hora_itinerario} 
                  </Text>
                  {actividad.nota_itinerario ? (
                    <Text style={[styles.cardDetails, { fontStyle: 'italic' }]}>
                      Nota: {actividad.nota_itinerario || 'Sin nota'}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleCompletar(actividad.id_itinerario)}>
                    <Text style={{ color: colors.lightBlue, fontWeight: '700' }}>✓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEliminar(actividad.id_itinerario)}>
                    <Text style={{ color: colors.warmOrange, fontWeight: '700' }}>✗</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))
      )}

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar actividad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    marginRight: 8,
  },
  switchActive: {
    backgroundColor: colors.primaryBlue,
  },
  switchText: {
    textAlign: 'center',
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  switchTextActive: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardDetails: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    backgroundColor: colors.primaryBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 8,
  },
});
