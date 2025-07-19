import IconSymbol from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000', // fondo negro
          height: 65,
          borderTopWidth: 0,          
        },
        tabBarActiveTintColor: '#ffffff',     // ícono activo blanco
        tabBarInactiveTintColor: '#888888',   // ícono inactivo gris
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="pantalla_home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pantalla_mapa_copy"
        options={{
          title: 'Actividades',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="location-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pantalla_conocer_panama"
        options={{
          title: 'Panamá',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="book" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pantalla_perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
