import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, } from 'react-native';

class CreditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardnumber: "1234 5678 1234 5678"
        }
    }
    render() {
        let { changeNumber } = this.props
        return (
            <View style={styles.container2}>
                <TextInput
                    placeholder="ชื่อบนบัตร"
                    style={styles.input}
                />
                <TextInput
                    placeholder="หมายเลขบัตร"
                    onChangeText={(cardnumber) => this.setState({ cardnumber })}
                    style={styles.input}
                />
                <Text>{'user input: ' + this.state.cardnumber}</Text>
                <View style={styles.container3}>
                    <TextInput
                        placeholder="วันหมดอายุ"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="รหัสความปลอดภัย"
                        style={styles.input}
                    />
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container2: {
        padding: 30,
    },
    input: {
        height: 40,
        paddingHorizontal: 30,
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 20,
        fontFamily: "Kanit"
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


})

export default CreditForm;
