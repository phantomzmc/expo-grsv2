import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Font } from "expo";
import axios from 'axios'
import { connect } from 'react-redux'

import req from '../../../config/uri_req'
import api from '../../../config/api_key'

class ListShirt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            size: "",
            CourseID: this.props.event.distanceEvent.id,
            Gender: this.props.userprofile.userprofile.Gender,
            selected: false
        }
        this.pressDataShirt = this.pressDataShirt.bind(this)
    }
    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../../../assets/fonts/Kanit-Light.ttf'),
        });
    }
    componentWillMount() {
        const { CourseID, Gender } = this.state
        const uri = req[0].uspGetJerseyLists
        const apikey = api[0].api_key
        let data = ({
            params: [
                { name: "CourseID", value: CourseID },
                { name: "Gender", value: Gender }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data, });
                console.log(this.state.dataSource)
                this.props.setImageShirt(this.state.dataSource[0].JersePic)
                this.props.getImageShirt(this.state.dataSource[0].JersePic)
            }).catch((error) => {
                console.error(error);
            });

    }

    pressDataShirt(item) {
        this.props.statusButton()
        this.props.getShirt(item.JerseySizeValue)
        this.setState({ size: item.JerseySizeValue, selected: !this.state.selected })
        this.props.setSizeShirt(item.JerseySizeValue)
        // Alert.alert("ไซค์เสื้อ : " + datashirt.label)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        padding: 20
                    }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 20
                }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.container}>
                        <TouchableHighlight
                            onPress={() => this.pressDataShirt(item)}
                            activeOpacity={1}
                            underlayColor="#FC561F"
                        >
                            <View style={styles.sizeshirt}>
                                <Text style={this.state.textStatus ? styles.textStatusOnPress : styles.textStatus}>{item.JerseySizeValue} </Text>
                                <Text style={{ fontFamily: 'kanit', }}> ({item.JerseySizeDesc})</Text>
                            </View>
                        </TouchableHighlight>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        userprofile: state.userprofile,
        token : state.token
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setSizeShirt: (size) => {
            dispatch({
                type: 'setSizeShirt',
                payload: size
            })
        },
        setImageShirt: shirt => {
            dispatch({
                type: 'setImageShirt',
                payload: shirt
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
    },
    sizeshirt: {
        borderColor: '#f1f1f1',
        padding: 15,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    listshirt: {
        backgroundColor: '#fff'
    },
    listshirtPress: {
        backgroundColor: '#FC561F'
    },
    ListView: {
        backgroundColor: '#fff',
    },
    textStatus: {
        fontFamily: 'kanit',
    },
    textStatusOnPress: {
        fontFamily: 'kanit',
        color: '#FC561F'
    }

})
export default connect(mapStateToProps, mapDispatchtoProps)(ListShirt)