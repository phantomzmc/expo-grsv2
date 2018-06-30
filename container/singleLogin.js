import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';
import { Font } from 'expo'
import { connect } from 'react-redux'
import axios from 'axios'
import api from '../config/api_key'
import req from '../config/uri_req'

class SingleLogin extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            status: [],
        }
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../assets/fonts/Kanit-Light.ttf'),
        });
    }
    checkLoginSever() {
        let { status, username } = this.state
        let uri = req[0].uspCheckUsername
        let data = ({
            params: {
                value: username,
            }
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api[0].api_key,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, status: response.data });
                console.log(this.state.status)
                console.log(this.state.status[0].UsernameStatus)
                this.checkLogin()
            }).catch((error) => {
                console.error(error);
            });
    }
    checkLogin() {
        if (this.state.status[0].UsernameStatus == "2") {
            this.props.setUsername(this.state.username)
            this.gotoListEvent()
        }
        else if (this.state.username == "Admin") {
            this.gotoListEvent()
        }
        else {
            Alert.alert('ยังไม่มีข้อมูลผู้ใช้งาน', 'กรุณาลงทะเบียนเพื่อเข้าใช้งาน', [
                {
                    text: 'Cancel'
                }, {
                    text: 'สมัครสมาชิก',
                    onPress: () => this.gotoRegister()
                }
            ], { cancelable: false })
        }

    }
    gotoListEvent = () => {
        this.props.navigation.navigate('ControlDistance')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
    }
    gotoVerify = () => {
        this.props.navigation.navigate('Vefify')
    }
    render() {
        return (
            <ImageBackground
                source={{
                    uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg"
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 1
                }}>
                <View style={styles.container}>
                    <Text style={styles.textTitle} onPress={this.gotoListEvent}>
                        ShutterRuning Service
                    </Text>
                </View>
                <View style={styles.formcontainer}>
                    <TextInput
                        placeholder="เลขบัตรประชาชน"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput}
                        onChangeText={(username) => this.setState({ username })}
                        style={styles.input} />
                    <View style={styles.loginContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this
                                .checkLoginSever
                                .bind(this)}>
                            <Text style={styles.textButton}>เข้าร่วมกิจกรรม</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this
                            .gotoRegister
                            .bind(this)}>
                        <Text style={styles.regisButton}>
                            สมัครสมาชิก
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    textTitle: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '700',
        fontFamily: 'kanit'
    },
    formcontainer: {
        flex: 2,
        padding: 20,
        borderRadius: 15
    },
    regisButton: {
        padding: 20,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'kanit'

    },
    input: {
        fontFamily: 'kanit',
        height: 40,
        backgroundColor: '#fff',
        opacity: 0.8,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    loginContainer: {
        margin: 20,
        alignItems: 'center'
    },
    buttonContainer: {
        height: 40,
        width: '75%',
        backgroundColor: '#4CD946',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        fontFamily: 'kanit'

    }
})

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (username) => {
            dispatch({
                type: "setUsername",
                payload: username
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleLogin)
