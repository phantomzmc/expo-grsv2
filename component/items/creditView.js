import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label, Icon, Card } from 'native-base'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import Omise from 'omise-react-native';
import ChargePaymentLoad from '../modal/chargePayment_load'
import ChargePayment from '../modal/chargePayment'
import ChargePaymentError from '../modal/chargePayment_error'
const ibit_pkey = 'pkey_test_5b7nut5dlzyudruopsl'
const ibit_skey = 'skey_test_5b7nwwrac7mvps7l3mp'
const test_pkey = 'pkey_test_5ccy7tzubo9t8d0i71o'
const test_skey = 'skey_test_5ccy7tzukutfwjoi8p3'
Omise.config(test_pkey, test_skey, '2015-11-17');

class CreditView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameCredit: "",
            numberCredit: "1234 5678 1234 5678",
            expCredit: "02",
            yearCredit: "20",
            cvcCredit: "XXX",
            statusPayment: false,
            modalLoad: false,
            modalSuccess: false,
            modalFaild: false
        }
        this.genTokenCredit = this.genTokenCredit.bind(this)
    }

    async genTokenCredit(nameCredit, numberCredit, expCredit,yearCredit, cvcCredit) {
        const data = await Omise.createToken({
            'card': {
                'name': nameCredit,
                'number': numberCredit,
                'expiration_month': parseInt(expCredit),
                'expiration_year': parseInt(yearCredit),
                'security_code': parseInt(cvcCredit)
            }
        });
        console.log(data)
        // this.openModal()
        this.getCharges(data.id)
    }
    async getCharges(tokenId) {
        const totalRegis = Number(this.props.event.totalRegister * 100)
        this.setState({
            amount: String(totalRegis)
        })
        const data = await Omise.createSource({
            'type': 'internet_banking_bbl',
            'amount': this.state.amount,
            'currency': 'thb',
            'capture': true,
            'card': tokenId

        });
        console.log(data)
        // const charges = await Omise.createCharge({
        //     amount: this.state.amount, // 1,000 Baht
        //     currency: 'thb',
        //     capture: true,
        //     card: tokenId
        // })
        // this.openModal()
        this.checkPaymentModal(data)
        this.props.setCharge(data)
    }
    openModal = () => {
        this.setState({ modalLoad: !this.state.modalLoad })
    }
    checkPaymentModal = (charges) => {
        if (charges.status == "successful") {
            this.setState({ modalSuccess: !this.state.modalSuccess })
            setTimeout(() => {
                this.props.goAddress()
                this.setState({ modalSuccess: !this.state.modalSuccess })
            }, 3000);
            console.log("successful")
        }
        else if (charges.status == "failed") {
            this.setState({ modalFaild: !this.state.modalFaild })
            setTimeout(() => {
                this.setState({ modalFaild: !this.state.modalFaild })
            }, 3000);
            console.log("failed")
        }
    }
    putDataCredit = (nameCredit, numberCredit, expCredit,yearCredit, cvcCredit) => {
        this.genTokenCredit(nameCredit, numberCredit, expCredit,yearCredit, cvcCredit)
        this.props.setCredit({ nameCredit: nameCredit, numberCredit, expCredit,yearCredit, cvcCredit })
        this.props.setStatusPayment(this.state.statusPayment)
    }
    render() {
        let { nameCredit, numberCredit, expCredit,yearCredit, cvcCredit } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.creditCard}>
                    <View style={styles.cardNumber}>
                        <Text style={styles.textCardNumber}>card number</Text>
                        <Text style={styles.textNumber}>{numberCredit}</Text>
                    </View>
                    <View style={styles.expcvcView}>
                        <View style={styles.EXPView}>
                            <Text style={styles.textExpiration}>Expiration</Text>
                            <Text style={styles.monthyear}>{expCredit}/{yearCredit}</Text>
                        </View>
                        <View style={styles.CVCView}>
                            <Text style={styles.cvc}>CVC</Text>
                            <Text style={styles.passcvc}>{cvcCredit}</Text>
                        </View>
                        <View>
                            <Image
                                source={{
                                    uri: "http://www.pngall.com/wp-content/uploads/2016/07/Mastercard-PNG-Clipart.png"
                                }}
                                style={{
                                    width: 100,
                                    height: 50,
                                    paddingHorizontal: 30
                                }} />
                        </View>
                    </View>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textForm}>กรอกข้อมูล</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.headForm}>ชื่อบนบัตร</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
                            <Input
                                onChangeText={(nameCredit) => this.setState({ nameCredit })}
                            />
                        </Item>
                    </Form>
                    <Text style={styles.headForm}>หมายเลขบัตร</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.1234 4567 8901 8764</Label>
                            <Input
                                onChangeText={(numberCredit) => this.setState({ numberCredit })}
                            />
                        </Item>
                    </Form>
                    <Text style={styles.headForm}>วันหมดอายุ</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>เดือน</Label>
                            <Input
                                onChangeText={(expCredit) => this.setState({ expCredit })}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>ปี</Label>
                            <Input
                                onChangeText={(yearCredit) => this.setState({ yearCredit })}
                            />
                        </Item>
                    </Form>

                    <Text style={styles.headForm}>รหัสความปลอดภัย</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.123</Label>
                            <Input
                                onChangeText={(cvcCredit) => this.setState({ cvcCredit })}
                            />
                        </Item>
                    </Form>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textForm}>คำรับรองของผู้สมัคร</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Card>
                        <Text style={styles.textDetail}>   ข้าพเจ้าขอรับรองว่าข้อความข้างต้นเป็นความจริงและได้ทำการฝึกซ้อม ทั้งมีสุขภาพสมบูรณ์พร้อมที่จะมีการแข่งขันในประเภทที่สมัครข้างต้นด้วยความเต็มใจ และจะไม่เรียกร้องค่าเสียหายใดๆหากเกิดอันตรายหรือบาดเจ็บทั้งก่อนและหลังการแข่งขันอีกทั้งก่อนและหลังการแข่งขัน อีกทั้งยินดีที่จะแสดงหลักฐานพิสุจน์ตัวเองต่อคณะผู้จัดการแข่งขัน
                                และถือว่าการบันทึกภาพยนต์ดังกล่าวเป็นลิขสิทธิ์ของคณะกรรมการจัดการแข่งขันครั้งนี้
                        </Text>
                        <Text style={styles.textDetail}>
                            การยืนยันการสมัครผ่านระบบออนไลน์นี้ถือว่าท่านได้ให้การยอมรับข้อความข้างต้นแทนการเซ็นชื่อ
                        </Text>
                    </Card>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textForm}>สงวนสิทธิ์การเปลี่ยนแปลง</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Card>
                        <Text style={styles.textDetail}>*** หลังจากยืนยันการชำระค่าสมัครแล้ว ไม่สามารถยกเลิกหรือเปลี่ยนแปลงข้อมูลการสมัครใดๆในทุกกรณี ***
                        </Text>

                    </Card>
                </View>
                <Modal isVisible={this.state.modalSuccess}>
                    <ChargePayment />
                </Modal>
                <Modal isVisible={this.state.modalLoad}>
                    <ChargePaymentLoad />
                </Modal>

                <Modal isVisible={this.state.modalFaild}>
                    <ChargePaymentError />
                </Modal>

                <View style={styles.submitContainer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.putDataCredit(nameCredit, numberCredit, expCredit,yearCredit, cvcCredit)}>
                        <Text style={styles.textButton}> ยืนยันและชำระค่าบริการ </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        event: state.event
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setCredit: (nameCredit) => {
            dispatch({
                type: 'setCredit',
                payload: nameCredit
            })
        },
        setStatusPayment: (statusPayment) => {
            dispatch({
                type: 'setStatusPayment',
                payload: statusPayment
            })
        },
        setCharge: (charges) => {
            dispatch({
                type: 'setCharge',
                payload: charges
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    creditCard: {
        backgroundColor: '#4E2A82',
        margin: 20,
        borderRadius: 20,
        height: 150
    },
    cardNumber: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 30
    },
    textCardNumber: {
        color: '#fff',
        fontSize: 7
    },
    textNumber: {
        color: '#fff',
        fontSize: 15
    },
    expcvcView: {
        flex: 1,
        paddingLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textExpiration: {
        color: '#fff',
        fontSize: 7
    },
    monthyear: {
        color: '#fff',
        fontSize: 15
    },
    CVCView: {
        paddingLeft: 30
    },
    cvc: {
        color: '#fff',
        fontSize: 7
    },
    passcvc: {
        color: '#fff',
        fontSize: 15
    },
    container2: {
        padding: 30
    },
    input: {
        height: 40,
        paddingHorizontal: 30,
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 20,
        fontFamily: "Kanit"
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerForm: {
        flex: 1
    },
    textForm: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
        fontFamily: "Kanit"
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: "Kanit"
    },
    showDetail: {
        alignItems: 'center'
    },
    buttonContainer2: {
        height: 40,
        width: '80%',
        borderColor: '#FC561F',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textButton2: {
        fontWeight: '500',
        fontSize: 15,
        color: '#FC561F',
        fontFamily: "Kanit"
    },
    headForm: {
        fontFamily: 'kanit',
        fontSize: 16,
        paddingTop: 20
    },
    textLabel: {
        fontSize: 14,
        fontFamily: 'kanit'
    },
    textDetail: {
        fontFamily: 'kanit',
        padding: 15

    }
})

export default connect(mapStateToProps, mapDispatchtoProps)(CreditView);
