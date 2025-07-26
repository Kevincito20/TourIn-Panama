import { colors } from "@/constants/Colors";
import IconSymbol from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primaryBlue,
          height: 65,
          borderTopWidth: 0,
          overflow: "hidden",
          paddingBottom: 5, 
          paddingTop: 5,     
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#888888",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 2, // Mejor espaciado del texto
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 4, // Espaciado vertical para los íconos
        },
      }}
    >
      <Tabs.Screen
        name="pantalla_home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pantalla_mapa copy"
        options={{
          title: "Actividades",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="location-outline" size={24} color={color} />
          ),
        }}
      /> 

      <Tabs.Screen
        name="pantalla_conocer_panama"
        options={{
          title: "Panamá",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="book" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pantalla_perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}