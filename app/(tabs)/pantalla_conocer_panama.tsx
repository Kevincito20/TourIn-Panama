import PantallaDetalleProvincia from '@/components/conocer-panama/PantallaDetalleProvincia';
import RegionesList from '@/components/conocer-panama/RegionesList';
import InicioScreen from '@/components/inicio/Screen-header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function PantallaConocerPanamaScreen() {
  return (
    <ScrollView style={styles.container}>
      <InicioScreen />
      <RegionesList />
    </ScrollView>
  );
}

export default function PantallaConocerPanama() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="pantalla_conocer_panama"
        component={PantallaConocerPanamaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PantallaDetalleProvincia"
        component={PantallaDetalleProvincia}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
