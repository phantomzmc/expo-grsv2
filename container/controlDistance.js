import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Button } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import Login from '../container/login'
import RegisterDistance from '../container/registerDistance'
import SummaryTotal from '../component/items/summary'
import HeaderTeam from '../component/items/headerTeam'

class ControlDistance extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนวิ่ง",
            pageNumber: 0,
            login: 1
        }
        this.goAddTeam = this.goAddTeam.bind(this)
    }

    goLogin = () => {
        console.log(this.state.login)
        this.props.setLogin(this.state.login)
        this.props.navigation.navigate("Login")
    }
    goNextState = () => {
        this.props.navigation.navigate('ShirtPhotoPlus')
    }
    goSingleLogin = () => {
        this.props.navigation.navigate('SingleLogin')
    }
    goAddTeam() {
        console.log("Team")
        Alert.alert("ลงทะเบียนแบบกลุ่ม", "การลงทะเบียนแบบกลุ่มจะต้องทำการเข้าสู่ระบบก่อน", [
            {
                text: "Cancel"
            },
            {
                text: "เข้าสู่ระบบ",
                onPress: () => this.goLogin()
            },
        ], { cancelable: false })

    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderTeam title={this.state.title}
                    goback={this.goSingleLogin.bind(this)} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Tabs
                    initialPage={this.state.pageNumber}
                    tabBarUnderlineStyle={{ backgroundColor: "#FC561F",height : 2 }}>
                    <Tab
                        heading={<TabHeading><Text style={styles.textLabel}>ลงทะเบียนแบบเดียว</Text></TabHeading>}>
                        <RegisterDistance nextState={this.goNextState.bind(this)} />
                    </Tab>
                    <Tab
                        heading={<TabHeading><Text style={styles.textLabel} onPress={() => this.goAddTeam()}>ลงทะเบียนแบบกลุ่ม</Text></TabHeading>}
                        >
                    </Tab>
                </Tabs>
                <SummaryTotal />
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (login) => {
            dispatch({
                type: "setLogin",
                payload: login
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textLabel: {
        color : '#FC561F',
        fontSize: 12,
        fontFamily: 'kanit',
    },
    button: {
        padding: 5,
        fontSize: 10,
        fontFamily: 'kanit',
        borderColor: '#FC561F',
        borderRadius: 5,
        borderWidth: 1,
        color: '#FC561F',
        backgroundColor: '#fff',
    },
})

export default connect(null, mapDispatchToProps)(ControlDistance);
