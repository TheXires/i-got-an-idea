import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/firestore'
import React, {createContext, useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Chat, ChatMessage} from '../customTypes/chat';
import {PinnedChat} from '../customTypes/profileData';
import {getUID} from '../services/auth';
import {chatMessageConverter, getProfileData} from '../services/database';

const fs = firebase.firestore();

export const ChatContext = createContext({});

/**
 * This context provides the children with an object containing all chats structured by the given interfaces.
 * This doesn't correspond 1:1 with the database structure
 */
const ChatProvider = (props: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [pinnedIdeas, setPinnedIdeas] = useState<PinnedChat[]>()//chats the user has pinned and therefore should be displayed
  const [localChats, setLocalChats] = useState<Chat[]>();//chats for saving local stored chat protocols, serves as base for normal chats
  const [chats, setChats] = useState<Chat[]>();//the actual chats object
  const [unsubs, setUnsubs] = useState<any[]>([]);//database listener unsub methods for preventing memory leaks

  //fetching the ideas the user has pinned
  useEffect(() => {
    if (user == undefined || loading) {
      return;
    }

    getProfileData(getUID()).onSnapshot(snap => {
      if (pinnedIdeas != snap.data()?.ideaChatsPinned) {
        setPinnedIdeas(snap.data()?.ideaChatsPinned);
      }
    });
  }, [user, loading])

  //prepearing the chats the user has pinned, adding locally saved messages
  useEffect(() => {
    const call = async () => {
      //iterate all pinned chats

      if (pinnedIdeas == undefined) {
        return;
      }

      let newLocalChats: Chat[] = [];

      await Promise.all(pinnedIdeas.map(async pinnedIdea => {
        const local = await fetchFromLocalStorage(pinnedIdea.ideaID);

        //check if local chat protocol exists
        if (local != undefined) {
          local.messages = local.messages.map(message => {
            message.timestamp = new firebase.firestore.Timestamp(message.timestamp.seconds, message.timestamp.nanoseconds);
            return message;
          })
          local.lastSyncedMessageTimestamp = new firebase.firestore.Timestamp(local.lastSyncedMessageTimestamp.seconds, local.lastSyncedMessageTimestamp.nanoseconds);
          newLocalChats.push(local);
        } else {
          const newChat: Chat = {
            pinnedIdea: pinnedIdea,
            messages: [],
            lastSyncedMessageTimestamp: new firebase.firestore.Timestamp(0, 0)
          }
          newLocalChats.push(newChat);
        }
      }))
      setLocalChats(newLocalChats);
    }
    call();
  }, [pinnedIdeas])

  //activating listeners according to all chats the user has pinned, depending on locally saved data
  useEffect(() => {
    if (localChats == undefined || pinnedIdeas == undefined || pinnedIdeas.length > localChats.length) {
      return;
    }
    setChats([...localChats]);
    
    localChats.forEach((localChat) => {
      const unsub = fs.collection('ideas').doc(localChat.pinnedIdea.ideaID).collection('chatmessages').
        orderBy('timestamp', 'asc').
        where('timestamp', '>', localChat.lastSyncedMessageTimestamp).
        withConverter(chatMessageConverter).
        onSnapshot(snap => {

          //no new docs loaded?
          if (snap.docs.length > 0) {
            let messages = snap.docs.map(s => s.data());
            const lastIndex = messages.findIndex(m => m.id == localChat.messages[localChat.messages.length - 1]?.id)

            if (lastIndex != -1) {
              messages = messages.slice(lastIndex + 1, messages.length)
            }
            localChat.messages = localChat.messages.concat(messages);
            localChat.lastSyncedMessageTimestamp = getTimestampOrDefault(messages);
            saveToLocalStorage(localChat);
            setChats([...localChats]);//destructuring to trigger change detection
          }
        })
      setUnsubs([...unsubs, unsub]);
    })
    return (() => {
      unsubs.forEach(unsubMethod => {
        unsubMethod();
      })
    })
  }, [localChats])


  return (
    <ChatContext.Provider value={{
      chats,
      chatAmount: pinnedIdeas?.length
    }}>
      {props.children}
    </ChatContext.Provider>
  )
}

/**
 * Gets the last recieved timestamp or now as default
 * 
 * @param messages the chats messages array
 */
function getTimestampOrDefault(messages: ChatMessage[]) {
  return messages[messages.length - 1] != undefined ? messages[messages.length - 1].timestamp : firebase.firestore.Timestamp.now();
}

async function fetchFromLocalStorage(ideaID: string): Promise<Chat | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem('chat_' + ideaID)
    let value = jsonValue != null ? JSON.parse(jsonValue) : null;
    return (value as Chat);
  } catch (e) {
    alert('Error while reading chat messages from local storage: ' + e);
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