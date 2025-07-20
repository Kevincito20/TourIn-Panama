import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors'; // Asegúrate de que el path sea correcto

interface HistoriaItem {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
}

const historiaItems: HistoriaItem[] = [
  {
    id: '1',
    icon: 'flag-outline',
    iconColor: colors.warmOrange,
    title: 'Independencia de Panamá',
    subtitle: '3 de nov. de 1903',
    description: 'Panamá proclamó su independencia de Colombia.',
  },
  {
    id: '2',
    icon: 'location-outline',
    iconColor: colors.lightBlue,
    title: 'Casco Antiguo',
    subtitle: 'Patrimonio Cultural',
    description: 'Calles empedradas, iglesias coloniales y plazas.',
  },
  {
    id: '3',
    icon: 'construct-outline',
    iconColor: colors.warmYellow,
    title: 'Canal de Panamá',
    subtitle: 'Ingeniería Moderna',
    description: 'Conectando el Atlántico y el Pacífico.',
  },
];

const CARD_WIDTH = Dimensions.get('window').width * 0.65;

const HistoriaCard = ({ item }: { item: HistoriaItem }) => (
  <View style={styles.card}>
    <View style={[styles.iconCircle, { backgroundColor: `${item.iconColor}25` }]}>
      <Ionicons name={item.icon as any} size={28} color={item.iconColor} />
    </View>
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    <Text style={styles.cardDescription}>{item.description}</Text>
  </View>
);

export default function Historia() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historia de Panamá</Text>
      <FlatList
        data={historiaItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoriaCard item={item} />}
        contentContainerStyle={{ paddingRight: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryBlue,
    marginBottom: 14,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 18,
  },
});
