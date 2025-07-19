import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import MenuHamburguesa from '../ui/InformacionPanama';
import { HeaderInicio } from './header-inicio';


const InicioScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderInicio onMenuPress={() => setMenuVisible(true)} />

      <Modal
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        
        <MenuHamburguesa onClose={() => setMenuVisible(false)} />
      </Modal>
    </View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
