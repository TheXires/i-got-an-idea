import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/firestore'
import React, {createContext, useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Chat} from '../customTypes/chat';
import {getUID} from '../services/auth';
import {chatMessageConverter, getProfileData} from '../services/database';

const fs = firebase.firestore();

export const ChatContext = createContext({});

// AsyncStorage.clear();

const ChatProvider = (props: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [chats, setChats] = useState<Chat[]>([]);
  const [unsubs, setUnsubs] = useState<any[]>([]);

  const [saveUpdates, setSaveUpdates] = useState(0);

  useEffect(() => {
    console.log('saveUpdates: ', saveUpdates);
  }, [saveUpdates])

  useEffect(() => {
    if (user == undefined || user == null || loading) {
      return;
    }

    const call = async () => {
      (await getChats())?.forEach(async pinnedIdeaID => {
        const local = await fetchFromLocalStorage(pinnedIdeaID);

        if (local != undefined) {
          setChats([...chats, local]);

          setUnsubs([...unsubs, fs.collection('ideas').doc(pinnedIdeaID).collection('chatmessages').
            orderBy('timestamp', 'desc').
            where('timestamp', '>', local.lastSyncedMessageTimestamp).
            withConverter(chatMessageConverter).onSnapshot(snap => {

              if (snap.docs.length == 0) return; //initial but no new docs loaded

              const newChatArray = chats.slice();
              const chatIndex = newChatArray.findIndex(c => c.ideaID == pinnedIdeaID);

              if (chatIndex == -1) throw 'Chat Index must not be -1!';

              const messages = snap.docs.map(s => s.data());
              newChatArray[chatIndex].messages = messages;
              newChatArray[chatIndex].lastSyncedMessageTimestamp = messages[messages.length - 1] != undefined ? messages[messages.length - 1].timestamp :
              firebase.firestore.Timestamp.now();
              setChats(newChatArray);
              saveToLocalStorage(newChatArray[chatIndex]);
              setSaveUpdates(saveUpdates + 1);
            })])
        } else {
          setUnsubs([...unsubs, fs.collection('ideas').doc(pinnedIdeaID).collection('chatmessages').
            orderBy('timestamp', 'asc').
            withConverter(chatMessageConverter).onSnapshot(snap => {
              const newChatArray = chats.slice();
              const chatIndex = newChatArray.findIndex(c => c.ideaID == pinnedIdeaID);

              if (chatIndex != -1) {
                const messages = snap.docs.map(s => s.data());
                newChatArray[chatIndex].messages = messages;
                newChatArray[chatIndex].lastSyncedMessageTimestamp = messages[messages.length - 1] != undefined ? messages[messages.length - 1].timestamp :
                firebase.firestore.Timestamp.now();
                setChats(newChatArray);
                saveToLocalStorage(newChatArray[chatIndex]);
                setSaveUpdates(saveUpdates + 1);
              } else {
                const messages = snap.docs.map(s => s.data());
                const lastSyncedMessageTimestamp = messages[messages.length - 1] != undefined ? messages[messages.length - 1].timestamp :
                  firebase.firestore.Timestamp.now();
                const obj = {
                  ideaID: pinnedIdeaID,
                  lastSyncedMessageTimestamp,
                  messages
                };
                newChatArray.push(obj)
                setChats(newChatArray);
                saveToLocalStorage(obj);
                setSaveUpdates(saveUpdates + 1);
              };
            })])
        }
      })
    }
    call();
    return (() => {
      unsubs.forEach(unsubMethod => {
        unsubMethod();
      })
    })
  }, [user, loading])


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
  console.log('writing: ', chat);

  if (chat != null && chat != undefined) {
    try {
      const jsonValue = JSON.stringify(chat)
      await AsyncStorage.setItem('chat_' + chat.ideaID, jsonValue)
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