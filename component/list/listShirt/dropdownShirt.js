import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SelectInput from 'react-native-select-input-ios';

import dataShirth from './dataShirt'

class DropDownShirth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSmall0: 0,
            dataOpition: []
        };
    }
    componentDidMount(){
        this.setState({
            dataOpition : dataShirth
        })
    }
    onSubmitEditingSmall0(value) {
        this.setState({
            valueSmall0: value
        });
    }
    
    render() {
        let state = this.state;
        return (
            <View style={styles.container}>
                <SelectInput
                    value={state.valueSmall0}
                    options={this.state.dataOpition}
                    onCancelEditing={() => console.log('onCancel')}
                    onSubmitEditing={this.onSubmitEditingSmall0.bind(this)}
                    style={[styles.selectInput, styles.selectInputSmall]}
                />
            </View>
        )
    }
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const MARGIN_SMALL = 8;
const MARGIN_LARGE = 16;

const styles = StyleSheet.create({
    container:{
        padding : 5
    },
    selectInput: {
        flexDirection: 'row',
        height: 36,
        borderWidth: 1,
        borderRadius: 4,
        padding: MARGIN_SMALL,
        marginTop: MARGIN_LARGE,
        backgroundColor: '#FFFFFF',
    },
    selectInputSmall: {
        width: SCREEN_WIDTH * 0.5 - (MARGIN_LARGE * 2),
    },
});

export default DropDownShirth