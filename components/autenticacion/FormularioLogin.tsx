// components/autenticacion/FormularioLogin.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Input } from '../ui/input';
import { loginUsuario, propLogin } from '../services/authService';
import Button from '../ui/boton';

export default function FormularioLogin() {
  const [email, setCorreo] = useState('');
  const [password, setContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa correo y contraseña');
      return;
    }

    setLoading(true);

    const payload: propLogin = { email, password };
    const success = await loginUsuario(payload);

    setLoading(false);

    if (success) {
      router.replace('/(tabs)/pantalla_home');
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
      testID="pantallaLogin"
      accessibilityLabel="pantalla_login"
    >
      <View
        style={styles.overlay}
        testID="contenedorOverlay"
        accessibilityLabel="contenedor_overlay"
      >

        <View
          testID="contenedorTitulos"
          accessibilityLabel="contenedor_titulos"
        >
          <Text
            style={styles.titulo}
            testID="tituloLogin"
            accessibilityLabel="titulo_login"
          >
            Iniciar Sesión
          </Text>

          <Text
            style={styles.subtitulo}
            testID="subtituloLogin"
            accessibilityLabel="subtitulo_login"
          >
            Descubre la magia Panameña
          </Text>
        </View>

        <View
          style={styles.botones}
          testID="contenedorFormulario"
          accessibilityLabel="contenedor_formulario"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            testID="keyboardViewLogin"
            accessibilityLabel="keyboard_view_login"
          >

            <Input
              type="email"
              placeholder="Correo Electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setCorreo}
              error={error && !email.trim() ? error : undefined}
              testID="inputLoginCorreo"
              accessibilityLabel="input_login_correo"
            />

            <Input
              type="password"
              placeholder="Contraseña"
              iconName="lock-closed"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setContraseña}
              error={error && !password.trim() ? error : undefined}
              testID="inputLoginContrasena"
              accessibilityLabel="input_login_contrasena"
            />

            {error && email.trim() && password.trim() && (
              <Text
                style={styles.errorText}
                testID="mensajeErrorLogin"
                accessibilityLabel="mensaje_error_login"
              >
                {error}
              </Text>
            )}

            <Text
              style={{ color: '#fff', textAlign: 'right', marginBottom: 20 }}
              testID="linkOlvidasteContrasena"
              accessibilityLabel="link_olvidaste_contrasena"
            >
              ¿Olvidaste tu contraseña?
            </Text>

            <Button
              title="Ingresar"
              onPress={handleLogin}
              loading={loading}
              disabled={!email || !password}
              style={{ marginTop: 5 }}
              testID="btnIngresar"
              accessibilityLabel="boton_ingresar"
            />

          </KeyboardAvoidingView>
        </View>

        <View testID="contenedorRegistro" accessibilityLabel="contenedor_registro">
          <Text
            style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}
            testID="textoNoTienesCuenta"
            accessibilityLabel="texto_no_tienes_cuenta"
          >
            ¿No tienes cuenta?{' '}
            <Text
              style={{ color: '#007AFF' }}
              onPress={handleRegistro}
              testID="linkIrARegistro"
              accessibilityLabel="link_ir_a_registro"
            >
              Regístrate aquí
            </Text>
          </Text>
        </View>

      </View>
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
    color: '#fff',
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
