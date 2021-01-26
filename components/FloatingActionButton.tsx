import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Color} from '../customTypes/colors';

/**
 * A button with aboulute position used in various screens
 * 
 */
const FloatingActionButton = ({navigation, next, icon, onPress = undefined}: {navigation: any, next: string, icon: any, onPress: any}) => {
  return (
    <TouchableOpacity onPress={() => {
      if (onPress != undefined) {
        onPress();
      }
      navigation.navigate(next)
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