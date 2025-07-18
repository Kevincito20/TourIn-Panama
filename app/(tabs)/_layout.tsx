import IconSymbol from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="pantalla_home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol name="home" size={28} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="pantalla_conocer_panama"
        options={{
          title: 'Panamá',
          tabBarIcon: ({ color }) => <IconSymbol name="book" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pantalla_perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <IconSymbol name="person-circle-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pantalla_mapa"
        options={{
          title: 'Actividades',
          tabBarIcon: ({ color }) => <IconSymbol name="map" size={28} color={color} />,
        }}
      />

    </Tabs>
  );
}
/**
 * <Tabs.Screen
        name="pantalla_actividades"
        options={{
          title: 'Actividades',
          tabBarIcon: ({ color }) => <IconSymbol name="calendar" size={28} color={color} />,
        }}
      />
 */
