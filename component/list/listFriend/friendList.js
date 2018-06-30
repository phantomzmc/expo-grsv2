import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetFriendLists"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class FriendListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefesh  : false,
            
        }
        // this.alertShow = this.alertShow.bind(this)
    }

    componentDidMount(){
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "PageNo", value: "1" },
                { name: "RowPerPage", value: "12" }
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
            .then((response) => {
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
    }

    onRefesh = () =>{
        this.componentDidMount()
        // this.setState({ isRefesh : true})
        // datafriend.push(this.state.newitem)

    }
    alertShow(item) {
        console.log(item)
        Alert.alert(item.name, " เพศ : " + item.gen + " อายุ : " + item.age,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.props.AddFriendDetail() },
                { text: 'หน้าหลัก' , onPress: () => this.props.TeamList()}
            ],
            { cancelable: false }
        )
        this.props.addFriend(item)
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
                    // paddingTop: 20
                }}>
                <FlatList
                    data={this.state.dataSource}
                    refreshing={this.state.isRefesh}
                    onRefresh={this.onRefesh}
                    renderItem={({ item }) => <View style={styles.container}>{item.name}
                        <View style={styles.cellFriend}>
                            <View>
                                <Image source={{ uri: item.imgAvatar }}
                                    style={styles.avatar} />
                            </View>
                            <TouchableOpacity onPress={() => this.alertShow(item)}>
                                <View style={styles.textListFriend}>
                                    <Text style={styles.textName}>{item.FirstName} - {item.LastName}</Text>
                                    <Text style={styles.textAge}>อายุ : {item.NickName} - {item.Gender}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    keyExtractor={(item, index) => index} />
            </View >

        );
    }
}
const mapStateToProps = state => {
    return {
         userprofile : state.userprofile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriend : (profile) => {
            dispatch({
                type: 'addFriend',
                payload :profile
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listview: {
        backgroundColor: '#fff',
    },
    cellFriend: {
        flexDirection: 'row',
        padding: 10,
        borderColor: '#f1f1f1',
        borderWidth: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 2,
    },
    textListFriend: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    textName: {
        fontSize: 17
    },
    textAge: {
        fontSize: 10,
        color: '#666666'
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(FriendListView);
