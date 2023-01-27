import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Load background image
const image = require('../assets/background-image.png');

export default function Start (props) {

    // Set hooks for name (text input) and background color (buttons) states
    const [myName, setMyName] = useState('');
    const [bgColor, setBgColor] = useState('#ECE5DD');

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
                        <Text style={styles.colorPickerHeading}>Choose a background color:</Text>
                        <View style={styles.colorPickerButtonsContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.colorPickerButton,
                                    styles.colorPickerButton1,
                                    bgColor === '#121212' ? styles.pressed : {}
                                ]}
                                onPress={() => setBgColor('#121212')}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.colorPickerButton,
                                    styles.colorPickerButton2,
                                    bgColor === '#474056' ? styles.pressed : {}
                                ]}
                                onPress={() => setBgColor('#474056')}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.colorPickerButton,
                                    styles.colorPickerButton3,
                                    bgColor === '#8A95A5' ? styles.pressed : {}
                                ]}
                                onPress={() => setBgColor('#8A95A5')}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.colorPickerButton,
                                    styles.colorPickerButton4,
                                    bgColor === '#128C7E' ? styles.pressed : {}
                                ]}
                                onPress={() => setBgColor('#128C7E')}
                            />
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
        flex: 0.34,
        fontSize: 45,
        fontWeight: '600',
        color: '#fff'
    },
    optionsContainer: {
        flex: 0.44,
        flexGrow: 0.5,
        width: '88%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
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
        paddingVertical: 6,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
    },
    colorPickerButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    colorPickerButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    colorPickerButton1: {
        backgroundColor: '#121212',
    },
    colorPickerButton2: {
        backgroundColor: '#474056',
    },
    colorPickerButton3: {
        backgroundColor: '#8A95A5',
    },
    colorPickerButton4: {
        backgroundColor: '#128C7E',
    },
    pressed: {
        height: 44,
        width: 44,
        borderRadius: 22,
        borderWidth: 4,
        borderColor: 'lightslategrey',
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