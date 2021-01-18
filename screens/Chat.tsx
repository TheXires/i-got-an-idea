import React, {useContext} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {ChatContext} from '../contexts/chatContext';
import {Color} from '../customTypes/colors';
import {Chat as ChatType} from '../customTypes/chat';
import CustomSpinner from '../components/CustomSpinner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from 'firebase/app';

const Chat = ({ navigation }: { navigation: any }) => {
  const {chats}: {chats: ChatType[]} = useContext<any>(ChatContext);
  return (

    <View style={styles.container}>
      {chats !== undefined ? (
        chats.map(chat => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetails', {id: chat.pinnedIdea.ideaID})} key={chat.pinnedIdea.ideaID} style={styles.chatBox}>
              <Image source={{uri: chat.pinnedIdea.pictureURL}} style={styles.image} />
              <View style={styles.textBox}>
                <Text style={styles.heading}>{chat.pinnedIdea.name}</Text>
                {chat.messages?.length > 0 ?
                  <View style={styles.lastMessage}>
                    {/* <Text style={styles.lastMessageDate}>
                      {chat.messages[0].timestamp.toDate().getDate()}.
                      {chat.messages[0].timestamp.toDate().getMonth() + 1}.
                      {chat.messages[0].timestamp.toDate().getFullYear()}
                    </Text> */}
                    <Text style={styles.lastMessageTime}>
                      {chat.messages[0].timestamp.toDate().getHours()}:
                      {chat.messages[0].timestamp.toDate().getMinutes()}
                    </Text>
                    <Text style={styles.lastMessageAuthor}>
                      {chat.messages[0].authorName}:
                    </Text>
                    <Text numberOfLines={1} style={styles.lastMessageText}>
                      {chat.messages[0].content}
                    </Text>
                  </View>
                  :
                  <></>
                }
              </View>
            </TouchableOpacity>
          )
        })
      ) : (
          <CustomSpinner />
        )}
      {/* <Button title="Neue Chat Nachricht!" onPress={() => sendChatMessage({
        ideaID: 'LRt2WVP7CC0lSHRj9KbP',
        authorID: getUID(),
        authorName: 'Felix',
        authorProfilePictureURL: getProfilePictureURL(),
        timestamp: firebase.firestore.Timestamp.now(),
        content: 'Coole Nachricht, bro!'
      })}></Button> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    padding: 10
  },
  chatBox: {
    color: Color.FONT1,
    marginBottom: 15,
    backgroundColor: Color.BACKGROUND2,
    borderRadius: 20,
    flexDirection: 'row'
  },
  textBox: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  heading: {
    color: Color.FONT1,
    fontWeight: 'bold',
    borderRadius: 20,
    fontSize: 15,
  },
  lastMessage: {
    flexDirection: 'row'
  },
  lastMessageDate: {
    color: Color.FONT3,
  },
  lastMessageTime: {
    color: Color.FONT3,
  },
  lastMessageAuthor: {
    marginLeft: 5,
    marginRight: 5,
    color: Color.FONT2,
  },
  lastMessageText: {
    marginRight: 8,
    color: Color.FONT1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});

export default Chat;