import React, {useEffect} from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Chat (props) {

    // Get name an background color via props passes from start screen
    let { myName, bgColor } = props.route.params;

    useEffect(() => {
        // Set title
        props.navigation.setOptions({ title: myName });
    }, [])

    return (
        // Set styles inline
        <View style={{flex: 1, backgroundColor: bgColor }}>
            <Text>Ello.</Text>
        </View>
    )
}
