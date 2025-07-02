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
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color="#aaa"
            style={styles.icon}
          />
        )}

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry={type === 'password' ? isSecure : false}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          {...rest}
        />

        {type === 'password' && (
          <Ionicons
            name={isSecure ? 'eye-off' : 'eye'}
            size={20}
            color="#aaa"
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
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 6,
  },
  eyeIcon: {
    marginLeft: 6,
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    marginTop: 4,
    color: '#f44336',
    fontSize: 12,
    paddingLeft: 4,
  },
});
