import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import { map } from 'mobx';

class ResetVerifyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            email: ""
        }
    }
    componentWillMount() {
        console.log(this.props.profile.profile.userid)
        console.log(this.props.profile.profile.email)
    }
    checkResetVerify(userid, email) {
        if (this.state.userid === this.props.profile.profile.userid && this.state.email === this.props.profile.profile.email) {
            this.props.sendNewCode()
            this.alertSuccess()
        }
        else if (this.state.userid !== this.props.profile.profile.userid) {
            this.alertUserIDError()
        }
        else if (this.state.email !== this.props.profile.profile.email) {
            this.alertEmailError()
        }
        else if (this.state.userid !== this.props.profile.profile.userid && this.state.email === this.props.profile.profile.email) {
            this.alertAllError()
        }
    }
    alertSuccess() {
        Alert.alert('ร้องขอรหัสสำเร็จ', 'กรุณาตรวจสอบ Email ของท่าน', [
            { text: 'ยืนยัน', onPress: () => this.props.goLogin() },
        ])
    }
    alertUserIDError() {
        Alert.alert('รหัสประชาชนไม่ถูกต้อง', 'กรุณากรอกรหัสประชาชนให้ถูกต้อง', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }
    alertEmailError() {
        Alert.alert('Email ไม่ถูกต้อง', 'กรุณากรอก Email ให้ถูกต้อง', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }
    alertAllError() {
        Alert.alert('รหัสประชาชนเเละEmail ไม่ถูกต้อง', 'กรุณากรอกรหัสประชาชนเเละ Email ให้ถูกต้อง', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }

    render() {
        let { userid, email } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>กรอกรหัสบัตรประชาชนเเละ Email เพื่อทำการร้องขอรหัสการยืนยันตัวตนใหม่</Text>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}>รหัสประจำตัวประชาชน</Label>
                            <Input
                                onChangeText={userid => this.setState({ userid })}
                            />
                        </Item>
                    </Form>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}>Email</Label>
                            <Input
                                onChangeText={email => this.setState({ email })}
                            />
                        </Item>
                    </Form>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.checkResetVerify(userid, email)}
                        >
                            <Text style={styles.textButton}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10
    },
    content: {
        padding: 20
    },
    textTitle: {
        fontFamily: 'kanit',
        fontSize: 16,
        textAlign : 'center'
    },
    textLabel: {
        fontFamily: 'kanit'
    },
    submitContainer: {
        marginTop: 30,
        alignItems: "center",
        marginBottom: 30,
        marginHorizontal: 20
    },
    buttonContainer: {
        height: 40,
        width: "100%",
        backgroundColor: "#FC561F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    textButton: {
        fontWeight: "700",
        fontSize: 16,
        color: "#fff",
        fontFamily: "kanit"
    },
})

export default connect(mapStateToProps)(ResetVerifyForm)