import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from '../customTypes/colors';
import { logOut } from '../services/auth';
import { startChat } from '../services/database';

const Settings = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut} style={styles.button}>
        <Text style={{ color: Color.FONT1 }}>LogOut</Text>
      </TouchableOpacity>
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
    color: Color.FONT1
  },
  button: {
    marginBottom: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    paddingVertical: 13,
    paddingHorizontal: 100,
    backgroundColor: Color.BACKGROUND3,
    borderRadius: 50
  }
});

export default Settings;
