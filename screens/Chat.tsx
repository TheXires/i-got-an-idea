import React, { useContext } from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {ChatContext} from '../contexts/chatContext';
import {Color} from '../customTypes/colors';
import {Chat as ChatType} from '../customTypes/chat';
import CustomSpinner from '../components/CustomSpinner';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

/**
 * Screen for chat overview
 */
const Chat = ({navigation}: {navigation: any}) => {
  const {chats, chatAmount}: {chats: ChatType[], chatAmount: number} = useContext<any>(ChatContext);

  return (
    <ScrollView style={styles.container}>
      {chatAmount > 0 ?
        <View>
          {chats !== undefined ? (
            chats.map(chat => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('ChatDetails', {id: chat.pinnedIdea.ideaID})} key={chat.pinnedIdea.ideaID} style={styles.chatBox} activeOpacity={.8}>
                  <Image source={{uri: chat.pinnedIdea.pictureURL}} style={styles.image} />
                  <View style={styles.textBox}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.heading}>{chat.pinnedIdea.name}</Text>
                      {chat.messages?.length > 0 ? (
                        <Text style={styles.lastMessageTime}>
                          <Text style={{color: Color.FONT3}}> - </Text>
                          {chat.messages[chat.messages.length - 1].timestamp.toDate().getHours()}
                          &#58;
                          {chat.messages[chat.messages.length - 1].timestamp.toDate().getMinutes()}
                        </Text>
                      ) : (<></>)}
                    </View>
                    {chat.messages?.length > 0 ?
                      <View style={styles.lastMessage}>
                        <Text style={styles.lastMessageAuthor}>
                          {chat.messages[chat.messages.length - 1].authorName}:
                        </Text>
                        <Text numberOfLines={1} style={styles.lastMessageText}>
                          {chat.messages[chat.messages.length - 1].content}
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
        </View>
        :
        <Text style={{color: Color.FONT1, width: '100%', textAlign: 'center'}}>Noch keine Chats vorhanden</Text>
      }
  
    </ScrollView>
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
    flexDirection: 'row',
    padding: 10
  },
  textBox: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'space-around',
    width: '100%'
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
  lastMessageTime: {
    color: Color.FONT3,
  },
  lastMessageAuthor: {
    marginLeft: 5,
    marginRight: 5,
    color: Color.FONT3,
  },
  lastMessageText: {
    marginRight: 8,
    color: Color.FONT1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50
  }
});

export default Chat;




// Funktinonsfähig

