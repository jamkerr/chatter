import React from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='Type your name'
                >
                </TextInput>
                <Button
                    title="Start Chatting"
                    onPress={() => this.props.navigation.navigate('Chat')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});