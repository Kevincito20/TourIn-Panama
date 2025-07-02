// components/autenticacion/FormularioLogin.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Input } from '../ui/input';
import { loginUsuario, propLogin } from './authService';
import Button from '../ui/boton'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function FormularioLogin() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    if (!correo.trim() || !contraseña.trim()) {
      setError('Por favor ingresa correo y contraseña');
      return;
    }

    setLoading(true);

    const payload: propLogin = { correo, contraseña };
    const success = await loginUsuario(payload);

    setLoading(false);

    if (success) {
      Alert.alert('Login exitoso', '¡Bienvenido!', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/(tabs)/pantalla_home');
          },
        },
      ]);
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  const handleRegistro = () => {
    router.push('/(autenticacion)/pantalla_registrarse');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/fondo_login.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <View>
            <Text style={styles.titulo}>TourIn-Panama</Text>
            <Text style={styles.subtitulo}>Descubre la magia Panameña</Text>
          </View>

          <View style={styles.botones}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <Input
                type="email"
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                iconName="mail"
                placeholderTextColor="#999"
                value={correo}
                onChangeText={setCorreo}
                error={error && !correo.trim() ? error : undefined}
              />

              <Input
                type="password"
                placeholder="Contraseña"
                iconName="lock-closed"
                secureTextEntry={true}
                placeholderTextColor="#999"
                value={contraseña}
                onChangeText={setContraseña}
                error={error && !contraseña.trim() ? error : undefined}
              />

              {error && correo.trim() && contraseña.trim() && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <Text
                style={{ color: '#fff', textAlign: 'right', marginBottom: 20 }}
              >
                ¿Olvidaste tu contraseña?
              </Text>

              <Button
                title="Ingresar"
                onPress={handleLogin}
                loading={loading}
                disabled={!correo || !contraseña}
                style={{ marginTop: 5 }}
              />
            </KeyboardAvoidingView>

            <Button
              title="Continuar con Google"
              onPress={() => {}}
              backgroundColor="#fff"
              textColor="#000"
              icon={<Ionicons name="logo-google" size={18} color="#000" />}
              style={{ marginTop: 15 }}
            />
          </View>

          <View>
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
              ¿No tienes cuenta?{' '}
              <Text style={{ color: '#007AFF' }} onPress={handleRegistro}>
                Regístrate aquí
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titulo: {
    color: '#007AFF',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  botones: {
    padding: 20,
  },
  subtitulo: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#f44336',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
