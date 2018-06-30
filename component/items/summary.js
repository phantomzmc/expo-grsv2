import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { Font } from "expo";
import { connect } from 'react-redux'

class SummaryTotal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalRegister: ""
        }
    }
    componentWillMount(){
        clearInterval(this._interval);
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
        this._interval = setInterval(() => {
            this.setState({ totalRegister: this.props.event.totalRegister })
        }, 500);
        console.log(this.state.totalRegister)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.totalRegister != this.props.event.totalRegister) {
            console.log("update")
            this.setState({ totalRegister: this.props.event.totalRegister })
        }
        else if (nextProps.totalRegister != this.props.friendlist.friendTotalPrice) {
            console.log("friend update ")
            this.setState({ totalRegister: this.props.friendlist.friendTotalPrice })
        }
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={{ uri: 'https://register.shutterrunning2014.com/assets/img/theme/bg.jpg' }}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.textSummary}>สรุปค่าสมัครทั้งหมด : </Text>
                        <Text style={styles.textSummary}>{}{this.state.totalRegister} บาท</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        friendlist: state.friendlist
    }
}

const styles = StyleSheet.create({
    background: {
        opacity: 0.8,

    },
    container: {
        backgroundColor: '#000',
        opacity: 0.8,
        width: '100%',
        height: 50
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textSummary: {
        padding: 10,
        fontSize: 20,
        fontFamily: 'kanit',
        color: '#fff',
    }
})

export default connect(mapStateToProps)(SummaryTotal)