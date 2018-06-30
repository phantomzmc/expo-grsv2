import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Switch from 'react-native-switch-pro'

import ListFriendDistance from '../list/event/listFriendDistance'
import ListFriendShirth from '../list/listShirt/listFriendShrit'
import DropDownShirth from '../list/listShirt/dropdownShirt'
import dataFriend from '../list/listFriend/dataFriend';
import dataShirts from '../list/listShirt/dataShirt'
import { connect } from 'react-redux';

class CradFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            container: true,
            distance: false,
            sizeShirth: false,
            items: [],
            total: parseFloat("0"),
            dataDis: [],
            dataShirt: [],
            iconName: "arrow-forward",
            value: false
        }
        this.getDataRegisFriend = this.getDataRegisFriend.bind(this)
    }
    componentDidMount() {
        this.setState({ items: this.props.distance })
    }
    onPressDeleteItem() {
        this.props.delete()
    }

    passName = (runnerid) => {
        console.log(runnerid)
        this.setState({ name: runnerid })
        console.log(this.state.name)
    }
    passDistance = (item) => {
        this.passName()
        this.setState({ dataDis: item, total: parseFloat(item.Fee) })
        this.props.getPriceTotal(this.state.total)
    }
    passShirt(item) {
        dataShirts.push(item.JerseySizeValue)
        this.props.addSize(dataShirts)
    }
    getDataRegisFriend = (item) => {
        let { name, dataShirt, dataFriendRegis } = this.state
        this.setState({ dataFriendRegis: { runnerid: name, couseid: item.CourseID, nameRegis: item.CourseName, dataDisRegis: item.Distance, dataFee: item.Fee, dataShirtRegis: dataShirt } })
        dataFriend.push(dataFriendRegis)
        console.log(dataFriend)
        this.props.getFriendRegis(dataFriend)
    }
    photoPlusSwitch = () => {
        let { dataFriendRegis } = this.state
        this.setState({ photoplusValue: 100 })
        console.log(this.state.photoplusValue)
        this.getDataRegisFriend(dataFriendRegis)

    }
    chageIcon = () => {
        const { iconName } = this.state
        if (iconName == "arrow-forward") {
            this.setState({ iconName: "arrow-down" })
        }
        else if (iconName == "arrow-down") {
            this.setState({ iconName: "arrow-forward" })
        }
    }
    render() {
        const { items } = this.state
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: items.PicProfile }} />
                        <Body style={{ paddingHorizontal: 5 }}>
                            <Text style={{ fontFamily: "kanit" }}>{items.FirstName} - {items.LastName}</Text>
                            <Text note style={{ fontFamily: "kanit" }}>{items.gen} -  {items.age}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this.onPressDeleteItem.bind(this)}>
                                <Icon name="ios-trash-outline" style={{ color: 'red' }} />
                            </TouchableOpacity>
                        </View>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <View style={styles.listDistance}>
                            <View style={styles.dropdownstyle}>
                                <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                    <Left>
                                        <Text style={styles.labelTitle}>ระยะทาง : {this.state.dataDis.CourseName} {this.state.dataDis.Distance}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ distance: !this.state.distance })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </Right>
                                </View>
                                {this.state.distance &&
                                    <ListFriendDistance
                                        getRunnerID={this.passName.bind(this)}
                                        getDistance={this.passDistance.bind(this)}
                                        getFriend={this.getDataRegisFriend.bind(this)}
                                    />}

                                <View style={{ flexDirection: 'row' }}>
                                    <Left>
                                        <Text style={styles.labelTitle}>ขนาดไซค์เสื้อ : {this.state.dataShirt.label} {this.state.dataShirt.width}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ sizeShirth: !this.state.sizeShirth })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </Right>
                                </View>
                                {this.state.sizeShirth && <ListFriendShirth getShirt={this.passShirt.bind(this)} />}
                            </View>
                        </View>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Icon name="ios-camera-outline" style={{ fontSize: 20 }} />
                        <Text style={{ fontFamily: "kanit", fontSize: 16 }}>Photo + Service</Text>
                    </Left>
                    <Right>
                        <Switch
                            width={60}
                            height={30}
                            value={this.state.value}
                            onSyncPress={() => this.photoPlusSwitch()}
                        />
                    </Right>
                </CardItem>
            </Card>

        );
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        addDistanceFriend: (dataDis) => {
            dispatch({
                type: 'addDistanceFriend',
                payload: dataDis
            })
        },
        addSize: (dataShirt) => {
            dispatch({
                type: 'addSize',
                payload: dataShirt
            })
        }
    }
}

const styles = StyleSheet.create({
    listDistance: {
        width: '100%',
        // justifyContent: 'center'
    },
    textLabelSize: {
        fontFamily: 'Kanit'
    },
    dropdownstyle: {
        flexDirection: 'column',

    },
    labelTitle: {
        fontFamily: 'kanit',
        fontSize: 16
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CradFriendDistance)