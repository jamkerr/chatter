import React from "react";
import { StyleSheet, View, Button, Text, TextInput, ImageBackground, Pressable } from "react-native";

const image = require('../assets/background-image.png');
export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <Text style={styles.title}>Chatter</Text>
                    <View style={styles.optionsContainer}>
                        <TextInput
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            placeholder='Type your name'
                            style={styles.nameInput}
                        >
                        </TextInput>
                        <View style={styles.colorPicker}>
                            <Text style={styles.colorPickerHeading}>Choose Background Color:</Text>
                            <View style={styles.colorPickerButtonsContainer}>
                                <Pressable style={[styles.colorPickerButton, styles.colorPickerButton1]}></Pressable>
                                <Pressable style={[styles.colorPickerButton, styles.colorPickerButton2]}></Pressable>
                                <Pressable style={[styles.colorPickerButton, styles.colorPickerButton3]}></Pressable>
                                <Pressable style={[styles.colorPickerButton, styles.colorPickerButton4]}></Pressable>
                            </View>
                        </View>
                        <Pressable
                            onPress={() => this.props.navigation.navigate('Chat')}
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
        flex: 0.56,
        flexShrink: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#fff'
    },
    optionsContainer: {
        flex: 0.44,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 8,
    },
    nameInput: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        padding: 8,
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