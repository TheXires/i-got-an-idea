import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Color} from '../customTypes/colors';

function Impressum() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        i-got-an-idea Stiftung{'\n'}
        Musterstr. 45{'\n'}
        45123 Essen{'\n'}
        {'\n'}
        Telefon: &#43;49 1521 9999999{'\n'}
        E-Mail: xires.dev&#64;gmail.com{'\n'}
        {'\n'}
        Gesch&auml;ftsführung{'\n'}
        Robin Beckmann, Felix Thomsen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  text: {
    color: Color.FONT1,
    fontSize: 18
  }
});

export default Impressum;
