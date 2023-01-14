import React, { useState } from "react";
import { StyleSheet, View, Button, Text, TextInput, ImageBackground, Pressable } from "react-native";

const image = require('../assets/background-image.png');

export default function Start (props) {

    const [myName, setMyName] = useState('');
    const [bgColor, setBgColor] = useState('#fff');

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Chatter</Text>
                <View style={styles.optionsContainer}>
                    <TextInput
                        onChangeText={(myName) => setMyName(myName)}
                        value={myName}
                        placeholder='Type your name'
                        style={styles.nameInput}
                    ></TextInput>
                    <View style={styles.colorPicker}>
                        <Text style={styles.colorPickerHeading}>Choose Background Color:</Text>
                        <View style={styles.colorPickerButtonsContainer}>
                            <Pressable
                                style={[styles.colorPickerButton, styles.colorPickerButton1]}
                                onPress={() => setBgColor('#090C08')}
                                value={bgColor}
                            ></Pressable>
                            <Pressable
                                style={[styles.colorPickerButton, styles.colorPickerButton2]}
                                onPress={() => setBgColor('#474056')}
                                value={bgColor}
                            ></Pressable>
                            <Pressable
                                style={[styles.colorPickerButton, styles.colorPickerButton3]}
                                onPress={() => setBgColor('#8A95A5')}
                                value={bgColor}
                            ></Pressable>
                            <Pressable
                                style={[styles.colorPickerButton, styles.colorPickerButton4]}
                                onPress={() => setBgColor('#B9C6AE')}
                                value={bgColor}
                            ></Pressable>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => props.navigation.navigate('Chat', {myName: myName, bgColor: bgColor})}
                        style={styles.chatButton}
                    >
                        <Text
                            style={styles.chatButtonText}
                        >Start Chatting</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 0.44,
        flexShrink: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#fff'
    },
    optionsContainer: {
        flex: 0.44,
        width: '88%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },
    nameInput: {
        height: 60,
        width: '88%',
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        padding: 8,
    },
    colorPicker: {
        paddingVertical: 5,
        width: '88%',
    },
    colorPickerHeading: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
    },
    colorPickerButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    colorPickerButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    colorPickerButton1: {
        backgroundColor: '#090C08',
    },
    colorPickerButton2: {
        backgroundColor: '#474056',
    },
    colorPickerButton3: {
        backgroundColor: '#8A95A5',
    },
    colorPickerButton4: {
        backgroundColor: '#B9C6AE',
    },
    chatButton: {
        height: 60,
        width: '88%',
        backgroundColor: '#757083',
        alignItems: 'center',
        justifyContent: 'center',

    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});