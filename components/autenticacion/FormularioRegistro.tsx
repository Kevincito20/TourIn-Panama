// components/autenticacion/FormularioRegistro.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Input } from '../ui/input';
import { RegistrarUsuario } from '../services/registroService';

export default function FormularioRegistro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegistro = async () => {
    setError(null);

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !identificacion.trim() ||
      !contrasena.trim() ||
      !confirmarContrasena.trim()
    ) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const success = await RegistrarUsuario({
        nombre,
        apellido,
        correo,
        contrasena,
        identificacion,
      });

      if (success) {
        Alert.alert('Registro exitoso', '¡Bienvenido a TourIn-Panama!', [
          {
            text: 'OK',
            onPress: () => {
              router.replace('/(tabs)/pantalla_home');
            },
          },
        ]);
      } else {
        setError('Error al registrar. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Ocurrió un error durante el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/(autenticacion)/pantalla_iniciar_sesion');
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
            <Text style={styles.titulo}>Registrate</Text>
            <Text style={styles.subtitulo}>Únete a nuestra comunidad</Text>
          </View>

          <View style={styles.botones}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <Input
                type="text"
                placeholder="Nombre"
                autoCapitalize="words"
                placeholderTextColor="#999"
                value={nombre}
                onChangeText={setNombre}
                error={error && !nombre.trim() ? error : undefined}
              />

              <Input
                type="text"
                placeholder="Apellido"
                autoCapitalize="words"
                placeholderTextColor="#999"
                value={apellido}
                onChangeText={setApellido}
                error={error && !apellido.trim() ? error : undefined}
              />

              <Input
                type="email"
                placeholder="Correo electrónico"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
                value={correo}
                onChangeText={setCorreo}
                error={error && !correo.trim() ? error : undefined}
              />

              <Input
                type="password"
                placeholder="Contraseña"
                secureTextEntry
                placeholderTextColor="#999"
                value={contrasena}
                onChangeText={setContrasena}
                error={error && !contrasena.trim() ? error : undefined}
              />

              <Input
                type="password"
                placeholder="Confirmar contraseña"
                secureTextEntry
                placeholderTextColor="#999"
                value={confirmarContrasena}
                onChangeText={setConfirmarContrasena}
                error={error && contrasena !== confirmarContrasena ? 'Las contraseñas no coinciden' : undefined}
              />

              <Input
                type="text"
                placeholder="Identificación"
                keyboardType="numeric"
                placeholderTextColor="#999"
                value={identificacion}
                onChangeText={setIdentificacion}
                error={error && !identificacion.trim() ? error : undefined}
              />

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegistro}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Registrarse</Text>
                )}
              </TouchableOpacity>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Continuar con Google</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
              ¿Ya tienes cuenta?{' '}
              <Text
                style={{ color: '#007AFF' }}
                onPress={handleLogin}
              >
                Inicia sesión aquí
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
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#f44336',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#7aaeff',
  },
});
