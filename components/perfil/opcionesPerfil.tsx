import React from 'react';
import {Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/perfilStyles';
import { colors } from '@/constants/Colors';

interface Props {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  color?: string;
}

export const OpcionPerfil = ({ icon, label, onPress, color = colors.primaryBlue }: Props) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    {icon}
    <Text style={[styles.optionText, { color }]}>{label}</Text>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);
