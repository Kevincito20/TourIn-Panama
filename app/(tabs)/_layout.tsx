import IconSymbol from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {

          backgroundColor: '#000000',
          height: 65,
          borderTopWidth: 0,
    
          borderRadius: 15,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarItemStyle: {
          justifyContent: 'center', 
          alignItems: 'center',    
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
        name="pantalla_mapa copy"
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