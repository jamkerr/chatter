import React, {useEffect} from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';

// export function OldChat (props) {

//     // Get name an background color via props passes from start screen
//     let { myName, bgColor } = props.route.params;

//     useEffect(() => {
//         // Set title
//         props.navigation.setOptions({ title: myName });
//     }, [])

//     return (
//         // Set styles inline
//         <View style={{flex: 1, backgroundColor: bgColor }}>
//             <Text>Ello.</Text>
//         </View>
//     )
// }

export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }
    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    }
                }
            ]
        })
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
