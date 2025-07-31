import PantallaDetalleProvincia from '@/app/(modales)/PantallaDetalleProvincia';
import RegionesList from '@/components/conocer-panama/RegionesList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function PantallaConocerPanamaScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.container}>
        <RegionesList />
      </ScrollView>
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
});
