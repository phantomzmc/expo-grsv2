import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { captureScreen } from "react-native-view-shot";
import { Font } from "expo";
import Modal from "react-native-modal";
import axios from 'axios'
import req from '../config/uri_req'
import api_key from '../config/api_key'
import TotalRegister from '../component/items/totalRegister'
import DetailRegister from '../component/items/detailRegister'
import HeaderTeam from '../component/items/headerTeam'
import CrargeLoading from '../component/modal/chargePayment_load'
import ChargePaymentLoad from '../component/modal/chargePayment_load';

class TotalLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "สรุปการสมัครทั้งหมด",
            name: "hello test",
            event: {
                name: "",
                date: ""
            },
            imageURI: "",
            layout_invoice: false,
            modalLoading: true
        }
    }
    componentWillMount() {
        this.setState({ modalLoading: true })
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../assets/fonts/Kanit-Light.ttf'),
        });
        this.addRegister()
        setTimeout(() => {
            if (this.state.modalLoading == true) {
                this.setState({ modalLoading: false, layout_invoice: true })
            }
        }, 2000)
    }
    addRegister() {
        let { userprofile, network, choiceSend, event, creditcard, address } = this.props
        let uri = req[0].uspAddRegister
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "RunnerID", value: userprofile.userprofile.RunnerID },
                { name: "PaymentType", value: 1 },
                { name: "PaymentStatus", value: 2 },
                { name: "PaymentSlip", value: "" },
                { name: "IPAddress", value: network.ip },
                { name: "Longitude", value: network.long },
                { name: "Latitude", value: network.lat },
                { name: "TransactionID", value: "aSdFgHjKl" },
                { name: "ChargesID", value: creditcard.charge.id },
                { name: "NumberOfRunner", value: 1 },
                { name: "PlaceItemID", value: choiceSend.choiceSend.placeItemID },
                { name: "BillingInfo", value: "{\"FirstName\":\"" + address.user.fullname + "\",\"LastName\":\"" + address.user.lastname + "\",\"Address\":\"" + address.user.adress + "\",\"SubDistric\":\"" + address.user.subdistric + "\",\"Distric\":\"" + address.user.distric + "\",\"Province\":\"" + address.user.province + "\",\"PostCode\":\"" + address.user.postcode + "\",\"Country\":\"Thailand\",\"Phone\":\"" + address.user.tel + "\",\"Notes\":\"" + address.user.note + "\"}" },
                { name: "RegisterList", value: "[{\"RunnerID\":\"" + userprofile.userprofile.RunnerID + "\",\"CourseID\":\"" + event.distanceEvent.id + "\",\"JerseySize\":\"L\",\"PhotoPlusService\":\"" + event.distanceEvent.statusPhotoPlus + "\",\"PromoCode\":\"\",\"CoursePrice\":\"" + event.distanceEvent.price + "\"},]" },
                { name: "TeamName", value: userprofile.userprofile.TeamName },
                { name: "EventID", value: event.event.EventID },
                { name: "TotalPostPrice", value: choiceSend.priceCDO },
                { name: "CreditFee", value: creditcard.vat },
                { name: "TotalDiscount", value: 0 },
                { name: "TotalAll", value: event.totalRegister }
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
                this.setState({ isLoading: false, output: response.data });
                this.props.setInvoice(this.state.output)
            }).catch((error) => {
                console.error(error);
            });
    }
    onClick = () => {
        console.log(this.state.event)
        console.log(this.props.event.name)
        console.log(this.props.event.date)
        Alert.alert('เรียบร้อย', 'ทำการรายการเสร็จสิ้น', [
            {
                text: 'ตกลง',
                onPress: () => this.gotoListEvent()
            }
        ], { cancelable: false })
        // this.props.addEvent(this.state.name)
    }
    gotoListEvent = () => {
        this.props.navigation.navigate('EventList')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ButtonChangePayment')
    }

    captureScreenFunction = () => {
        captureScreen({
            format: "jpg",
            quality: 0.8
        })
            .then(
                uri => this.setState({ imageURI: uri }),
                Alert.alert('บันทึกสำเร็จ', 'ทำการบันทึกรายการเสร็จสิ้น', [
                    {
                        text: 'ตกลง',
                        onPress: () => this.gotoListEvent()
                    }
                ], { cancelable: false }),
                error => console.error("Oops, Something Went Wrong", error)
            );

    }

    render() {
        return (
            <Container>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Modal isVisible={this.state.modalLoading}>
                    <ChargePaymentLoad />
                </Modal>
                <ScrollView>
                    {this.state.layout_invoice &&
                        <View style={styles.container}>
                            <DetailRegister />
                            <TotalRegister />
                            <View style={styles.submitContainer}>
                                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={this.captureScreenFunction.bind(this)}>
                                    <Text style={styles.textButton}>บันทึก</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={this.onClick.bind(this)}>
                                    <Text style={styles.textButton}>ปิด</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF4F1',
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 30

    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'kanit'
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
    },

})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        shirtphoto: state.shirtphoto,
        choiceSend: state.choiceSend,
        address: state.address,
        network: state.network,
        shirtphoto: state.shirtphoto,
        creditcard: state.creditcard,
        token: state.token,
        userprofile: state.userprofile
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setInvoice: (invoice)=> {
            dispatch({
                type : 'setInvoice',
                payload : invoice
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TotalLayout);
