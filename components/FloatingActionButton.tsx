import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../customTypes/colors';

const FloatingActionButton = ({navigation}: {navigation: any}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CreateIdea')} style={styles.container}>
      <Ionicons name="ios-add" size={40} color={Color.FONT1} />
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