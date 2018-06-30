import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, CardItem, Body, Button, Text, Icon } from "native-base";

class ModalHistory extends Component {
    state = {
        name: "Thunnathorn Yuvasin",
        event: "",
        size: "M",
        distanceTitle: "FunRun",
        distance: "5 km",
        address: "106/13 หนองหอย เมืองเชียงใหม่ เชียงใหม่ 50000",
        date: "22/05/2018"
    }

    render() {
        return (
            <Card>
                <CardItem style={styles.view1}>
                    <View>
                        <Text style={styles.typePayment}> จ่ายเเล้ว </Text>
                    </View>
                    <View>
                        <Image source={{ uri: "https://www.qrstuff.com/images/sample.png" }}
                            style={{ width: 100, height: 100 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'kanit' }}> Order : number </Text>
                        <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'kanit' }}> Date order </Text>
                    </View>
                </CardItem>
                <CardItem style={styles.viewName}>
                    <Body>
                        <Text style={styles.textName1}>ชื่อ - นามสกุล</Text>
                        <Text style={styles.textName2}>{this.state.name}</Text>
                        <Text style={styles.textName1}>รายการวิ่ง</Text>
                        <Text style={styles.textName2}>{this.props.event}</Text>
                    </Body>
                </CardItem>
                <CardItem style={styles.viewSize}>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>size</Text>
                        <Text style={styles.boxName}>{this.state.size}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>{this.state.distanceTitle}</Text>
                        <Text style={styles.boxName}>{this.state.distance}</Text>
                    </View>
                </CardItem>
                <CardItem style={styles.viewAddress}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.textName1}>Address</Text>
                        <Text style={{ fontFamily: 'kanit' }}>{this.state.address}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.textName1}>วันที่</Text>
                        <Text style={{ fontFamily: 'kanit' }}>{this.state.date}</Text>
                    </View>
                </CardItem>
                <CardItem style={{ justifyContent: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <Button rounded light onPress={this.props.toggleModal} >
                            <Icon name="ios-remove-circle-outline" />
                            <Text style={{ fontFamily: "kanit" }}>ปิด</Text>
                        </Button>
                    </View>
                </CardItem>

            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
    },
    view1: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewName: {
        padding: 20,
    },
    viewSize: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    box: {
        backgroundColor: '#FC561F',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
    },
    viewAddress: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typePayment: {
        color: '#90EE90',
        fontFamily: 'kanit',
    },
    textName1: {
        color: '#a9a9a9',
        fontFamily: 'kanit',
    },
    textName2: {
        fontSize: 20,
        fontFamily: 'kanit',
    },
    boxTitle: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'kanit'
    },
    boxName: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'kanit'
    }

})

export default ModalHistory;