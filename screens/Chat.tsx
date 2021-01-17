import React, {useContext} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {ChatContext} from '../contexts/chatContext';
import {Color} from '../customTypes/colors';
import {Chat as ChatType} from '../customTypes/chat';
import CustomSpinner from '../components/CustomSpinner';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Chat = ({ navigation }: { navigation: any }) => {
  const {chats}: {chats: ChatType[]} = useContext<any>(ChatContext);
  return (

    <View style={styles.container}>
      {chats !== undefined ? (
        chats.map(c => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetails', {id: c.pinnedIdea.ideaID})} key={c.pinnedIdea.ideaID} style={styles.chatBox}>
              <Image source={{uri: c.pinnedIdea.pictureURL}} style={styles.image} />
              <View style={styles.textBox}>
                <Text style={styles.heading}>{c.pinnedIdea.name}</Text>
                {c.messages.length > 0 ?
                  <View style={styles.lastMessage}>
                    <Text numberOfLines={1} style={styles.lastMessageText}>
                      {c.messages[0].content}
                    </Text>
                    <Text style={styles.lastMessageDate}>
                      {c.messages[0].timestamp.toDate().getDate()}.
                      {c.messages[0].timestamp.toDate().getMonth() + 1}.
                      {c.messages[0].timestamp.toDate().getFullYear()}
                    </Text>
                    <Text style={styles.lastMessageTime}>
                      {c.messages[0].timestamp.toDate().getHours()}:
                      {c.messages[0].timestamp.toDate().getMinutes()}
                    </Text>
                  </View>
                  :
                  <></>
                }
              </View>
            </TouchableOpacity>
            // <Text style={{color: 'white'}} key={c.pinnedIdea.ideaID}>
            //   {JSON.stringify(c)}
            // </Text>
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
    marginLeft: 8,
    color: Color.FONT3,
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