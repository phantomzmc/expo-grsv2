import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from "react-native";
import { Font } from "expo";
import { Button, Icon, Text, Thumbnail, H1 } from "native-base";


class ErrorModalAddFriend extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
    }

    render() {
        return (
            <View style={styles.modalContainer}>
                <Icon name="ios-information-circle-outline" style={{ color: "red" }} />
                <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    <H1 style={{ color: "red", fontFamily: 'kanit' }}>ไม่พบผู้ใช้งาน</H1>
                    <Text style={{ fontSize: 16, fontFamily: 'kanit' }}>ยังไม่มีผู้ใช้งานที่ค้นหา ต้องการสมัครหรือไม่</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                    <Button iconLeft rounded light onPress={this.props.toggleModal} style={{ marginHorizontal: 10, justifyContent: "center" }}>
                        <Icon name="ios-close-outline" />
                        <Text style={{ fontFamily: 'kanit' }}>ปิด</Text>
                    </Button>
                    <Button iconLeft rounded success style={{ marginHorizontal: 10, justifyContent: "center" }} onPress={this.props.goRegister}>
                        <Icon name="ios-add-outline" style={{ color: "#fff" }} />
                        <Text style={styles.textButton}>สมัครสมาชิก</Text>
                    </Button>
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
export default ErrorModalAddFriend;