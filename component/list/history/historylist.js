import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Icon } from 'native-base';
import { connect } from 'react-redux'

import Modal from 'react-native-modal'
import dataEvent from '../listevent/data'
import ModalHistory from '../../modal/history'

class HistoryList extends Component {
    constructor(state) {
        super(state)
        this.state = {
            isModalVisible: false,
            name: ""
        }
    }
    componentDidMount = () => {
        this.setState({
            dataSource: dataEvent
        })
    }
    setItems(item) {
        console.log(item.name)
        this.setState({ name: item.name })
        this._toggleModal()
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

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
                    showsHorizontalScrollIndicator={false}
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: item.pic }} />
                                        <TouchableOpacity onPress={() => this.setItems(item)}>
                                            <Body>
                                                <Text>{item.name}</Text>
                                                <Text note>{item.date} - {item.month}</Text>
                                            </Body>
                                        </TouchableOpacity>
                                    </Left>
                                </CardItem>
                            </Card>
                        </View>}
                    keyExtractor={(item, index) => index} />
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <ModalHistory event={this.state.name}
                            toggleModal={this._toggleModal} />
                    </View>
                </Modal>
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist
    }
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(HistoryList)

