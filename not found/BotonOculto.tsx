import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { BotonAccion } from '../components/mapa/BotonAccion';

interface BotonOcultoProps {
  onIndicacionesPress: () => void;
  onSeguirPress: () => void;
}

export  function BotonOculto( onIndicacionesPress, onSeguirPress) {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

  // Animaciones para cada botón
  const translateY1 = useRef(new Animated.Value(0)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;

  const translateY2 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;

  const ocultar = (
    translateY: Animated.Value,
    opacity: Animated.Value,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    Haptics.selectionAsync();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  const mostrar = (
    translateY: Animated.Value,
    opacity: Animated.Value,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(true));
  };

  return (
    <View style={styles.container}>
      {visible && (
        <BotonAccion
          texto="Indicaciones"
          translateY={translateY1}
          opacity={opacity1}
          onPress={() => {
            onIndicacionesPress();
            ocultar(translateY1, opacity1, setVisible);
          }}
        />
      )}
      {visible2 && (
        <BotonAccion
          texto="Seguir"
          translateY={translateY2}
          opacity={opacity2}
          onPress={() => {
            onSeguirPress();
            ocultar(translateY2, opacity2, setVisible2);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    gap: 10,
  },
});
