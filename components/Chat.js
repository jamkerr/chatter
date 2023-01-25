import React, {useCallback, useEffect, useState} from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import firestore from 'firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

export default function Chat (props) {

    // Get name and background color via props passes from start screen
    let { myName, bgColor } = props.route.params;

    // Set initial state
    const [messages, setMessages] = useState([]);
    const [loggingInText, setLoggingInText] = useState('We\'re just signing you in');
    const [user, setUser] = useState({
        _id: '',
        name: '',
        avatar: '',
    });
    const isOnline = useNetInfo().isConnected;

    // Firebase config
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

    // On send, add new message to older messages so that it's displayed, and add message to firestore
    const onSend = useCallback((message) => {
        setMessages((olderMessages) => GiftedChat.append(olderMessages, message));
        const messageObj = message[0];
        addMessage(messageObj);
    }, []);

    // Function to add message to firestore
    const addMessage = (message) => {
        referenceMessages.add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            user: message.user,
            userid: message.user._id,
        });
    }

    // When the firestore collection changes, reset the message state
    const onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar || '',
                },
                userid: data.user._id,
            });
        });
        setMessages(messages);
    }

    // Function to get messages from async storage and set them to state
    const getMessages = async () => {
        try { 
            let messages = await AsyncStorage.getItem('messages') || [];
            return JSON.parse(messages);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to save messages to async storage
    const saveMessages = async (messages) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messages));
        } catch (error) {
            console.log(error);
        }
    }

    // Function to delete all messages from async storage and state
    const deleteMessages = async () => {
        try {
            await AsyncStorage.removeItem('messages');
            setMessages({
                messages: []
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Function to save user to async storage
    const saveUser = async (user) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    }

    // Function to get user from async storage and set them to state
    const getUser = async () => {
        try { 
            let user = await AsyncStorage.getItem('user') || {};
            return JSON.parse(user);
        } catch (error) {
            console.log(error);
        }
    }

    // Save messages to async storage when state of messages changes
    useEffect(() => {
        if (messages.length) {
            saveMessages(messages);
        }
    }, [messages])

    // Save user to async storage when state of user changes
    useEffect(() => {
        if (user._id) {
            saveUser(user);
        }
    }, [user])

    useEffect(() => {
        //Mounting

        // Set title
        props.navigation.setOptions({ title: myName });
        
        if (isOnline) {
            // Listen for user changes
            const authUnsubscribe = firebase.auth().onAuthStateChanged(async (authuser) => {

                // If no user, try to sign in
                if (!authuser) {
                    await firebase.auth().signInAnonymously();
                }
            
                // Update user state with currently active user data
                setUser({
                    _id: authuser.uid,
                    name: myName,
                    avatar: "https://placeimg.com/140/140/any"
                });

                // Clear logging in text when user is signed in
                setLoggingInText('');

            });

            // Listen for message changes
            const unsubscribe = referenceMessages.orderBy('createdAt', 'desc').onSnapshot(onCollectionUpdate);

            // Unmounting
            return () => {
                // Stop listening for message changes
                unsubscribe();
                // Stope listening for user changes
                authUnsubscribe();
            };

        } else {
            setLoggingInText('Looks like you\'re offline.');
            getUser().then((userObj) => setUser(userObj));           
            getMessages().then((messagesObj) => setMessages(messagesObj));
        }

    }, [isOnline])

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

    // Input toolbar only shows when online
    const renderInputToolbar = (props) => {
        if (!isOnline) {
            return null;
        } else {
            return <InputToolbar {...props} />;
        }
    }

    return (
        // Set style inline
        <View style={{flex: 1, backgroundColor: bgColor }}>
            <Text>{loggingInText}</Text>
            <GiftedChat
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={user}
                showUserAvatar={true}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
        </View>
    )
}
