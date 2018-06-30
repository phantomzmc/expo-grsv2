import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, AlertIOS, StatusBar } from 'react-native';
import CheckBox from 'react-native-checkbox-heaven';
import { Container, Icon, Text, Tab, Tabs, TabHeading, Card, CardItem, Body, Content } from 'native-base';
import { Font } from "expo";
import AddressForm from '../component/form/addressForm'
import GetPleace from '../component/items/getPlece'
import SummaryTotal from '../component/items/summary'
import HeaderTeam from "../component/items/headerTeam";
import { connect } from 'react-redux'
import axios from 'axios'
import req from '../config/uri_req'
import api_key from '../config/api_key'


class AddressLayout extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "การจัดส่ง",
            choice: 0,
            dataChoice: "",
            user: {
                fullname: "",
                email: "",
                adress: "",
                tel: ""
            },
            modalVisible: false,
            active: true,
            pageNumber: 0,
            checked: true,
            checked2: false,
            checkSubmit: false,
            statusButton: true,
            statusButton2: false,
            pleace: "",
            postPrice: "",
        }
    }
    componentWillMount = () => {
        this.setState({
            priceEvent: parseFloat(this.props.event.totalPrice),
            priceCDO: parseFloat(60.0)
        })
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../assets/fonts/Kanit-Light.ttf'),
        });
        this.getPleaceItem()
    }
    getPleaceItem() {
        let uri = req[0].uspGetPlaceItemLists
        let apikey = api_key[0].api_key
        let data = ({
            params: {
                value: this.props.event.event.EventID,
            }
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    item: responseJson.data,
                    pleace: responseJson.data[0].PlaceItemName,
                    postPrice: responseJson.data[1].PlaceItemName
                });
                console.log(responseJson.data)
            }).catch((error) => {
            });
    }
    nextToPayment = () => {
        // this.getChoice()
        this.props.navigation.navigate('ControlPayment')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ShirtPhotoPlus')
    }
    goTotalPayment = (fullname, lastname, email, adress, subdistric, distric, province, postcode, tel, note) => {
        this.nextToPayment()
        this.props.setUser({ fullname: fullname, lastname, email, adress, subdistric, distric, province, postcode, tel, note })
    }

    getSumPleace = () => {
        this.setState({
            checked: true,
            checked2: false
        })
        this.props.setSendChoice({ choice: 0, dataChoice: "รับเอง", priceCDO: parseFloat(0.0), placeItemID: 1, detail: this.state.pleace })
        this.props.setTotalRegister(this.state.priceEvent)
        this.props.setTotal(this.state.priceEvent)
    }
    getSumPostman = () => {
        this.setState({
            checked: false,
            checked2: true
        })
        this.props.setSendChoice({ choice: 1, dataChoice: "ส่งไปรษณีย์", priceCDO: parseFloat(65.0), placeItemID: 0, detail: this.state.postPrice })
        this.totalPriceRegis()
    }
    totalPriceRegis = () => {
        let { priceEvent, priceCDO } = this.state
        const sum = priceCDO + priceEvent
        this.props.setTotalRegister(sum)
        // this.props.setTotal(sum)
    }
    handleOnChange() {
        this.setState({
            checkSubmit: !this.state.checkSubmit,
            statusButton: !this.state.statusButton,
            statusButton2: !this.state.statusButton2
        })
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
                    goback={this.gotoBack.bind(this)}
                />
                <ScrollView >
                    <View style={styles.checkSubmit}>
                        <CheckBox
                            label='เลือกรับเอง'
                            labelStyle={styles.labelStyle}
                            iconSize={30}
                            iconName='iosCircleFill'
                            checked={this.state.checked}
                            checkedColor='#008080'
                            uncheckedColor='#1f1f1f'
                            onChange={this.getSumPleace.bind(this)}
                        />
                    </View>
                    <View>
                        <GetPleace
                            goPayment={this.nextToPayment.bind(this)}
                            funSumPleace={this.getSumPleace.bind(this)}
                            detailPleace={this.state.pleace}
                        />
                    </View>
                    <View style={styles.checkSubmit}>
                        <CheckBox
                            label='ส่งไปรษณีย์'
                            labelStyle={styles.labelStyle}
                            iconSize={30}
                            iconName='iosCircleFill'
                            checked={this.state.checked2}
                            checkedColor='#008080'
                            uncheckedColor='#1f1f1f'
                            onChange={this.getSumPostman.bind(this)}
                        />
                    </View>
                    <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                        <Card>
                            <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                                <Text style={[styles.textTitle, { fontSize: 18, paddingBottom: 5 }]}>ค่าใช้จ่ายในการจัดส่งแบบไปรษณีย์</Text>
                                <Text style={styles.textTitle}>{this.state.postPrice}</Text>
                            </View>
                        </Card>
                    </View>
                    {/* <View style={{ flexDirection: "row" }}>
                        <Text>ข้อมูลสำหรับการจัดส่ง</Text>
                        <TouchableOpacity>
                            {this.state.icondetail &&
                                <Icon />

                            }
                        </TouchableOpacity>
                    </View> */}
                    <AddressForm
                        getAddress={this.goTotalPayment.bind(this)}
                    />
                </ScrollView>
                <SummaryTotal />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    textLabel: {
        fontSize: 12,
        fontFamily: 'kanit',
    },
    cradPost: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    textTitle: {
        fontFamily: 'kanit',
        fontSize: 14,
        justifyContent: "center",
        alignContent: "center",
    },
    checkSubmit: {
        paddingTop: 10,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
        backgroundColor: "#f1f1f1"
    },
    labelStyle: {
        padding: 20,
        fontFamily: 'kanit',
        fontSize: 16
    },
    submitContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        opacity: 0.5
    },
    buttonContainerOnPress: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'kanit',
    },
})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        token: state.token
    }
}

const mapDisPacthToProps = (dispatch) => {
    return {
        setSendChoice: (choice) => {
            dispatch({
                type: "setSendChoice",
                payload: choice
            })
        },
        setUser: (fullname) => {
            dispatch({
                type: "setUser",
                payload: fullname
            })
        },
        setTotal: (totalPrice) => {
            dispatch({
                type: "setTotal",
                payload: totalPrice
            })
        },
        setTotalRegister: (total) => {
            dispatch({
                type: "setTotalRegister",
                payload: total
            })
        },
    }
}

export default connect(mapStateToProps, mapDisPacthToProps)(AddressLayout);
