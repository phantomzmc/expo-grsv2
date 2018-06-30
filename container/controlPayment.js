import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Container, Card, CardItem, Content, Body, Item, Icon } from "native-base";
import { connect } from "react-redux";
import SummaryTotal from '../component/items/summary'
import HeaderTeam from "../component/items/headerTeam";

class ControlPayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ชำระค่าบริการ",
        }
    }
    componentWillMount(){
        console.log(this.props.event.totalPrice)
        this.setState({
            total : parseFloat(this.props.event.totalPrice)
        })
    }
    sumCredit(){
        sum = (this.props.event.totalRegister * 105)/100
        console.log(sum)
        credit = (sum - this.props.event.totalRegister)
        console.log(credit)
        this.props.setTotalRegister(sum)
        this.props.setCreditPrice(credit)
    }
    sumTranfer(){
        this.props.setTotalRegister(this.props.event.totalRegister)
        this.props.setCreditPrice(0)
    }
    gotoPayment = () => {
        this.sumCredit()
        this.props.navigation.navigate('ButtonChangePayment')
    }
    gotoTranfer= () => {
        this.sumTranfer()
        this.props.navigation.navigate('ButtonChangeTranfer')
    }
    gotoBack = () => {
        this.props.navigation.navigate('AddressLayout')
    }
    render() {
        return (
            <Container>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                />
                <ScrollView>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => this.gotoPayment()}>
                            <Card style={{ backgroundColor: "#fff", paddingVertical: 40, }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <View style={styles.containerIcon}>
                                        <Icon name="cc-mastercard" type="FontAwesome" style={{ fontSize: 50, color: "#FC561F" }} />
                                    </View>
                                    <Text style={styles.labelCard}>
                                        เครดิตการ์ด / เดบิตการ์ด
                                </Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.gotoTranfer()}>
                            <Card style={{ backgroundColor: "#fff", paddingVertical: 40, }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <View style={styles.containerIcon}>
                                        <Icon name="attachment" type="Entypo" style={{ fontSize: 50, color: "#FC561F" }} />
                                    </View>
                                    <Text style={styles.labelCard}>
                                        โอนเงินและแนบหลักฐาน
                                </Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <SummaryTotal />

            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        event : state.event
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalRegister : (total) => {
            dispatch({
                type : "setTotalRegister",
                payload : total
            })
        },
        setCreditPrice : (credit) => {
            dispatch({
                type : "setCreditPrice",
                payload : credit
            })
        }
    }
}

const styles = StyleSheet.create({
    containerIcon: {
        width: 100,
        height: 100,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#FC561F",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    labelCard: {
        paddingVertical: 20,
        fontSize: 20,
        fontFamily: "kanit",
        color: "#FC561F"
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ControlPayment)