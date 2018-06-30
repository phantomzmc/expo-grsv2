import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Item, Input, Button, Tab, Tabs, TabHeading, Icon } from 'native-base';
import Modal from "react-native-modal";
import axios from 'axios'

import datafriend from '../component/list/listFriend/dataFriend'

import ButtonChage from '../component/items/bottonChage'
import HeaderProfile from '../component/items/header_profile.js'
import EventListFriend from '../component/list/listFriend/eventListFriend'
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


class TeamList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนแบบกลุ่ม",
            isModalVisible: false,
            isModalVisibleError: false,
            searchText: "",
            friendOutput: [],
            addStatus: [],
            datafriendlist: []
        }
    }
    showModal() {
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
                this.setState({ isLoading: false, friendOutput: response.data });
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
    gotoTeamList = () => {
        this.props.navigation.navigate('TabRouter')
    }
    gotoRegisterDistance = () => {
        this.props.navigation.navigate('FriendInEvent')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
        this.hideModalError()
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <HeaderTeam title={this.state.title} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <HeaderProfile />
                        <Header searchBar rounded>
                            <Item>
                                <Icon name="ios-search" />
                                <Input
                                    placeholder="ค้นหาเพื่อน"
                                    returnKeyType={"next"}
                                    onChangeText={(searchText) => this.setState({ searchText })}
                                    onSubmitEditing={this.showModal.bind(this)}
                                />
                                <Icon name="ios-people" />
                            </Item>
                        </Header>
                        <Tabs>
                            <Tab heading={<TabHeading><Icon name="ios-people" /></TabHeading>}>
                                <EventListFriend friend={datafriend} />
                            </Tab>
                            <Tab heading={<TabHeading><Icon name="ios-heart" /></TabHeading>}>
                                <Text>No Icon</Text>
                                <EventListFriend friend={datafriend} />
                            </Tab>
                        </Tabs>
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
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => navigate('FriendDistance')}>
                                <Text style={styles.textButton}>+ เพิ่มในการสมัคร</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addFriend: {
        marginTop: 30,
        alignItems: 'center',
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 100,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',
    },
    textTile: {
        padding: 10,
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'kanit',
        color: '#000',
    },

})
export default TeamList;