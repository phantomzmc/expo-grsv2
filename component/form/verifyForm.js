import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { Font } from "expo";
import { connect } from 'react-redux'
import axios from 'axios'



class FormVerifyCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: "",
            statusVerify: 1
        }
    }
    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
    }
    checkCodeVerify(code) {
        this.props.getVerify(code)
    }
    
    goResetVerify(){
        this.props.resetVerify()
    }

    render() {
        let { code, statusVerify } = this.state
        return (
            <View style={styles.cardView}>
                <Text style={styles.textTitle}>กรุณากรอก Code ที่ได้รับจาก Email ของท่านเพื่อทำการยืนยันตัวตน</Text>
                <View style={styles.containerForm}>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label>Verify Code</Label>
                            <Input
                                onChangeText={code => this.setState({ code })}
                            />
                        </Item>
                    </Form>
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.checkCodeVerify(code)}
                    >
                        <Text style={styles.textButton}>ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerNewCode}>
                    <TouchableOpacity onPress={() => this.goResetVerify()}>
                        <Text style={styles.textNewCode}>- ขอ VerifyCode ใหม่</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const styles = StyleSheet.create({
    cardView: {
        margin: 20,
        borderRadius: 15,
        backgroundColor: '#fff',
        // border : '10px solid'
    },
    textTitle: {
        padding: 20,
        fontFamily: 'kanit',
        fontSize: 16,
        textAlign: 'center'
    },
    containerForm: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formInput: {
        width: '70%',
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
        fontFamily: 'kanit'
    },
    containerNewCode: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20
    },
})

export default connect(mapStateToProps)(FormVerifyCode);