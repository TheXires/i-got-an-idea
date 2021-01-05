import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Color} from '../customTypes/colors';
import {loginWithGoogle} from '../services/auth';


function Loginbutton({provider}: {provider: string}) {
  return (
    <View className="loginbutton">
      <TouchableOpacity onPress={loginWithGoogle} style={style.button}>
        <Text>Login with {provider}</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  button: {
    marginBottom: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    paddingVertical: 13,
    paddingHorizontal: 100,
    backgroundColor: Color.PRIMARY,
    borderRadius: 50
  }
});

export default Loginbutton
