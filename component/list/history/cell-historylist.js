import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Icon } from 'native-base';

class CellHistory extends Component {

    render() {
        return (
            <View>
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
            </View>
        );
    }
}


export default CellHistory;