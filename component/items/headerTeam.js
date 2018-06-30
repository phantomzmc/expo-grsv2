import React, { Component } from 'react';
import { StyleSheet, StatusBar } from "react-native";
import { Font } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';
class HeaderTeam extends Component {
    state = {
        iconBack: false
    }
    componentDidMount() {
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
        this.setState({ title: this.props.title })
    }
    onPressGoBack() {
        this.props.goback()
    }
    render() {
        return (
            <View>
                <Header style={{ backgroundColor: "#FC561F" }}>
                    <Left>
                        <Button transparent onPress={this.onPressGoBack.bind(this)}>
                            <Icon name='arrow-back' style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.title}>{this.props.title}</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "kanit",
        color: "#fff",
        fontSize: 14
    }
})
export default HeaderTeam