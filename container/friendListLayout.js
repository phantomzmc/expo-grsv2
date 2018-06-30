import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Header, Item, Icon, Input, Thumbnail, Button, Text } from 'native-base'
import Modal from "react-native-modal";
import axios from 'axios';
import { connect } from "react-redux";
import datafriend from '../component/list/listFriend/dataFriend'

import FriendListView from '../component/list/listFriend/friendList'
import HeaderTeam from '../component/items/headerTeam'
import ModalAddFriend from '../component/modal/addFriend'
import ErrorModalAddFriend from '../component/modal/addFriend_error'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspSearchFriend"
var uri2 = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspAddFriendLists"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class FriendList extends Component {
    state = {
        title: "รายชื่อเพื่อน",
        isModalVisible: false,
        isModalVisibleError: false,
        searchText: "",
        friendOutput: [],
        addStatus: [],
        datafriendlist: []
    }

    showModal = () => {
        let { searchText } = this.state
        let data = ({
            params: [
                { name: "RunnerID", value: "" },
                { name: "Keyword", value: searchText },
                { name: "EventID", value: "" }
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
                this.setState({ isLoading: false, friendOutput: response.data});
                console.log(this.state.friendOutput[0])
                this.checkRegisStatus()
            }).catch((error) => {
                this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.error(error);
            });
    }
    addFriend = (newitem) => {
        datafriend.push(newitem)
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "FriendID", value: newitem.RunnerID }
            ]
        })
        axios.post(uri2, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": sessionToken,
                "Authorization": auth
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, addStatus: response.data });
                console.log(this.state.addStatus[0])
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });

    }
    checkRegisStatus = () => {
        if (this.state.friendOutput[0] == undefined || this.state.friendOutput[0] == null) {
            this.hideModalError()
        }
        else {
            this.hideModal()
        }
    }
    hideModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    hideModalError = () => {
        this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
    }
    gotoAddFriendDetail() {
        this.props.navigation.navigate('AddEventFriend')
    }
    gotoTeamList() {
        this.props.navigation.navigate('FriendInEvent')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
        this.hideModalError()
    }

    render() {
        let { searchText } = this.state
        return (
            <View style={styles.container}>
                <HeaderTeam title={this.state.title} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="ค้นหาเพื่อน"
                            returnKeyType={"next"}
                            onChangeText={(searchText) => this.setState({ searchText })}
                            onSubmitEditing={this.showModal} />
                        <Icon name="ios-people" />
                    </Item>
                </Header>

                <Modal isVisible={this.state.isModalVisible}>
                    <ModalAddFriend
                        toggleModal={this.hideModal}
                        outputfriend={this.state.friendOutput[0]}
                        friend={datafriend}
                        getAddFriend={this.addFriend.bind(this)} />
                </Modal>
                <Modal isVisible={this.state.isModalVisibleError}>
                    <ErrorModalAddFriend
                        toggleModal={this.hideModalError}
                        goRegister={this.gotoRegister.bind(this)}
                    />
                </Modal>

                <FriendListView AddFriendDetail={() => this.gotoAddFriendDetail()}
                    TeamList={() => this.gotoTeamList()}
                    friend={this.state.datafriendlist} />
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        userprofile: state.userprofile
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 20,
        padding: 15,
    },
})

export default connect(mapStateToProps)(FriendList);
