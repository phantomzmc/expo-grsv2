import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { YellowBox } from 'react-native';
import { Font} from 'expo'
import { connect } from 'react-redux'
import axios from 'axios'
import api from '../../../config/api_key'
import req from '../../../config/uri_req'


class ListEvent extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        this.state = {
            isLoading: true,
            event: {
                name: "",
                date: "",
                tranferBank: ""
            },
            profile: "",
            token : ""
        }
    }

    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../../../assets/fonts/Kanit-Light.ttf'),
        });
        this.onConnect()
    }
    onConnect(){
        let uri = req[0].session_token;
        return axios.post(uri, {
            email: "admin@guurun.com",
            password: "WXbrD28LtIR3MYm"
        },
            {
                responseType: 'json'
            })
            .then((response) => {
                console.log(response)
                token = response.data.session_token
                this.feedEvent(token)
                this.props.setCreateToken(response.data.session_token)
            })
    }

    feedEvent(token) {
        console.log(this.props.sendToken)
        let uri = req[0].uspGetEventList
        axios.get(uri, {
            headers: {
                "X-DreamFactory-API-Key": api[0].api_key,
                "X-DreamFactory-Session-Token": token,
                // "Authorization": auth
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data, });
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error);
            });

    }
    gotoPayment = (item) => {
        if (this.props.Profile == "") {
            this.props.addEvent(item)
            this.props.CheckLogin()
            console.log(item)
        } else if (this.props.Profile != "") {
            this.setState({
                event: {
                    name: item.EventName,
                    date: item.EventDate,
                    tranferBank: item.EventBankDetailTH
                }
            })
            this.props.CheckLogin()
            this.props.addEvent(item)
        }
    }

    render() {
        let url = 'https://register.shutterrunning2014.com/assets/img/theme/'
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
                    renderItem={({ item }) => <View style={styles.background}>
                        <View style={styles.containerCard}>
                            <Image
                                source={{
                                    uri: url + item.BackgroundImage
                                }}
                                style={{
                                    height: 200
                                }} />
                            <View style={styles.containerEventDetail}>
                                <View style={styles.containerEventDate}>
                                    <Text style={styles.dateText}>{item.EventID}</Text>
                                    <Text style={styles.monthText}>{item.EventDate}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={this
                                        .gotoPayment
                                        .bind(this, item)}>
                                    <View style={styles.textName}>
                                        <Text style={styles.name}>{item.EventName}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        addEvent: (event) => {
            dispatch({
                type: 'addEvent',
                payload: event
            })
        },
        setCreateToken: (token) => {
            dispatch({
                type: "setCreateToken",
                payload: token
            })

        }
    };
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#EFEFF4',
        flex: 1
    },
    containerCard: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        margin: 10,
        borderRadius: 5
    },
    containerEventDetail: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerEventDate: {
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 36,
        fontFamily: 'kanit'
    },
    monthText: {
        color: '#FC561F',
        fontSize: 20,
        fontFamily: 'kanit'
    },
    containerEventName: {
        flex: 1
    },
    textName: {
        paddingRight: 30
    },
    name: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 60,
        paddingVertical: 15,
        fontSize: 16,
        fontFamily: 'kanit'
    },
    listView: {
        paddingTop: 10,
        // backgroundColor: '#F5FCFF',
    },
    navBackground: {
        backgroundColor: '#FC561F'
    }
});
export default connect(mapStateToProps, mapDispatchtoProps)(ListEvent);
