import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View, TextInput} from 'react-native'
import {ChatContext} from '../contexts/chatContext';
import {Color} from '../customTypes/colors';
import {Chat} from '../customTypes/chat';
import CustomSpinner from '../components/CustomSpinner';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import {Ionicons} from '@expo/vector-icons';
import {sendChatMessage} from '../services/database';
import {ScrollView} from 'react-native-gesture-handler';

const ChatDetails = ({navigation, route}: {navigation: any, route: any}) => {
    const [user, loading, error] = useAuthState(firebase.auth());
    const {chats}: {chats: Chat[]} = useContext<any>(ChatContext);
    const [chat, setChat] = useState<Chat>();

    const [currentChatMessage, setCurrentChatMessage] = useState('');



    useEffect(() => {
        if (chats.length > 0) {
            const chat = chats.find((chat) => chat.pinnedIdea.ideaID === route.params.id);
            if (chat != undefined) {
                setChat(chat);//TODO: Blocked user filtern
            }
        }
    }, [chats])


    return (//TODO: Chat Senden Leiste nach unten sticken
        <View style={{height: '100%'}}>
            <ScrollView
                style={styles.container}
                ref={ref => {this.scrollView = ref}}
                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
            >
                {chat != undefined ?
                    chat.messages.length > 0 ?
                        chat.messages.map(message => {
                            return (
                                <View key={message.id}>
                                    {message.authorID == user?.uid ?
                                        <Text style={styles.ownMessage}>{message.content}</Text>
                                        :
                                        <View style={styles.foreignMessage}>
                                            {/* <Text>{JSON.stringify(message)}</Text> */}
                                            <Text style={styles.authorName}>{message.authorName}</Text>
                                            <Text>{message.content}</Text>
                                        </View>
                                    }
                                </View>
                            )
                        }) :
                        <Text style={{color: Color.FONT1, width: '100%', textAlign: 'center'}}>Noch keine Nachrichten vorhanden</Text>
                    :
                    <CustomSpinner />
                }
            </ScrollView>
            <View style={styles.sendBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setCurrentChatMessage(text)}
                    onSubmitEditing={chatSubmit} value={currentChatMessage}
                    placeholder="Neue Nachricht schreiben..."
                    placeholderTextColor={Color.FONT3}
                />
                <Ionicons onPress={chatSubmit} name="ios-send" size={24} color={Color.ACCENT} />

            </View>
        </View>
    )

    function chatSubmit() {
        let msg;
        if (currentChatMessage != null && currentChatMessage != '') {
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

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: Color.BACKGROUND,
        padding: 10
    },
    sendBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        // position: 'absolute',
        // bottom: 0
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
        display: 'flex',

    },
    foreignMessage: {
        backgroundColor: Color.BACKGROUND3,
        color: Color.FONT1,
        paddingLeft: 13,
        paddingBottom: 13,
        paddingRight: 13,
        paddingTop: 4,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: 20,
        marginRight: 80
    },
    authorName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Color.FONT2
    },
    ownMessage: {
        backgroundColor: Color.BACKGROUND2,
        color: Color.FONT1,
        padding: 10,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: 20,
        marginLeft: 80
    }
});

export default ChatDetails;