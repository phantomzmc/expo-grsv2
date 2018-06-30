import React, { Component } from 'react'
import FriendInEvent from '../component/list/listFriend/frienInEvent'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Footer } from "native-base";
import { connect } from 'react-redux'

import HeaderTeam from '../component/items/headerTeam'
import SummaryTotal from '../component/items/summary'

class FriendDistance extends Component {
    state = {
        title: "เลือกระยะทาง",
        price: [],
        totals: 0
    }

    onButtonChangePayment = () => {
        this.props.navigation.navigate("ButtonChangePayment")
    }
    onPressGoBack = () => {
        this.props.navigation.navigate("TabRouter")
    }
    passSummaryPrice = (total) => {
        let { price } = this.state
        price.push(total)
        console.log(this.state.price)
        this.sumValue()
    }
    sumValue = () => {
        let { price } = this.state
        const add = (a, b) =>
            a + b
        const sum = price.reduce(add)
        console.log(sum)
        this.props.setTotalPrice(sum)
        this.setState({ totals: sum })
    }

    render() {
        return (
            <View>
                <HeaderTeam title={this.state.title}
                    goback={this.onPressGoBack.bind(this)} />
                <ScrollView>
                    <View style={styles.container}>
                        <FriendInEvent getSummaryPrice={this.passSummaryPrice.bind(this)} />
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={this.onButtonChangePayment.bind(this)}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 60 }}>
                        <SummaryTotal />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalPrice: (totals) => {
            dispatch({
                type: 'setTotalPrice',
                payload: totals
            })
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
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
        fontFamily: 'Kanit',
    },
})


export default connect(mapStateToProps,mapDispatchToProps)(FriendDistance)