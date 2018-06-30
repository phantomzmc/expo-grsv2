import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableHighlight, TouchableOpacity } from 'react-native';
import data from './data.js';

export default class CellListEvent extends Component {
    render() {
        return (
            <View style={styles.background}>
                <TouchableOpacity onPress={this.gotoPayment}>
                    <View style={styles.containerCard}>
                        <Image source={{ uri: data.pic }}
                            style={{ height: 200 }} />
                        <View style={styles.containerEventDetail}>
                            <View style={styles.containerEventDate}>
                                <Text style={styles.dateText}>{data.date}</Text>
                                <Text style={styles.monthText}>{data.month}</Text>
                            </View>
                            <Text style={styles.name}>{data.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#EFEFF4',
        flex: 1,
    },
    containerCard: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        margin: 10,
        borderRadius: 5,

    },
    containerEventDetail: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerEventDate: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 36,
        fontFamily: "Kanit"
    },
    monthText: {
        color: '#FC561F',
        fontSize: 20,
        fontFamily: "Kanit"
    },
    containerEventName: {
        flex: 1,
    },
    name: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 15,
        fontSize: 18,
        fontFamily: "Kanit"
    },

})
