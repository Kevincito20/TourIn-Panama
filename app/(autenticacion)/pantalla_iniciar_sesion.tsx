import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormularioLogin from '../../components/autenticacion/FormularioLogin';

const PantallaInicioSesion = () => {

  return (
    <View style={styles.container}  testID="pantallaInicioSesion" accessibilityLabel="pantalla_inicio_sesion">
      <FormularioLogin />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PantallaInicioSesion;
 