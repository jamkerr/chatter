import React, {useCallback, useEffect, useState} from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import firestore from 'firebase';

export default function Chat (props) {

    // Get name and background color via props passes from start screen
    let { myName, bgColor } = props.route.params;

    const [messages, setMessages] = useState([]);
    // const [loggingInText, setLoggingInText] = useState('We\'re just signing you in');
    // const [user, setUser] = useState({});

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

    const addMessage = (message) => {
        referenceMessages.add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user
        });
    }

    const onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
        setMessages(messages);
    }


    useEffect(() => {
        // Set title
        props.navigation.setOptions({ title: myName });

        const unsubscribe = referenceMessages.orderBy('createdAt', 'desc').onSnapshot(onCollectionUpdate);
        // const authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {

        //     // If no user, try to sign in
        //     if (!user) {
        //         await firebase.auth().signInAnonymously();
        //     }
          
        //     // Update user state with currently active user data
        //     setUser({
        //         uid: user.uid,
        //         name: myName,
        //     });
      
        //     setLoggingInText(`Hey ${user.name}!`);
      
        //     // create a reference to the active user's messages
        //     const referenceMessagesUser = referenceMessages.where("uid", "==", user.uid);
      
        //     // listen for collection changes for current user
        //     const unsubscribeMessagesUser = referenceMessagesUser.onSnapshot(onCollectionUpdate);
        // });

        // Unmounting
        return () => {
            unsubscribe();
            // authUnsubscribe();
        };

    }, [])

    // On send, add new message to older messages so that it's displayed
    const onSend = useCallback((messages) => {
        setMessages((olderMessages) => GiftedChat.append(olderMessages, messages));
        const message = messages[0];
        addMessage(message);
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
            {/* <Text>{loggingInText}</Text> */}
            <GiftedChat
                renderBubble={renderBubble}
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                    name: myName
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
        </View>
    )
}
