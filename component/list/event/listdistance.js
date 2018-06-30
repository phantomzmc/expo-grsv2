import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { Font } from "expo";
import { connect } from 'react-redux'
import axios from 'axios'
import api from '../../../config/api_key'
import req from '../../../config/uri_req'


var img = 'https://www.beautifullearth.com/wp-content/uploads/2017/10/123-6.jpg'

class ListDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distanceEvent: {
                id: "",
                name: "",
                distance: "",
                price: ""
            },
            pic: img,
        }
    }

    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../../../assets/fonts/Kanit-Light.ttf'),
        });
        const uri = req[0].uspGetCourseLists
        let data = ({
            params: [
                {
                    name: "EventID", value: this.props.event.event.EventID
                },
                {
                    name: "Username", value: this.props.username.username
                },
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api[0].api_key,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data })
            }).catch((error) => {
                console.error(error);
            });
    }
    shirtPhotoPlus(item) {
        this.setState({
            distanceEvent: {
                id: item.CourseID,
                name: item.CourseName,
                distance: item.Distance,
                price: parseFloat(item.Fee)
            }
        })
        this.props.onGotoshirt({ id: item.CourseID, name: item.CourseName, distance: item.Distance, price: parseFloat(item.Fee), pricePhotoPlus: item.PhotoPlusCost, statusPhotoPlus: item.PhotoPlusService })
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
                    renderItem={({ item, datadistance }) => <View style={styles.container}>
                        <TouchableOpacity
                            onPress={this
                                .shirtPhotoPlus
                                .bind(this, item)}>
                            <ImageBackground
                                source={{ uri: this.state.pic }}
                                style={styles.imgbackground}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{item.CourseName}</Text>
                                    <Text style={styles.distance}>{item.Distance}</Text>
                                    <Text style={styles.price}>{item.Fee} บาท</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 1
    },
    imgbackground: {
        width: '100%',
        height: 150
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: '#fff',
        fontFamily: 'kanit',
        fontSize: 20,
        fontWeight: '500'
    },
    distance: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '500',
        fontFamily: 'kanit'
    },
    price: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'kanit'
    },
    listview: {}
})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        username: state.username,
        token: state.token
    }
}

export default connect(mapStateToProps)(ListDistance)
