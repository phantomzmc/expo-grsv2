import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

class ButtonSubmit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "ถัดไป"
        }
    }

    render() {
        let { text } = this.state
        return (
            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={this.props.PhotoPlus}>
                    <Text style={styles.textButton}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 100,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',
    }
})
export default ButtonSubmit;
