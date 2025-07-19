import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

const emergencyNumbers = [
  { label: 'Policía Nacional', number: '104' },
  { label: 'Bomberos', number: '103' },
  { label: 'Ambulancia', number: '911' },
  { label: 'Cruz Roja', number: '911' },
  { label: 'Defensa Civil', number: '115' },
];

const usefulTips = [
  'Lleva siempre agua y protector solar.',
  'Usa taxis autorizados o apps de transporte.',
  'El idioma oficial es español.',
  'La moneda es Balboa (PAB) y dólar estadounidense (USD).',
  'Evita mostrar objetos de valor en público.',
];

const importantLinks = [
  { label: 'Autoridad de Turismo de Panamá', url: 'https://www.visitpanama.com' },
  { label: 'Embajada de EE.UU. en Panamá', url: 'https://pa.usembassy.gov/es/' },
  { label: 'Transporte Público de Ciudad de Panamá', url: 'https://www.municidaddelpueblo.gob.pa' },
];

interface MenuHamburguesaProps {
  onClose: () => void;
}

const MenuHamburguesa: React.FC<MenuHamburguesaProps> = ({ onClose }) => {
  const llamarNumero = (num: string) => {
    Linking.openURL(`tel:${num}`);
  };

  const abrirLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Números de Emergencia</Text>
        {emergencyNumbers.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.row}
            onPress={() => llamarNumero(item.number)}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.actionText}>{item.number } </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Consejos Útiles</Text>
        {usefulTips.map((tip, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>• {tip}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Enlaces Importantes</Text>
        {importantLinks.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.row}
            onPress={() => abrirLink(item.url)}
            activeOpacity={0.7}
          >
            <Text style={styles.linkLabel}>{item.label}</Text>
            <Text style={styles.actionText}>Abrir</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.closeButtonText}>Cerrar menú</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 20,
    color: '#222',
  },
  row: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  linkLabel: {
    fontSize: 16,
    color: '#4F46E5',
    flex: 1,
  },
  actionText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MenuHamburguesa;
