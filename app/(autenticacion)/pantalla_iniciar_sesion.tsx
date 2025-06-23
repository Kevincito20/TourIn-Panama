import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router'; // 👈 Importa el router
import FormularioLogin from '../../components/autenticacion/FormularioLogin';

const PantallaInicioSesion = () => {
  const onLogin = () => {
    console.log('Usuario ha iniciado sesión');
    router.replace('/(tabs)/pantalla_home'); // 
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
    backgroundColor: '#fff',
  },
});

export default PantallaInicioSesion;
