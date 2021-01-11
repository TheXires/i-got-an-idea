import firebase from 'firebase/app';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from '../customTypes/colors';
import { getUID, logOut } from '../services/auth';
import { sendChatMessage, startChat } from '../services/database';

const Settings = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut} style={styles.button}>
        <Text style={{ color: Color.FONT1 }}>LogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => startChat('LRt2WVP7CC0lSHRj9KbP')} style={styles.button}>
        <Text style={{ color: Color.FONT1 }}>StartChat</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendChatMessage({
        id: '12345', ideaID: 'LRt2WVP7CC0lSHRj9KbP',
        chatID: 'J8iBUgatzBQ3mSVoxRF31iqkKw72', authorID: getUID(),
        timestamp: firebase.firestore.Timestamp.now(), content: 'Dies ist eine Nachricht!'
      })} style={styles.button}>
        <Text style={{ color: Color.FONT1 }}>SendChatMessage</Text>
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
