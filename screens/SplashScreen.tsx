import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import icon from '../assets/spinner.gif';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={icon} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
