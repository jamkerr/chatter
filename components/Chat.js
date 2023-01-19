import React, {useCallback, useEffect, useState} from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import firestore from 'firebase';

export default function Chat (props) {

    // Get name and background color via props passes from start screen
    let { myName, bgColor } = props.route.params;

    const [messages, setMessages] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyDwbpwCk6AIuYhyML0LcTDltFuy2W0a90k",
        authDomain: "chatter-web-app-150d5.firebaseapp.com",
        projectId: "chatter-web-app-150d5",
        storageBucket: "chatter-web-app-150d5.appspot.com",
        messagingSenderId: "360208476019",
        appId: "1:360208476019:web:74e2ca3410912d405a8706",
        measurementId: "G-FRVJJJ8TNQ"
    };
    
    // Initialize Firebase
    if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore();
    const referenceMessages = db.collection('messages');

    useEffect(() => {
        // Set title
        props.navigation.setOptions({ title: myName });
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                }
            },
            {
                _id: 2,
                text: `${myName} has entered the chat.`,
                createdAt: new Date(),
                system: true,
            },
        ])
    }, [])

    const onSend = useCallback((messages) => {
        setMessages((olderMessages) => GiftedChat.append(olderMessages, messages));
    }, []);

    // Customize chat bubbles
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#fcf'
                    },
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }

    return (
        // Set style inline
        <View style={{flex: 1, backgroundColor: bgColor }}>
            <GiftedChat
                renderBubble={renderBubble}
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
        </View>
    )
}
