import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/firestore'
import React, {createContext, useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Chat, ChatMessage} from '../customTypes/chat';
import {PinnedChat} from '../customTypes/profileData';
import {getUID} from '../services/auth';
import {chatMessageConverter, getProfileData} from '../services/database';
// import {createIdeaFaker} from '../services/database';

const fs = firebase.firestore();

// AsyncStorage.clear();

export const ChatContext = createContext({});

const ChatProvider = (props: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [pinnedIdeas, setPinnedIdeas] = useState<PinnedChat[]>()
  const [dummyChats, setDummyChats] = useState<Chat[]>();//chats for saving local stored chat protocols, serves as base for normal chats
  const [chats, setChats] = useState<Chat[]>();
  const [unsubs, setUnsubs] = useState<any[]>([]);

  //for creating fake data
  // useEffect(() => {
  //   setInterval(() => {
  //     createIdeaFaker();
  //   }, 1000)
  // }, [])


  useEffect(() => {
    if (user == undefined || loading) {
      return;
    }

    getProfileData(getUID()).onSnapshot(snap => {
      if (pinnedIdeas !== snap.data()?.ideaChatsPinned) {
        setPinnedIdeas(snap.data()?.ideaChatsPinned);
      }
    });
  }, [user, loading])

  useEffect(() => {
    const call = async () => {
      //iterate all pinned chats

      if (pinnedIdeas == undefined) {
        return;
      }

      pinnedIdeas.forEach(async pinnedIdea => {
        const local = await fetchFromLocalStorage(pinnedIdea.ideaID);

        //check if local chat protocol exists
        if (local != undefined) {
          local.messages = local.messages.map(message => {
            message.timestamp = new firebase.firestore.Timestamp(message.timestamp.seconds, message.timestamp.nanoseconds);
            return message;
          })
          local.lastSyncedMessageTimestamp = new firebase.firestore.Timestamp(local.lastSyncedMessageTimestamp.seconds, local.lastSyncedMessageTimestamp.nanoseconds);
          setDummyChats((old) => {
            if (old != undefined) {
              return [...old, local]
            } else {
              return [local]
            }
          });
        } else {
          const newChat: Chat = {
            pinnedIdea: pinnedIdea,
            messages: [],
            lastSyncedMessageTimestamp: new firebase.firestore.Timestamp(0, 0)
          }
          setDummyChats((old) => {
            if (old != undefined) {
              return [...old, newChat]
            } else {
              return [newChat]
            }
          });
        }
      });
    }
    call();
  }, [pinnedIdeas])

  useEffect(() => {
    if (dummyChats == undefined || pinnedIdeas == undefined || pinnedIdeas.length > dummyChats.length) {
      return;
    }
    dummyChats.forEach((dummyChat) => {
      const unsub = fs.collection('ideas').doc(dummyChat.pinnedIdea.ideaID).collection('chatmessages').
        orderBy('timestamp', 'asc').
        where('timestamp', '>', dummyChat.lastSyncedMessageTimestamp).
        withConverter(chatMessageConverter).
        onSnapshot(snap => {

          //no new docs loaded?
          if (snap.docs.length == 0) {
            if (chats == undefined) {
              setChats([...dummyChats]);//TODO: Eigene Effects für initial und update
            }
            return
          };
          
          let messages = snap.docs.map(s => s.data());
          const lastIndex = messages.findIndex(m => m.id == dummyChat.messages[dummyChat.messages.length - 1]?.id)
          
          if (lastIndex != -1) {
            messages = messages.slice(lastIndex + 1, messages.length)
          }
          dummyChat.messages = dummyChat.messages.concat(messages);
          dummyChat.lastSyncedMessageTimestamp = getTimestampOrDefault(messages);
          saveToLocalStorage(dummyChat);
          setChats([...dummyChats]);//destructuring to trigger change detection
        })
      setUnsubs([...unsubs, unsub]);
    })
    return (() => {
      unsubs.forEach(unsubMethod => {
        unsubMethod();
      })
    })
  }, [dummyChats])


  return (
    <ChatContext.Provider value={{
      chats
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

export default ChatProvider;