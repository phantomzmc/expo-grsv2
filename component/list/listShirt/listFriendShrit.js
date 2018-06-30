import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Font } from "expo";
import axios from 'axios'
import { connect } from 'react-redux'

var uri = 'http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetJerseyLists'
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class ListShirt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            size: "",

        }
        this.teamGetShirt = this.teamGetShirt.bind(this)
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../../../assets/fonts/Kanit-Light.ttf'),
        });
        let data = ({
            params: [
                { name: "CourseID", value: this.props.friendlist.friendEvent[1].couseid },
                { name: "Gender", value: this.props.userprofile.userprofile.Gender }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": sessionToken,
                "Authorization": auth
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data, });
                console.log(this.state.dataSource)
                this.props.setImageShirt(this.state.dataSource[0].JersePic)

            }).catch((error) => {
                console.error(error);
            });

    }

    teamGetShirt(item) {
        this.props.getShirt(item)
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
                            onPress={() => this.teamGetShirt(item)}
                            activeOpacity={0.5}
                            underlayColor="#FC561F">
                            <View style={styles.sizeshirt}>
                                <Text style={{ fontFamily: 'kanit', }}>{item.JerseySizeValue} </Text>
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
        friendlist: state.friendlist,
        userprofile: state.userprofile
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
    ListView: {
        backgroundColor: '#fff',
    }

})
export default connect(mapStateToProps, mapDispatchtoProps)(ListShirt)