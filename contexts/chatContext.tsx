import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/firestore'
import React, {createContext, useEffect, useState} from 'react';
import {Chat, ChatMessage} from '../customTypes/chat';
import {getUID} from '../services/auth';
import {chatMessageConverter, getProfileData} from '../services/database';

const fs = firebase.firestore();

export const ChatContext = createContext({});

const ChatProvider = (props: any) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [unsubs, setUnsubs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      (await getChats())?.forEach(async pinnedIdeaID => {
        const local = await fetchFromLocalStorage(pinnedIdeaID);

        if (local !== undefined) {
          setChats([...chats, local]);
        }

        if (local != undefined) {
          setUnsubs([...unsubs, fs.collection('ideas').doc(pinnedIdeaID).collection('chatmessages').
            orderBy('timestamp', 'asc').
            startAfter(local.lastSyncedMessageSnapshot).
            withConverter(chatMessageConverter).onSnapshot(snap => {
              const newChatArray = chats.slice();
              const chatIndex = newChatArray.findIndex(c => c.ideaID == pinnedIdeaID);
              if (chatIndex == -1) throw 'Chat Index must not be -1!';

              newChatArray[chatIndex].lastSyncedMessageSnapshot = snap;
              newChatArray[chatIndex].messages = snap.docs.map(s => s.data());
              setChats(newChatArray);
            })])
        } else {
          setUnsubs([...unsubs, fs.collection('ideas').doc(pinnedIdeaID).collection('chatmessages').
            orderBy('timestamp', 'asc').
            withConverter(chatMessageConverter).onSnapshot(snap => {
              const newChatArray = chats.slice();
              const chatIndex = newChatArray.findIndex(c => c.ideaID == pinnedIdeaID);

              if (chatIndex != -1) {
                newChatArray[chatIndex].lastSyncedMessageSnapshot = snap;
                newChatArray[chatIndex].messages = snap.docs.map(s => s.data());
                setChats(newChatArray);
              } else {
                newChatArray.push({
                  ideaID: pinnedIdeaID,
                  lastSyncedMessageSnapshot: snap,
                  messages: snap.docs.map(s => s.data())
                })
                setChats(newChatArray);
              };
            })])
        }
      })
    })
    return (() => {
      unsubs.forEach(unsubMethod => {
        unsubMethod();
      })
      chats.forEach(chat => {
        saveToLocalStorage(chat);
      })
    })
  }, [])


  return (
    <ChatContext.Provider value={{
      chats
    }}>
      {props.children}
    </ChatContext.Provider>
  )
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
  try {
    const jsonValue = JSON.stringify(chat)
    await AsyncStorage.setItem('chat_' + chat.ideaID, jsonValue)
  } catch (e) {
    alert('Error while writing chat messages to local storage: ' + e);
  }
}

/**
 * Gets a list of idea ids the user is chatting in
 */
async function getChats() {
  return (await getProfileData(getUID()).get()).data()?.ideaChatsPinned;
}

export default ChatProvider;