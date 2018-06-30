import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'


import TranferView from '../component/items/tranferView'
import TotalPayment from '../container/totalLayout'

class TransferPayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    showDetailPayment = () => {
        this.props.showDetail()
    }
    goAddressSend = () => {
        this.props.totalPayment()
    }

    render() {
        return (
            <View style={styles.container}>
                <TranferView
                    ShowDetail={this.showDetailPayment.bind(this)} 
                    goAddress={this.goAddressSend.bind(this)}
                    detailPayment={this.props.event.event.EventBankDetailTH} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

})
export default connect(mapStateToProps)(TransferPayment);
