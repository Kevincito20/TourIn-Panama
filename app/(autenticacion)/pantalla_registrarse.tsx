import { View, StyleSheet } from 'react-native';
import FormularioRegistro from '@/components/autenticacion/FormularioRegistro';
export default function RegistroScreen() {
  return (
    <View style={styles.container}>
      <FormularioRegistro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fondo negro para que combine con el login si quieres
  },
});
 