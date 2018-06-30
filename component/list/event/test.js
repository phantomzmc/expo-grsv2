import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet } from 'react-native';

export default class componentName extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: "https://www.beautifullearth.com/wp-content/uploads/2017/10/123-6.jpg" }}
                    style={styles.imgbackground}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>name</Text>
                    <Text style={styles.distance}>distance</Text>
                    <Text style={styles.price}>price</Text>
                </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    imgbackground: {
        width: '100%',
        height: 150
    },
    textContainer : {
        flex: 1,
        backgroundColor : '#000',
        opacity: 0.5,
        justifyContent : 'center',
        alignItems: 'center',
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    distance: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '500',
    },
    price: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    listview: {
        padding: 10,
    },

})
