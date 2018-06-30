import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';

import { StackNavigator } from 'react-navigation';

import CouponForm from '../component/form/couponForm'
class DiscountCoupon extends Component {

    render() {
        return (
            <ScrollView>
                <View>
                    <CouponForm />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    containerCoupon: {
        backgroundColor: '#000',
    },

})

export default DiscountCoupon
