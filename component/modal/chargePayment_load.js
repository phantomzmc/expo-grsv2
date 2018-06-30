import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Spinner, Icon, Text, Thumbnail } from "native-base";
import { Font } from 'expo'

class ChargePaymentLoad extends Component {
    state = {
        layout_loading: true,
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                {this.state.layout_loading &&
                    <View>
                        <Spinner />
                        <View style={{ paddingVertical: 10, alignItems: "center" }}>
                            <Text style={{ fontSize: 18, fontFamily: 'kanit' }}>ระบบกำลังทำการตรวจสอบ</Text>
                        </View>
                    </View>
                }
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

export default ChargePaymentLoad;