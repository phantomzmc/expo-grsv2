import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button, ScrollableTab } from 'native-base';
import { connect } from 'react-redux'
import CreditPayment from '../../container/creditPayment'
import TotalRegister from '../../component/items/totalRegister'
import SummaryTotal from '../items/summary'
import HeaderTeam from '../items/headerTeam'
import axios from 'axios'
import req from '../../config/uri_req'
import api_key from '../../config/api_key'

class ButtonChangePayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ชำระด้วยบัตรเครดิต/เดบิต",
            pageNumber: 0
        }
    }
    addRegister() {
        let uri = req[0].uspAddRegister
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                {
                    name: "RunnerID",
                    value: 1
                },
                {
                    name: "PaymentType",
                    value: 1
                },
                {
                    name: "PaymentStatus",
                    value: 2
                },
                {
                    name: "PaymentSlip",
                    value: ""
                },
                {
                    name: "IPAddress",
                    value: "192.168.1.51"
                },
                {
                    name: "Longitude",
                    value: -122.406417
                },
                {
                    name: "Latitude",
                    value: 37.785834
                },
                {
                    name: "TransactionID",
                    value: "aSdFgHjKl"
                },
                {
                    name: "ChargesID",
                    value: "aSdFgHjKl"
                },
                {
                    name: "NumberOfRunner",
                    value: 1
                },
                {
                    name: "PlaceItemID",
                    value: 1
                },
                {
                    name: "BillingInfo",
                    value: "{\"FirstName\":\"" + this.state.test + "\",\"LastName\":\"Chomchalao\",\"Address\":\"11/11\",\"SubDistric\":\"Bangkok\",\"Distric\":\"Bangkok\",\"Province\":\"Bangkok\",\"PostCode\":\"1000\",\"Country\":\"Thailand\",\"Phone\":\"081-234-5678\",\"Notes\":\"Notes\"}"
                },
                {
                    name: "RegisterList",
                    value: "[{\"RunnerID\":\"1\",\"CourseID\":\"1\",\"JerseySize\":\"L\",\"PhotoPlusService\":\"0\",\"PromoCode\":\"\",\"CoursePrice\":\"100\"}]"
                },
                {
                    name: "TeamName",
                    value: "GuuRun"
                },
                {
                    name: "EventID",
                    value: 4
                },
                {
                    name: "TotalPostPrice",
                    value: 1000
                },
                {
                    name: "CreditFee",
                    value: 10
                },
                {
                    name: "TotalDiscount",
                    value: 0
                },
                {
                    name: "TotalAll",
                    value: 1010
                }
            ]

        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token,
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({ isLoading: false, item: responseJson.data, pleace: responseJson.data[0].PlaceItemName });
                console.log(responseJson.data[0].PlaceItemName)

            }).catch((error) => {
            });
    }
    gotoShowDetail = () => {
        this.props.navigation.navigate('TotalRegister')
    }
    gotoTotalPayment = () => {
        this.props.navigation.navigate('TotalPayment')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ControlPayment')
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)} />
                <Tabs initialPage={this.state.pageNumber}>
                    <Tab heading={<TabHeading><Icon name="card" /><Text style={styles.textLabel}> ชำระผ่านบัตรเครดิต/เดบิต</Text></TabHeading>}>
                        <CreditPayment
                            showDetail={this.gotoShowDetail.bind(this)}
                            totalPayment={this.gotoTotalPayment.bind(this)} />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="list" /><Text style={styles.textLabel}> เเสดงค่าสมัครทั้งหมด</Text></TabHeading>}>
                        <TotalRegister />
                    </Tab>
                </Tabs>
                <SummaryTotal />
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        event: state.event
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalRegister: (total) => {
            dispatch({
                type: "setTotalRegister",
                payload: total
            })
        },
        setCreditPrice: (credit) => {
            dispatch({
                type: "setCreditPrice",
                payload: credit
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textLabel: {
        fontSize: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonChangePayment);
