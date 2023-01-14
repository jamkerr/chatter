import React, {useEffect} from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Chat (props) {

    let { myName, bgColor } = props.route.params;

    useEffect(() => {
        props.navigation.setOptions({ title: myName });
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: bgColor }}>
            <Text>Ello.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});