import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Color} from '../customTypes/colors';

/**
 * A button with aboulute position used in various screens
 * 
 */
const FloatingActionButton = ({navigation, icon, onPress = undefined}: {navigation: any, icon: any, onPress: any}) => {
  return (
    <TouchableOpacity onPress={() => {
      if (onPress != undefined) {
        onPress();
      }
    }} style={styles.container}>
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: Color.ACCENT,
    borderRadius: 100,
  },
})

export default FloatingActionButton