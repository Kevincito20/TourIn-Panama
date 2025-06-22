import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  type?: 'email' | 'password' | 'text';
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export function Input({ type = 'text', iconName, error, ...rest }: InputProps) {
  const [isSecure, setIsSecure] = useState(type === 'password');

  const toggleSecure = () => setIsSecure(!isSecure);

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color="#999"
            style={styles.icon}
          />
        )}

        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry={type === 'password' ? isSecure : false}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          {...rest}
        />

        {type === 'password' && (
          <Ionicons
            name={isSecure ? 'eye-off' : 'eye'}
            size={22}
            color="#999"
            style={styles.eyeIcon}
            onPress={toggleSecure}
          />
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 350,
    height: 60,
    backgroundColor: '#F2F2F2',
    borderColor: '#E7E7E7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginRight: 12,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    marginTop: 4,
    color: '#f44336',
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingLeft: 16,
  },
});
