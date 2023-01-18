import React, {useCallback, useEffect, useState} from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default function Chat (props) {

    // Get name and background color via props passes from start screen
    let { myName, bgColor } = props.route.params;

    const [messages, setMessages] = useState([]);

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
