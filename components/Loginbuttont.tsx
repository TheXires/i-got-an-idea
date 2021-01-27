import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Color} from '../customTypes/colors';
import {loginWithGoogle} from '../services/auth';


function Loginbutton() {  
  return (
    <View>
      <TouchableOpacity onPress={loginWithGoogle} style={styles.button} activeOpacity={0.9}>
      <Text style={{color: Color.FONT1, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Login mit Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
    marginHorizontal: 100,
    paddingVertical: 13,
    paddingHorizontal: 10,
    backgroundColor: Color.BACKGROUND,
    borderRadius: 50
  }
});

export default Loginbutton
