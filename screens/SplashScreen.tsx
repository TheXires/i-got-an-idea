import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomSpinner from '../components/CustomSpinner';
import { Color } from '../customTypes/colors';

/**
 * loading/splashscreen
 */
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <CustomSpinner />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
