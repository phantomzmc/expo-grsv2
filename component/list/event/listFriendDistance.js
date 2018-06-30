import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { Left, Right } from "native-base";
import { connect } from 'react-redux'
import axios from 'axios'

var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class ListFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressStatus: true,
            id: this.props.event.event.EventID,
            userid: this.props.username.username,
            runnerid: this.props.userprofile.userprofile.RunnerID
        }
    }

    componentDidMount() {
        const { id, userid } = this.state
        const uri = 'http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetCourseLists(' + id + ',' + userid + ')'
        axios.get(uri, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": sessionToken,
                "Authorization": auth
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error);
            });
    }
    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }
    alertShow(item) {
        let {runnerid} = this.state
        this.props.getRunnerID(runnerid)
        console.log(runnerid)
        this.props.getDistance(item)
        this.props.getFriend(item)
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.listview}>
                        <TouchableHighlight onPress={() => this.alertShow(item)}
                            activeOpacity={0.5}
                            underlayColor="#FC561F" >
                            <View style={this.state.pressStatus ? styles.cellDistance : styles.cellDistanceOnPress}>
                                <View style={styles.content}>
                                    <Left>
                                        <Text style={styles.title}>
                                            {item.CourseName} {item.Distance}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.detail}>{item.Fee} บาท</Text>
                                    </Right>
                                </View>

                            </View>
                        </TouchableHighlight>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        event: state.event,
        username: state.username,
        userprofile : state.userprofile
    }
}


const styles = StyleSheet.create({
    listview: {
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    cellDistance: {
        justifyContent: 'center',
        // borderColor: '#f1f1f1',
        // borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    cellDistanceOnPress: {
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderColor: '#f1f1f1',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    content: {
    },
    title: {
        fontFamily: 'kanit'
    },
    detail: {
        fontFamily: 'kanit',
        color: '#666666'
    }
})

export default connect(mapStateToProps)(ListFriendDistance);
