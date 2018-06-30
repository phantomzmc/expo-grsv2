import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Font } from "expo";
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'

class PhotoPlus extends Component {
    static propTypes = {
        priceEvent : PropTypes.number,
        pricePhotoPlus : PropTypes.number
    }
    constructor() {
        super();
        this.state = {
            value: true,
            pricePhotoPlus: null,
            textSwitch: "",
            // priceEvent: this.props.event.distanceEvent.price,
            totalPrice: ""
        }
    }
    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
    }
    componentWillMount(){
        this.setState({
            priceEvent: parseFloat(this.props.event.distanceEvent.price),
            pricePhotoPlus: parseFloat(this.props.event.distanceEvent.pricePhotoPlus)
        })
    }

    photoPlusSwitch = () => {
        let { dataFriendRegis } = this.state
        this.setState({ value: !this.state.value })
        // console.log(this.state.pricePhotoPlus)
        this.sumPrice()
        this.props.setTotal(this.state.totalPrice.toString())
        this.props.setTotalRegister(this.state.totalPrice.toString())
    }

    sumPrice = () => {
        let { value,priceEvent,pricePhotoPlus } = this.state
        if (value == true) {
            const sum =  pricePhotoPlus +  priceEvent
            console.log(sum)
            this.setState({ totalPrice : sum})
            console.log(this.state.totalPrice)
        }
        else if (value == false) {
            this.setState({ totalPrice: this.state.priceEvent })
        }
    }

    render() {
        let { price, title } = this.state
        return (
            <View style={styles.container}>
                <Text style={{
                    fontFamily: 'kanit'
                }}>{this.props.titleName}
                </Text>
                <Switch
                    width={60}
                    height={30}
                    value={this.state.value}
                    onSyncPress={() => this.photoPlusSwitch()}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        event: state.event
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        setTotal: (totalPrice) => {
            dispatch({ 
                type: "setTotal", 
                payload: totalPrice 
            })
        },
        setTotalRegister : (total) => {
            dispatch({
                type : "setTotalRegister",
                payload : total
            })
        },
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding : 20
    }
})

export default connect(mapStateToProps, mapDispatchToState)(PhotoPlus);
