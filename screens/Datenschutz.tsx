import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {Color} from '../customTypes/colors';

function Datenschutz() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Datenschutz Seite</Text>
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
    color: Color.FONT
  }
});

export default Datenschutz;
