import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    iconColor: '#F87171',
    title: 'Independencia de Panamá',
    subtitle: '3 de nov. de 1903',
    description: 'Panamá proclamó su independencia de Colombia.',
  },
  {
    id: '2',
    icon: 'location-outline',
    iconColor: '#34D399',
    title: 'Casco Antiguo',
    subtitle: 'Patrimonio Cultural',
    description: 'Calles empedradas, iglesias coloniales y plazas.',
  },
  {
    id: '3',
    icon: 'construct-outline',
    iconColor: '#60A5FA',
    title: 'Canal de Panamá',
    subtitle: 'Ingeniería Moderna',
    description: 'Conectando el Atlántico y el Pacífico.',
  },
];

const CARD_WIDTH = Dimensions.get('window').width * 0.55;

const HistoriaCard = ({ item }: { item: HistoriaItem }) => (
  <View style={styles.card}>
    <View style={[styles.iconCircle, { backgroundColor: `${item.iconColor}20` }]}>
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
      <Text style={styles.header}>Historia</Text>
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
    marginBottom: 30,
    paddingTop: 50,

  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#4B5563',
  },
});
