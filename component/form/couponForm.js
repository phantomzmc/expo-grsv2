import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Container, Form, Item, Label, Input } from "native-base";
import { connect } from 'react-redux'
import axios from 'axios'
import req from '../../config/uri_req'
import api_key from '../../config/api_key'
import HeaderTeam from "../items/headerTeam";



class CouponForm extends Component {
    constructor(state) {
        super(state)
        this.state = {
            title: "คูปองส่วนลด",
            coupon: "",
            status: [],
            discountType: "",
            price: "",
            button: true,
            button2: false
        }
        this.checkPromoCode = this.checkPromoCode.bind(this)
        this.checkOutput = this.checkOutput.bind(this)
        this.gotoAddress = this.gotoAddress.bind(this)
    }
    gotoAddress() {
        this.props.navigation.navigate('AddressLayout')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ShirtPhotoPlus')
    }
    checkPromoCode() {
        let uri = req[0].uspApplyPromoCode
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "EventID", value: this.props.event.event.EventID },
                { name: "PromoCode", value: this.state.coupon },
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID }
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
                console.log(this.state.status)
                this.checkOutput()
            }).catch((error) => {
                console.error(error);
            });
    }
    changeStatus = () => {
        if (this.state.coupon != "")
            this.setState({ button2: true, button: false })
        else if (this.state.coupon == "") {
            this.setState({ button: true, button2: false })
        }
    }
    checkType() {
        let { status } = this.state
        if (status[0].PromoDiscountType == "1") {
            const totalRegister = (this.props.event.totalPrice - status[0].PromoDiscount)
            const value_dis = (this.props.event.totalPrice - totalRegister)
            this.props.setTotalRegister(totalRegister)
            this.props.setTotalPromo(totalRegister)
            this.props.setDisPrice(value_dis)
        }
        else if (status[0].PromoDiscountType == "2") {
            const totalRegister = (this.props.event.totalPrice / status[0].PromoDiscount)
            const value_dis = (this.props.event.totalPrice - totalRegister)
            this.props.setTotalRegister(totalRegister)
            this.props.setTotalPromo(totalRegister)
            this.props.setDisPrice(value_dis)
        }
    }
    checkOutput() {
        let { status } = this.state
        if (status[0].PromoStatus == "1") {
            this.checkType()
            this.gotoAddress()
        }
        else if (status[0].PromoStatus == "0") {
            Alert.alert("รหัสส่วนลดนี้ถูกใช้งานเเล้ว")
        }
        else if (status[0].PromoStatus == "0" && this.props.event.event.PromoCodeRequired == "0") {
            Alert.alert("ส่วนลดค่าสมัคร", "รหัสนี้ไม่ถูกต้องหรือถูกใช้ไปแล้ว", [
                {
                    text: "ลองอีกครั้ง",
                },
                {
                    text: "ข้ามการกรอกรหัส",
                    onPress: () => this.props.navigation.navigate('AddressLayout')
                },
            ])
        }
    }
    render() {
        return (
            <Container>
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
                    <Image source={{ uri: "http://shutterrunning2014.com/wp-content/uploads/2018/01/For-web-2014.png" }}
                        style={styles.imgEvent} />
                    <Text style={styles.textNameEvent}>
                        {this.props.event.event.EventName}
                    </Text>
                    <Text style={styles.detailDiscountCoupon}>
                        ส่วนลดค่าสมัครรายการวิ่ง {this.state.price} {this.state.discountType}
                    </Text>
                    <View style={{ width: '70%' }}>
                        <Form>
                            <Item floatingLabel last>
                                <Label style={styles.textLabel}>รหัสคูปอง</Label>
                                <Input
                                    onChangeText={(coupon) => this.setState({ coupon })}
                                    onEndEditing={() => this.changeStatus()} />
                            </Item>
                        </Form>
                    </View>
                    {this.state.button &&
                        <TouchableOpacity style={styles.submitButtonDefalt}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>}
                    {this.state.button2 &&
                        <TouchableOpacity style={styles.submitButton}
                            onPress={() => this.checkPromoCode()}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>
                    }

                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        userprofile: state.userprofile,
        token : state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setDisPrice: (disPrice) => {
            dispatch({
                type: 'setDisPrice',
                payload: disPrice
            })
        },
        setTotalPromo : (totalPromo) => {
            dispatch({
                type : 'setTotalPromo',
                payload : totalPromo
            })
        },
        setTotalRegister : (totalRegister) => {
            dispatch({
                type : 'setTotalRegister',
                payload : totalRegister
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    imgEvent: {
        marginTop: 20,
        width: '80%',
        height: '30%',
        borderRadius: 10,
    },
    textNameEvent: {
        fontSize: 20,
        margin: 20,
        fontFamily: 'kanit'
    },
    detailDiscountCoupon: {
        fontSize: 18,
        color: '#8A8A8F',
        fontFamily: 'kanit'
    },
    inputCoupon: {
        height: 50,
        width: '50%',
        borderColor: '#FC561F',
        borderWidth: 1.5,
        borderRadius: 20,
        margin: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        fontFamily: 'kanit'
    },
    submitButtonDefalt: {
        margin: 30,
        height: 50,
        width: '75%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC561F',
        alignItems: 'center',
        borderRadius: 20,
        opacity: 0.5
    },
    submitButton: {
        margin: 30,
        height: 50,
        width: '75%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC561F',
        alignItems: 'center',
        borderRadius: 20,
    },

    textButton: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'kanit'
    },
    textLabel: {
        fontSize: 18,
        fontFamily: 'kanit'
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CouponForm)
