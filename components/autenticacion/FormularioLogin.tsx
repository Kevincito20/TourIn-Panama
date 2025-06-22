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
            <Logo size={100} showText={false} variant="icon" />
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
    paddingVertical: 20,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#4F8FF7',
  },
  motivationalText: {
    fontSize: 20,
    marginTop: 6,
    color: '#757575',
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    gap: 16,
  },
  welcome: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  subWelcome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  registerText: {
    textAlign: 'center',
    color: '#3c6382',
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F8FF7',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3c6382',
  },
  footerSeparator: {
    fontSize: 18,
    marginHorizontal: 8,
    color: '#0a3d62',
  },
  footerIcon: {
    fontSize: 18,
    marginHorizontal: 6,
  },
});
