/* 
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

// Importa tus componentes de contenido
import Historia from '../conocer-panama/Historia';
import Geografia from '../conocer-panama/Geografia';
import DatosCuriosos from '../conocer-panama/DatosCuriosos';
import Cultura from '../conocer-panama/Cultura';

export default function ConocerPanama() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const cards = [
    {
      id: 1,
      title: 'Historia',
      description: 'Descubre la rica historia de Panamá',
      section: 'historia',
      icon: '🏛️'
    },
    {
      id: 2,
      title: 'Geografía',
      description: 'Explora la geografía panameña',
      section: 'geografia',
      icon: '🗺️'
    },
    {
      id: 3,
      title: 'Datos Curiosos',
      description: 'Conoce datos interesantes',
      section: 'datos-curiosos',
      icon: '💡'
    },
    {
      id: 4,
      title: 'Cultura',
      description: 'Sumérgete en la cultura local',
      section: 'cultura',
      icon: '🎭'
    }
  ];

  const handleCardPress = (section: string) => {
    setSelectedSection(section);
  };

  const handleBack = () => {
    setSelectedSection(null);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'historia':
        return <Historia onBack={handleBack} />;
      case 'geografia':
        return <Geografia onBack={handleBack} />;
      case 'datos-curiosos':
        return <DatosCuriosos onBack={handleBack} />;
      case 'cultura':
        return <Cultura onBack={handleBack} />;
      default:
        return null;
    }
  };

  if (selectedSection) {
    return renderContent();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Conocer Panamá</Text>
      
      <View style={styles.cardsContainer}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => handleCardPress(card.section)}
          >
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
});  */

