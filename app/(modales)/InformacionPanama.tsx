import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const sections = [
  {
    title: 'Números de Emergencia',
    data: [
      { label: 'Policía Nacional', action: '104 ', isPhone: true },
      { label: 'Bomberos', action: '103 ', isPhone: true },
      { label: 'Ambulancia / Cruz Roja', action: '911 ', isPhone: true },
      { label: 'Defensa Civil', action: '115 ', isPhone: true },
    ],
  },
  {
    title: 'Clínicas Recomendadas',
    data: [
      { label: 'Hospital Punta Pacífica', action: 'https://www.pacificasalud.com', isPhone: false },
      { label: 'Hospital Nacional', action: 'https://www.hospitalnacional.com', isPhone: false },
    ],
  },
  {
    title: 'Metro de Panamá',
    data: [
      { label: 'Mapa y horarios', action: 'https://www.elmetrodepanama.com', isPhone: false },
    ],
  },
  {
    title: 'Transbordo Metro Bus',
    data: [
      { label: 'Guía oficial', action: 'https://www.tarjetametrobus.com.pa', isPhone: false },
    ],
  },
  {
    title: 'Embajadas',
    data: [
      { label: 'Embajada de EE.UU.', action: 'https://pa.usembassy.gov/es/', isPhone: false },
      { label: 'Embajada de España', action: 'https://www.exteriores.gob.es/es/Embajadas/panama', isPhone: false },
    ],
  },
  {
    title: 'Consejos para Viajeros',
    tips: [
      'Lleva siempre agua y protector solar.',
      'Usa taxis autorizados o apps de transporte.',
      'Evita mostrar objetos de valor en público.',
      'La moneda oficial es Balboa (PAB) y también se usa el dólar estadounidense (USD).',
      'El idioma oficial es español.',
    ],
  },
  {
    title: 'Frases útiles en español',
    tips: [
      '¿Dónde está el baño? – Where is the bathroom?',
      '¿Cuánto cuesta? – How much does it cost?',
      'Necesito ayuda – I need help',
      'No hablo mucho español – I don’t speak much Spanish',
    ],
  },
];

export default function InformacionEsencialScreen() {
  const router = useRouter();

  const handleAction = (value: string, isPhone: boolean) => {
    const link = isPhone ? `tel:${value}` : value;
    Linking.openURL(link);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primaryBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información esencial</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.data &&
              section.data.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAction(item.action, item.isPhone)}
                  style={styles.row}
                  activeOpacity={0.7}
                >
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.actionText}>{item.isPhone ? item.action : 'Abrir'}</Text>
                </TouchableOpacity>
              ))}
            {section.tips &&
              section.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Text style={styles.tipText}>• {tip}</Text>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  actionText: {
    fontSize: 14,
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  tipRow: {
    paddingVertical: 6,
  },
  tipText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});
