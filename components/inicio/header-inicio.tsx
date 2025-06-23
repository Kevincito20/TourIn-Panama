import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface HeaderInicioProps {
  userName: string;
  onMenuPress: () => void;
}

export const HeaderInicio: React.FC<HeaderInicioProps> = ({ userName, onMenuPress }) => {
  return (
    <View style={styles.header}>
      {/* Fila Superior: Nombre App + Menú Hamburguesa */}
      <View style={styles.topRow}>
        <Text style={styles.appName}>TourIn-Panama</Text>
        <TouchableOpacity
          onPress={onMenuPress}
          style={styles.menuButton}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Abrir menú de navegación"
        >
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Fila Inferior: Saludo al Usuario */}
      <View style={styles.bottomRow}>
        <Text style={styles.greeting}>¡Hola, {userName}!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4F8FF7',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2.5%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  appName: {
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  menuButton: {
    padding: wp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuIcon: {
    fontSize: wp('6%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: wp('4.5%'),
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.95,
  },
});
