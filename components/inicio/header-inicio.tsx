import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderInicioProps {
  onMenuPress: () => void;
}

export const HeaderInicio: React.FC<HeaderInicioProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>TourIn-Panama</Text>

      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Abrir menú de navegación"
      >
        
        <View style={styles.burgerLine} />
        <View style={[styles.burgerLine, { marginVertical: 4 }]} />
        <View style={styles.burgerLine} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222222',
  },
  menuButton: {
    padding: 8,
    justifyContent: 'center',
  },
  burgerLine: {
    width: 24,
    height: 2,
    backgroundColor: '#222222',
    borderRadius: 1,
  },
});
