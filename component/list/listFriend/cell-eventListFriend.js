import React, { Component } from 'react'
import { StyleSheet, Image, Text } from "react-native";
import { View, Card, CardItem } from 'native-base';
import CheckBox from 'react-native-checkbox-heaven';
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../listevent/data';

class CellEventListFriend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            checked: false,
            favorite: true,
            icon: "",
            iconColor: ""
        }
        this.checkFavorite = this.checkFavorite.bind(this)
    }
    componentDidMount() {
        this.setState({ item: this.props.items })
        this.checkFavorite()
        console.log(this.props.items)
        console.log(this.state.item)
    }

    handleOnChange(val) {
        this.props.getAddFriend(this.state.item)
        console.log(this.state.item)
        this.setState({ checked: val })
    }
    chageColorIcon() {
        let { favorite } = this.state
        if (favorite == true) {
            this.setState({ icon: "heart-o", iconColor: "rgb(50, 50, 50)", favorite: false })
            console.log("false")
        }
        else if (favorite == false) {
            this.setState({ icon: "heart", iconColor: "#F44336", favorite: true })
            console.log("true")
        }
    }
    checkFavorite = () => {
        let { item } = this.state
        if (this.props.items.favorites == 1) {
            this.setState({ icon: "heart", iconColor: "#F44336", favorite: true })
            console.log("1")
        }
        else if (this.props.items.favorites == 0) {
            this.setState({ icon: "heart-o", iconColor: "rgb(50, 50, 50)", favorite: false })
            console.log("2")
        }
    }
    
    render() {
        let { item, favorite } = this.state
        return (
            <View style={styles.container}>
                <Card>
                    <CardItem>
                        <CheckBox
                            iconSize={20}
                            iconName='iosCircleMix'
                            checked={this.state.checked}
                            checkedColor='#FC561F'
                            uncheckedColor='#C0C0C0'
                            onChange={this.handleOnChange.bind(this)}
                            style={{ flex: 1 }}
                        />
                    </CardItem>
                    <CardItem>
                        <View style={styles.imgContainer}>
                            <View style={styles.listfriend}>

                                <Image source={{ uri: item.imgAvatar }}
                                    style={styles.imgAvatar} />
                                <Icon
                                    name={this.state.icon}
                                    color={this.state.iconColor}
                                    size={20}
                                    style={{ marginBottom: 10, marginTop: 20 }}
                                    onPress={this.chageColorIcon.bind(this)}
                                />
                                <CardItem>
                                    <View style={styles.detailList}>
                                        <Text style={styles.textName}>{item.FirstName} - {item.LastName}</Text>
                                    </View>
                                </CardItem>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },

    imgContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    listfriend: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textName: {
        fontFamily: 'kanit',
        fontSize: 15
    },
    detailList: {
        flexDirection: 'row',
        padding: 5
    },
    heart: {
        padding: 5,
    }
})

export default CellEventListFriend