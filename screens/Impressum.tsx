import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {Color} from '../customTypes/colors';

function Impressum() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Impressums Seite</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.FONT1
  }
});

export default Impressum;
