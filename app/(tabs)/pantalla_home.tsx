import Categorias from '@/components/inicio/categorias';
import Historia from '@/components/inicio/historia';
import Itinerario from '@/components/inicio/itinerario';
import Recomendaciones from '@/components/inicio/recomendaciones';
import InicioScreen from '@/components/inicio/Screen-header';
import { colors } from '@/constants/Colors';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PantallaHome() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.background }}
      >
        <InicioScreen />

        <View style={styles.section}>
          <Recomendaciones />
          <View style={styles.section}>
            <Categorias />
          </View>
          <View style={styles.section}>
            <Itinerario />
          </View>
          <View style={styles.section}>
            <Historia />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navIndicaciones, 
  },
  section: {
    paddingTop: 0,
  },
});

