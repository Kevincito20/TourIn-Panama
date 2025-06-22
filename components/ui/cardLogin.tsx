import { View, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.topBar} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'visible', 
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20, 
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#4F8FF7',
  },
});
