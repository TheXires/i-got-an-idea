import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {Color} from '../customTypes/colors';

function Agb() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AGB Seite</Text>
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

export default Agb
