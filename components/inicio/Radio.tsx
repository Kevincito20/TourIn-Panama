import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const opciones = [5, 10, 15]; // Radios en km

export default function SeleccionarRadio() {
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona un radio de búsqueda</Text>
      <Text style={styles.subtitulo}>¿A qué distancia deseas ver actividades cercanas?</Text>

      <View style={styles.opciones}>
        {opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion}
            style={[
              styles.boton,
              seleccionado === opcion && styles.botonSeleccionado,
            ]}
            onPress={() => setSeleccionado(opcion)}
          >
            <Text
              style={[
                styles.textoBoton,
                seleccionado === opcion && styles.textoSeleccionado,
              ]}
            >
              {opcion} km
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {seleccionado && (
        <Text style={styles.confirmacion}>
          Has seleccionado: <Text style={styles.valor}>{seleccionado} km</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFCFF',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#6A6A6A',
    marginBottom: 24,
    textAlign: 'center',
  },
  opciones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  boton: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  botonSeleccionado: {
    backgroundColor: '#007AFF',
  },
  textoBoton: {
    fontSize: 16,
    color: '#333',
  },
  textoSeleccionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmacion: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
  },
  valor: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
