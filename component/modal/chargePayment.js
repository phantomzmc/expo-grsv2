import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Spinner, Icon, Text, Thumbnail } from "native-base";

class ChargePayment extends Component {
    state = {
        layout_success: true
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Icon name="check-circle" type="FontAwesome" style={{ color: "#558B2F", paddingHorizontal: 10 }} />
                    <Text style={{ fontSize: 18, fontFamily: "kanit", color: "#558B2F" }}>ชำระเงินสำเร็จ</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 30,
        borderRadius: 10

    },
    textButton: {
        color: '#fff',
        fontFamily: 'kanit'
    }
})

export default ChargePayment;