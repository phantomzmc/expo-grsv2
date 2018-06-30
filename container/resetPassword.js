import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Conatainer } from 'native-base'
import { connect } from 'react-redux'
import randomstringPromise from 'randomstring-promise';

import ResetPasswordForm from "../component/form/resetPasswordForm"

class ResetVerify extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            statusVerify: 0
        }
    }
    componentWillMount() {
        let { password } = this.state
        console.log("verfity")
        randomstringPromise(10)
            .then((password) => {
                this.setState({ password })
                // console.log(code);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
                console.log(password)
            });
    }
    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    sendResetPassword() {
        let { verifycode, statusVerify } = this.state
        // this.props.setVerify({ verifycode, statusVerify })
    }

    render() {
        return (
            <View style={styles.container}>
                <ResetPasswordForm sendNewCode={this.sendResetPassword.bind(this)}
                    goLogin={this.gotoLogin.bind(this)} />
                {/* <TouchableOpacity onPress={this.sendResetVerify.bind(this)}>
                    <Text>test</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}
const mapDisPatchToProps = (dispatch) => {
    return {
        setVerify: verify => {
            dispatch({
                type: "set",
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