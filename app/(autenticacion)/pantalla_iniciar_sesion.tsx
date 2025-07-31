import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormularioLogin from '../../components/autenticacion/FormularioLogin';

const PantallaInicioSesion = () => {

  return (
    <View style={styles.container}>
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
 