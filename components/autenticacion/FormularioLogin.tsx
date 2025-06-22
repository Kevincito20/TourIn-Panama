import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Logo from '../ui/logo';
import { Card } from '../ui/cardLogin';
import { Input } from '../ui/input';
import Button from '../ui/boton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function PantallaInicioSesion({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña.');
      return;
    }
    onLogin();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo size={hp('12%')} showText={false} variant="icon" />
            <Text style={styles.appName}>TourIn-Panama</Text>
            <Text style={styles.motivationalText}>Descubre la magia Panameña</Text>
          </View>

          <Card style={styles.card}>
            <Text style={styles.welcome}>¡Bienvenido!</Text>
            <Text style={styles.subWelcome}>Inicia tu aventura panameña</Text>

            <Input
              placeholder="Correo electrónico"
              type="email"
              iconName="mail"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              placeholder="Contraseña"
              type="password"
              iconName="lock-closed"
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Iniciar sesión"
                onPress={handleLogin}
                backgroundColor="#4F8FF7"
                textColor="#fff"
              />
            </View>

            <TouchableOpacity
              onPress={() =>
                Alert.alert('Registro', 'Funcionalidad de registro próximamente.')
              }
            >
              <Text style={styles.registerText}>
                ¿Primera vez? <Text style={styles.registerLink}>¡Regístrate aquí!</Text>
              </Text>
            </TouchableOpacity>
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerIcon}>⭐</Text>
            <Text style={styles.footerText}>Explora </Text>
            <Text style={styles.footerSeparator}>·</Text>
            <Text style={styles.footerText}>Descubre </Text>
            <Text style={styles.footerSeparator}>·</Text>
            <Text style={styles.footerText}>Vive Panamá </Text>
            <Text style={styles.footerIcon}>🌴</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: hp('2.5%'),
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('2.5%'),
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  appName: {
    fontSize: wp('10%'),
    fontWeight: 'bold',
    marginTop: hp('1.5%'),
    color: '#4F8FF7',
  },
  motivationalText: {
    fontSize: wp('4.5%'),
    marginTop: hp('0.8%'),
    color: '#757575',
  },
  card: {
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('4%'),
    elevation: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    gap: hp('2%'),
  },
  welcome: {
    fontSize: wp('8%'),
    fontWeight: '700',
    color: '#000000',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  subWelcome: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#757575',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  buttonContainer: {
    marginTop: hp('1.5%'),
    marginBottom: hp('2%'),
  },
  registerText: {
    textAlign: 'center',
    color: '#3c6382',
    fontSize: wp('4%'),
  },
  registerLink: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#4F8FF7',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  footerText: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#3c6382',
  },
  footerSeparator: {
    fontSize: wp('4.5%'),
    marginHorizontal: wp('2%'),
    color: '#0a3d62',
  },
  footerIcon: {
    fontSize: wp('4.5%'),
    marginHorizontal: wp('1.5%'),
  },
});
