import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const colores = {
  fondo: '#F9FAFB',
  primario: '#1E40AF',
  primarioClaro: '#60A5FA',
  texto: '#1F2937',
  gris: '#6B7280',
  blanco: '#FFFFFF',
  borde: '#E5E7EB',
};

export default function PerfilRediseñado() {
  const [ubicacion, setUbicacion] = useState(true);
  const [notificaciones, setNotificaciones] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  const manejarCambioPermiso = (nombre: string, valor: boolean) => {
    const estado = valor ? 'activado' : 'desactivado';
    Alert.alert('Permiso actualizado', `${nombre} ha sido ${estado}.`);
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      {/* Perfil */}
      <View style={estilos.cartaPerfil}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
          style={estilos.avatar}
        />
        <Text style={estilos.nombre}>Johnson Roy</Text>
        <Text style={estilos.rol}>Usuario Premium</Text>
      </View>

      {/* Sección de permisos */}
      <Seccion titulo="Configuración de permisos">
        <Permiso label="Ubicación" valor={ubicacion} onCambiar={(val) => {
          setUbicacion(val);
          manejarCambioPermiso('Ubicación', val);
        }} />
        <Permiso label="Notificaciones" valor={notificaciones} onCambiar={(val) => {
          setNotificaciones(val);
          manejarCambioPermiso('Notificaciones', val);
        }} />
        <Permiso label="Modo Oscuro" valor={modoOscuro} onCambiar={(val) => {
          setModoOscuro(val);
          manejarCambioPermiso('Modo Oscuro', val);
        }} />
      </Seccion>

      {/* Accesos rápidos */}
      <Seccion titulo="Mis accesos">
        <Acceso texto="Favoritos" />
        <Acceso texto="Editar perfil" />
      </Seccion>

      {/* Botón de cierre de sesión */}
      <TouchableOpacity style={estilos.botonSalir}>
        <Text style={estilos.textoBotonSalir}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Componentes reutilizables
const Seccion = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
  <View style={estilos.seccion}>
    <Text style={estilos.seccionTitulo}>{titulo}</Text>
    {children}
  </View>
);

const Permiso = ({
  label,
  valor,
  onCambiar,
}: {
  label: string;
  valor: boolean;
  onCambiar: (val: boolean) => void;
}) => (
  <View style={estilos.filaPermiso}>
    <Text style={estilos.textoPermiso}>{label}</Text>
    <Switch
      value={valor}
      onValueChange={onCambiar}
      trackColor={{ false: '#D1D5DB', true: colores.primarioClaro }}
      thumbColor={valor ? colores.primario : '#f4f3f4'}
    />
  </View>
);

const Acceso = ({ texto }: { texto: string }) => (
  <TouchableOpacity style={estilos.itemAcceso}>
    <Text style={estilos.textoAcceso}>{texto}</Text>
    <Text style={estilos.flecha}>›</Text>
  </TouchableOpacity>
);

// Estilos
const estilos = StyleSheet.create({
  contenedor: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colores.fondo,
    alignItems: 'center',
  },
  cartaPerfil: {
    backgroundColor: colores.blanco,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: colores.texto,
  },
  rol: {
    fontSize: 14,
    color: colores.gris,
    marginTop: 4,
  },
  seccion: {
    width: '100%',
    backgroundColor: colores.blanco,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: colores.texto,
  },
  filaPermiso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textoPermiso: {
    fontSize: 15,
    color: colores.gris,
  },
  itemAcceso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: colores.borde,
    borderBottomWidth: 1,
  },
  textoAcceso: {
    fontSize: 16,
    color: colores.texto,
  },
  flecha: {
    fontSize: 20,
    color: colores.gris,
  },
  botonSalir: {
    marginTop: 30,
    backgroundColor: colores.primario,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  textoBotonSalir: {
    color: colores.blanco,
    fontSize: 16,
    fontWeight: '600',
  },
});
