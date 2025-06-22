// components/Logo.tsx
import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'

interface LogoProps {
  size?: number
  showText?: boolean
  textColor?: string
  variant?: 'horizontal' | 'icon'
}

export default function Logo({
  size = 48,
  showText = false,
  textColor = '#000',
  variant = 'icon',
}: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logo_Tour.jpg')}
        style={[styles.image, { width: size, height: size }]}
      />
      {showText && variant === 'horizontal' && (
        <Text
          style={[
            styles.text,
            { fontSize: size * 0.4, color: textColor }
          ]}
        >
          CulturaConecta
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
})
