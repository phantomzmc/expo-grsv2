import React, { Component } from "react";
import { TabNavigator, tabBarIcon } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

//import your tabs js file
import TeamList from "../container/teamList";
import FriendList from '../container/friendListLayout'
import Profile from '../container/profile'
import AddEventFriend from '../container/AddEventDetailFrind'
import HistoryContainer from '../container/historyContainer'

var myTabs = TabNavigator({
    // here you will define your screen-tabs
    TeamList: {
        screen: TeamList,
        navigationOptions: {
            title: 'ลงทะเบียนแบบกลุ่ม',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                // fontFamily: "Kanit",
                fontWeight: '500',
            },
        },

    },
    FriendList: {
        screen: FriendList,
        navigationOptions: {
            title: 'รายชื่อเพื่อน',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                // fontFamily: "Kanit",
                fontWeight: '500',
            }
        }
    },
    HistoryContainer: {
        screen: HistoryContainer,
        navigationOptions: {
            title: 'ประวัติการวิ่ง',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                // fontFamily: "Kanit",
                fontWeight: '500',
            }
        }
    },
    Profile: {
        screen: Profile
    },
},
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FC561F',
        },
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            activeTintColor='#FC561F'
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("TeamList")}>
                            <Icon name="ios-people" style={{ color: '#FC561F' }} />
                            <Text style={{ fontSize: 8, color: '#FC561F' }}>ลงทะเบียนกลุ่ม</Text>
                        </Button>
                        <Button
                            vertical
                            activeTintColor='#FC561F'
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("FriendList")}>
                            <Icon name="ios-contacts" style={{ color: '#FC561F' }} />
                            <Text style={{ fontSize: 8, color: '#FC561F' }}>รายชื่อเพื่อน</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("HistoryContainer")}>
                            <Icon name="ios-list" style={{ color: '#FC561F' }} />
                            <Text style={{ fontSize: 8, color: '#FC561F' }}>ประวัติการวิ่ง</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 3}
                            onPress={() => props.navigation.navigate("Profile")}>
                            <Icon name="ios-contact" style={{ color: '#FC561F' }} />
                            <Text style={{ fontSize: 8, color: '#FC561F' }}>ข้อมูลส่วนตัว</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    });

export default myTabs;