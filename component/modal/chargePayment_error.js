import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Spinner, Icon, Text, Thumbnail } from "native-base";

class ChargePaymentError extends Component {
    state = {
        layout_failed: true
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Icon name="error" type="MaterialIcons" style={{ color: "#F44336", paddingHorizontal: 10 }} />
                    <Text style={{ fontSize: 18, fontFamily: "kanit", color: "#F44336" }}>ชำระเงินไม่สำเร็จ</Text>
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

export default ChargePaymentError;