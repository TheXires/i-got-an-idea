import React, {useContext} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import ChatProvider, {ChatContext} from '../contexts/chatContext';
import {Color} from '../customTypes/colors';
import {Chat as ChatType} from '../customTypes/chat';
import {sendChatMessage} from '../services/database';
import {getProfilePictureURL, getUID} from '../services/auth';
import firebase from 'firebase/app';

const Chat = () => {
  const {chats}: {chats: ChatType[]} = useContext<any>(ChatContext);
  return (

    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      {chats !== undefined ? (
        chats.map(c => {
          return (
            <View key={c.ideaID}>
              <Text style={{color: Color.FONT1}}>Idea: {c.ideaID}</Text>
              {
                c.messages.map(m => {
                  return (<Text key={m.id} style={{color: Color.FONT1}}>{m.content}</Text>)
                })
              }
            </View>
          )
        })
      ) : (
          <Text style={{color: Color.FONT1}}>Loading...</Text>
        )}
      <Button title="Neue Chat Nachricht!" onPress={() => sendChatMessage({
            ideaID: 'LRt2WVP7CC0lSHRj9KbP',
            authorID: getUID(),
            authorName: 'Felix',
            authorProfilePictureURL: getProfilePictureURL(),
            timestamp: firebase.firestore.Timestamp.now(),
            content: 'Coole Nachricht, bro!'
      })}></Button>
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