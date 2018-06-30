import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text,StatusBar } from 'react-native'
import { Conatainer } from 'native-base'
import { connect } from 'react-redux'
import randomstringPromise from 'randomstring-promise';

import ResetVerifyForm from "../component/form/resetVerifyForm"
import HeaderTeam from '../component/items/headerTeam'

class ResetVerify extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            title: "ขอรหัสยืนยันตัวตนใหม่",
            verifycode: "",
            statusVerify: 0
        }
    }
    componentWillMount() {
        let { verifycode } = this.state
        console.log("verfity")
        randomstringPromise(10)
            .then((verifycode) => {
                this.setState({ verifycode })
                // console.log(code);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
                console.log(verifycode)
            });
    }
    gotoLogin = () => {
        this.props.navigation.navigate("Verify")
    }
    sendResetVerify() {
        let { verifycode, statusVerify } = this.state
        this.props.setVerify({ verifycode, statusVerify })
    }
    gotoBack = () => {
        this.props.navigation.navigate('Verify')
    }

    render() {
        return (
            <View>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <View style={styles.container}>
                    <ResetVerifyForm sendNewCode={this.sendResetVerify.bind(this)}
                        goLogin={this.gotoLogin.bind(this)} />
                    {/* <TouchableOpacity onPress={this.sendResetVerify.bind(this)}>
                    <Text>test</Text>
                </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}
const mapDisPatchToProps = (dispatch) => {
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
        padding: 20
    }
})

export default connect(null, mapDisPatchToProps)(ResetVerify);