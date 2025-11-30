import Categorias from '@/components/inicio/categorias';
import Historia from '@/components/inicio/historia';
import Itinerario from '@/components/inicio/itinerario';
import { Recomendaciones } from '@/components/inicio/recomendaciones';
import InicioScreen from '@/components/inicio/Screen-header';
import { colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PantallaHome() {

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
      testID="pantallaHome"
      accessibilityLabel="pantalla_home"
    >
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingBottom: 0,
        }}
        testID="scrollViewHome"
        accessibilityLabel="scroll_view_home"
      >
        <View testID="contenedorHeader" accessibilityLabel="contenedor_header">
          <InicioScreen />
        </View>

        <View style={styles.section} testID="contenedorRecomendaciones" accessibilityLabel="contenedor_recomendaciones">
          <Recomendaciones />
        </View>

        <View style={styles.section} testID="contenedorCategorias" accessibilityLabel="contenedor_categorias">
          <Categorias />
        </View>

        <View style={styles.section} testID="contenedorItinerario" accessibilityLabel="contenedor_itinerario">
          <Itinerario />
        </View>

        {/* Historia comentada, pero listo si se activa */}
        {/* <View style={styles.section} testID="contenedorHistoria" accessibilityLabel="contenedor_historia">
          <Historia />
        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingTop: 0,
  },
});
