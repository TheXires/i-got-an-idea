import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/firestore'
import React, {createContext, useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Chat, ChatMessage} from '../customTypes/chat';
import {getUID} from '../services/auth';
import {chatMessageConverter, getProfileData} from '../services/database';
// import {createIdeaFaker} from '../services/database';

const fs = firebase.firestore();

// AsyncStorage.clear();

export const ChatContext = createContext({});

const ChatProvider = (props: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [chats, setChats] = useState<any[]>(['test']);
  const [unsubs, setUnsubs] = useState<any[]>([]);

  //for creating fake data
  // useEffect(() => {
  //   setInterval(() => {
  //     createIdeaFaker();
  //     console.log('faked');
  //   }, 1000)
  // }, [])
  useEffect(() => {
    if (user == undefined || loading) {
      return;
    }

    const call = async () => {
      //iterate all pinned chats
      (await getChats())?.forEach(async pinnedIdea => {
        const local = await fetchFromLocalStorage(pinnedIdea.ideaID);

        //check if local chat protocol exists
        if (local != undefined) {
          // setChats([...chats, local]);
          setChats((old) => {
            console.log(old);
            return [...old, 'hi'];
          });
          setTimeout(() => {
            console.log('chats: ' + JSON.stringify(chats));
          }, 1000);

          // setUnsubs([...unsubs, fs.collection('ideas').doc(pinnedIdea.ideaID).collection('chatmessages').
          //   orderBy('timestamp', 'desc').
          //   where('timestamp', '>', local.lastSyncedMessageTimestamp).
          //   withConverter(chatMessageConverter).onSnapshot(snap => {

          //     //no new docs loaded?
          //     if (snap.docs.length == 0) return;

          //     const newChatArray = chats!.slice();
          //     const chatIndex = newChatArray.findIndex(c => c.pinnedIdea.ideaID == pinnedIdea.ideaID);

          //     if (chatIndex == -1) throw 'Chat Index must not be -1!';

          //     const messages = snap.docs.map(s => s.data());
          //     newChatArray[chatIndex].messages = messages;
          //     newChatArray[chatIndex].lastSyncedMessageTimestamp = getTimestampOrDefault(messages);
          //     // setChats(newChatArray);
          //     saveToLocalStorage(newChatArray[chatIndex]);
          //   })])
        } else {
          // setUnsubs([...unsubs, fs.collection('ideas').doc(pinnedIdea.ideaID).collection('chatmessages').
          //   orderBy('timestamp', 'asc').
          //   withConverter(chatMessageConverter).onSnapshot(snap => {
          //     const newChatArray = chats!.slice();
          //     const chatIndex = newChatArray.findIndex(c => c.pinnedIdea.ideaID == pinnedIdea.ideaID);

          //     if (chatIndex != -1) {
          //       const messages = snap.docs.map(s => s.data());
          //       newChatArray[chatIndex].messages = messages;
          //       newChatArray[chatIndex].lastSyncedMessageTimestamp = getTimestampOrDefault(messages);
          //       // setChats(newChatArray);
          //       saveToLocalStorage(newChatArray[chatIndex]);
          //     } else {
          //       const messages = snap.docs.map(s => s.data());
          //       const lastSyncedMessageTimestamp = getTimestampOrDefault(messages);
          //       const obj = {
          //         pinnedIdea,
          //         lastSyncedMessageTimestamp,
          //         messages
          //       };
          //       // setChats((old) => [...old, obj]);
          //       saveToLocalStorage(obj);
          //     };
          //   })])
        }
      })
    }
    call();
    return (() => {
      unsubs.forEach(unsubMethod => {
        // unsubMethod();
      })
    })
  }, [user, loading])


  return (
    <ChatContext.Provider value={{
      // chats
    }}>
      {props.children}
    </ChatContext.Provider>
  )
}

function getTimestampOrDefault(messages: ChatMessage[]) {
  return messages[messages.length - 1] != undefined ? messages[messages.length - 1].timestamp : firebase.firestore.Timestamp.now();
}

async function fetchFromLocalStorage(ideaID: string): Promise<Chat | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem('chat_' + ideaID)
    let value = jsonValue != null ? JSON.parse(jsonValue) : null;
    return (value as Chat);
  } catch (e) {
    alert('Error while reading chat messages from local storage: ' + e);//TODO: wenn leer wahrscheinlich auch error
  }
}

async function saveToLocalStorage(chat: Chat) {
  if (chat != null && chat != undefined) {
    try {
      const jsonValue = JSON.stringify(chat)
      await AsyncStorage.setItem('chat_' + chat.pinnedIdea.ideaID, jsonValue)
    } catch (e) {
      alert('Error while writing chat messages to local storage: ' + e);
    }
  }
}

/**
 * Gets a list of idea ids the user is chatting in
 */
async function getChats() {
  return (await getProfileData(getUID()).get()).data()?.ideaChatsPinned;
}

export default ChatProvider;