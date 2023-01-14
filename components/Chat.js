import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Chat(props) {
    return (
        <View style={styles.container}>
            <Text>Ello.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});