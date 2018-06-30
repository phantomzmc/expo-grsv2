import React, { Component } from 'react'
import PropTypes from "prop-types"
import { StyleSheet, View, Text, TouchableOpacity, Alert, StatusBar } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'

import FormVerifyCode from '../component/form/verifyForm'
import HeaderTeam from '../component/items/headerTeam'
import req from '../config/uri_req'
import api_key from '../config/api_key'

class VerifyCode extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            title: "ยืนยันตัวตน",
            code: "",
            status: {}
        }
        this.alertVerify = this.alertVerify.bind(this)
    }


    getVerifyServer = (code) => {
        let uri = req[0].uspActivateAccount
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "ActivateCode", value: code },
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, status: response.data });
                console.log(this.state.status[0].Status)
                this.alertVerify()
            }).catch((error) => {
                console.error(error);
            });
    }

    sendDataVerify(verifycode, statusVerify) {
        this.setState({ code: verifycode })
        this.getVerifyServer()
        console.log({ verifycode, statusVerify })
        this.props.setVerify({ verifycode, statusVerify })
    }

    alertVerify() {
        let { status } = this.state
        if (status[0].Status == "0") {
            Alert.alert('รหัสไม่ตรงกัน', 'กรุณากรอกรหัสที่ได้รับทาง Email อย่างถูกต้อง', [
                { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
            ])
        }
        else if (status[0].Status == "1") {
            this.gotoLogin()
        }
        else {
            console.log("error")
        }
    }

    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    gotoResetVerify = () => {
        this.props.navigation.navigate("ResetVerify")
    }
    gotoBack = () => {
        this.props.navigation.navigate('UserHelpRegister')
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <FormVerifyCode
                    goLogin={this.gotoLogin.bind(this)}
                    sendData={this.sendDataVerify.bind(this)}
                    resetVerify={this.gotoResetVerify.bind(this)}
                    getVerify={this.getVerifyServer.bind(this)} />
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setVerify: verify => {
            dispatch({
                type: "setVerify",
                payload: verify
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {

    },
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode)