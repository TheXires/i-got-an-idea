import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View, Image, TextInput} from 'react-native'
import {ChatContext} from '../contexts/chatContext';
import {Color} from '../customTypes/colors';
import {Chat} from '../customTypes/chat';
import CustomSpinner from '../components/CustomSpinner';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import {Ionicons} from '@expo/vector-icons';
import {sendChatMessage} from '../services/database';

const ChatDetails = ({navigation, route}: {navigation: any, route: any}) => {
    const [user, loading, error] = useAuthState(firebase.auth());
    const {chats}: {chats: Chat[]} = useContext<any>(ChatContext);
    const [chat, setChat] = useState<Chat>();

    const [currentChatMessage, setCurrentChatMessage] = useState('');


    // useEffect(() => {
    //     console.log(chat);
        
    // }, [chat])

    useEffect(() => {
        if (chats.length > 0) {
            const chat = chats.find((chat) => chat.pinnedIdea.ideaID === route.params.id);
            if (chat != undefined) {
                setChat(chat);
            }
        }
    }, [chats])


    return (
        <View style={styles.container}>
            {chat != undefined ? (
                chat.messages.map(message => {
                    return (
                        <View key={message.id}>
                            <Text>{message.content}</Text>
                        </View>
                    )
                })
            ) : (
                    <CustomSpinner />
                )}

            <View style={styles.sendBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setCurrentChatMessage(text)}
                    onSubmitEditing={chatSubmit} value={currentChatMessage} />
                <Ionicons onPress={chatSubmit} name="ios-send" size={24} color={Color.ACCENT} />

            </View>


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

    function chatSubmit() {
        let msg;
        if (chat != undefined &&
            user != undefined) {
            if (user.displayName != undefined) {
                if (user.photoURL != undefined) {
                    msg = {
                        ideaID: chat.pinnedIdea.ideaID,
                        authorID: user.uid,
                        authorName: user.displayName,
                        authorProfilePictureURL: user.photoURL,
                        timestamp: firebase.firestore.Timestamp.now(),
                        content: currentChatMessage
                    }
                } else {
                    msg = {
                        ideaID: chat.pinnedIdea.ideaID,
                        authorID: user.uid,
                        authorName: user.displayName,
                        timestamp: firebase.firestore.Timestamp.now(),
                        content: currentChatMessage
                    }
                }
                sendChatMessage(msg);
                setCurrentChatMessage('');
            } else {
                alert('Failed to send message. No username specified! To send messages there must be a username set!')
            }
        } else {
            alert('Failed to send message: ' + JSON.stringify(chat) + ' and ' + JSON.stringify(user))
        }
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: Color.BACKGROUND,
        padding: 10
    },
    sendBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        padding: 10,
        marginRight: 15,
        height: 40,
        borderColor: Color.BACKGROUND3,
        borderWidth: 1,
        borderRadius: 20,
        color: Color.FONT2,
        display: 'flex'
    },
});

export default ChatDetails;