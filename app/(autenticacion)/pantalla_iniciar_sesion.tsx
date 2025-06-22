import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormularioLogin from '../../components/autenticacion/FormularioLogin';
const PantallaInicioSesion = () => {
  const onLogin = (email: string, password: string) => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <FormularioLogin onLogin={onLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    },
});

export default PantallaInicioSesion;
