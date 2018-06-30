import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from "react-redux";
import CardFriendDistance from '../../items/cardFriendDistance'


class FriendInEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: [],
            deleteCellKey: null,
            friendRegis: []
        }
    }
    componentDidMount() {
        this.setState({
            dataSource: this.props.friendlist.friendRegis
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.container != this.state.container) {
            this.setState({ container: !this.state.container })
            console.log("nextProps")
        }
    }
    keyExtractor = (item, index) => {
        return index
    }
    deleteItem() {
        let { index, dataSource } = this.state
        Alert.alert(
            'ลบรายชื่อเพื่อน',
            'คุณต้องการลบ ' + dataSource.gen + '',
            [
                { text: 'ยกเลิก' },
                {
                    text: 'ตกลง', onPress: () => {
                        dataSource.splice(index, 1)
                        console.log("delete")
                        console.log(dataSource)
                        this.refreshFlatlist()
                    }
                }
            ], { cancelable: true }
        )
    }
    refreshFlatlist = (deleteKey) => {
        let { deleteCellKey } = this.state
        this.setState((prevState) => {
            return {
                deleteCellKey: deleteKey
            }
        })
    }
    passTotal = (price) => {
        this.props.getSummaryPrice(price)
    }
    passFriendRegis = (regisFriend) => {
        let { friendRegis } = this.state
        friendRegis.push(regisFriend)
        if(regisFriend == ""){
            console.log(this.state.friendRegis)
        }
        else if (regisFriend != ""){
            this.props.addFriendInEvent(regisFriend)
        }
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    refreshing={true}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <CardFriendDistance distance={item}
                                delete={this.deleteItem.bind(this)}
                                getFriendRegis={this.passFriendRegis.bind(this)}
                                getPriceTotal={this.passTotal.bind(this)}
                            />
                        </View>}
                    keyExtractor={this.keyExtractor} />
            </View >
        )
    }
}
const mapStateToProps = state => {
    return {
        friendlist : state.friendlist
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriendInEvent: (regisFriend) => {
            dispatch({
                type: 'addFriendInEvent',
                payload: regisFriend
            })
        }
    }
}

const styles = StyleSheet.create({
    listDistance: {
        width: '100%',
        justifyContent: 'center'
    },
    textLabelSize: {
        fontFamily: 'Kanit'
    },
    dropdownstyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(FriendInEvent)