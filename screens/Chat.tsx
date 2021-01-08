import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Color } from '../customTypes/colors';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
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

export default Chat;