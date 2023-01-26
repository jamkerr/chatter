import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';

export default function CustomActions (props) {

    const { showActionSheetWithOptions } = useActionSheet();

    // Function to open action options menu
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                case 0:
                    console.log('user wants to pick an image');
                    return pickImage();
                case 1:
                    console.log('user wants to take a photo');
                    return takePhoto();
                case 2:
                    console.log('user wants to get their location');
                    return getLocation();
                default:
                }
            },
        );
    };

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     
        if(status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
            }).catch(error => console.log(error));
        
            if (!result.canceled) {
                const imageUri = await uploadImageFetch(result.assets[0].uri);
                props.onSend({ image: imageUri });
            }
        }
    }

    const takePhoto = async () => {

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
     
        if(status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
            }).catch(error => console.log(error));
        
            if (!result.canceled) {
                const imageUri = await uploadImageFetch(result.assets[0].uri);
                props.onSend({ image: imageUri }); 
            }
        }
    }

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if(status === 'granted') {
            let result = await Location.getCurrentPositionAsync({});
        
            if (result) {
                props.onSend({
                    location: {
                        latitude: result.coords.latitude,
                        longitude: result.coords.longitude,
                    }
                });
            }
        }
    }

    const uploadImageFetch = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (error) {
                console.log(error);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const imageNameBefore = uri.split('/');
        const imageName = imageNameBefore[imageNameBefore.length -1];

        const ref = firebase.storage().ref().child(`images/${imageName}`);

        const snapshot = await ref.put(blob);

        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    return (
        <TouchableOpacity style={[styles.container]} onPress={onActionPress}>
            <View style={[styles.wrapper]}>
                <Text style={[styles.iconText]}>+</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 13,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});