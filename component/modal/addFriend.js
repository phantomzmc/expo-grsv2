import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, Thumbnail } from "native-base";

class ModalAddFriend extends Component {
    state = {
        newitem: {
            FirstName: "Thunnathorn ",
            LastName : "Yuvasin",
            NickName: 22,
            Gender: "ชาย",
            favorites: 1,
            imgAvatar: "https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-1/p320x320/31454067_1642595545789324_6450015206967595916_n.jpg?_nc_cat=0&oh=c1bc77925e6ad8268667693dae3da916&oe=5B86F157"
        }
    }
    componentDidMount() {
        this.setState({ newitem: this.props.outputfriend })
        console.log(this.state.newitem)
    }
    onAddFriend = () => {
        this.props.getAddFriend(this.state.newitem)
        console.log(this.state.newitem)
    }
    render() {
        let { newitem } = this.state
        return (
            <View style={styles.modalContainer}>
                <Thumbnail source={{ uri: "https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.0-1/p320x320/31454067_1642595545789324_6450015206967595916_n.jpg?_nc_cat=0&oh=c1bc77925e6ad8268667693dae3da916&oe=5B86F157" }} />
                <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontFamily: "kanit" }}>{newitem.FirstName} - {newitem.LastName}</Text>
                    <Text style={{ fontSize: 16, fontFamily: "kanit" }}>{newitem.Gender} - {newitem.NickName}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                    <Button iconLeft rounded light onPress={this.props.toggleModal} style={{ marginHorizontal: 10, justifyContent: "center" }}>
                        <Icon name="ios-close-outline" />
                        <Text style={{ fontFamily: "kanit" }}>ปิด</Text>
                    </Button>
                    <Button iconLeft rounded success onPress={this.onAddFriend.bind(this)} onPressOut={this.props.toggleModal} style={{ marginHorizontal: 10, justifyContent: "center" }}>
                        <Icon name="ios-add-outline" style={{ color: "#fff" }} />
                        <Text style={styles.textButton}>เพิ่มเพื่อน</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 30,
        borderRadius: 10

    },
    textButton: {
        color: '#fff',
        fontFamily: 'kanit'
    }
})

export default ModalAddFriend;