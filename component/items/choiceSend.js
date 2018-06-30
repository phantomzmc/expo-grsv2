import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableOpacity } from 'react-native';
import { ListItem, CheckBox, Text, Body, Icon } from 'native-base';
import ActionButton from 'react-native-action-button';

import { connect } from 'react-redux'

class ChoiceSend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youself: false,
            postman: false,
            choiceSend: "",
        };
    }
    componentWillUpdate() {
        console.log(this.state.choiceSend)
    }

    getChoice = (dataChoice) => {
        this.props.showChoice(dataChoice)
        this.setState({ choice: dataChoice })
    }


    render() {
        return (
            <View style={styles.container}>
                <ListItem onPress={() => this.setState({ youself: !this.state.youself, choiceSend: 1 })}>
                    <CheckBox CheckBox checked={this.state.youself} onPress={() => this.setState({ youself: !this.state.youself, choiceSend: 1 })} />
                    <Body>
                        <Text style={styles.textTitle}>รับด้วยตนเอง</Text>
                        <Text style={styles.textDetail}>Siam Paragon</Text>
                    </Body>
                </ListItem>
                <ListItem onPress={() => this.setState({ postman: !this.state.postman, choiceSend: 2 })}>
                    <CheckBox CheckBox checked={this.state.postman} onPress={() => this.setState({ postman: !this.state.postman, choiceSend: 2 })} />
                    <Body>
                        <Text style={styles.textTitle}>ส่งไปรษณีย์</Text>
                        <Text style={styles.textDetail}>{this.props.address.number}</Text>
                    </Body>
                </ListItem>
                <ActionButton buttonColor="rgba(231,76,60,1)" style={styles.actionbutton}>
                    <ActionButton.Item buttonColor='#9b59b6' title="ดูค่าสมัคร" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-clipboard" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>


        );
    }
}


const mapStateToProps = (state) => {
    return {
        address: state.address
    }
}

const styles = StyleSheet.create({
    container: {
    },
    textTitle: {
        fontFamily: 'kanit'
    },
    textDetail: {
        fontSize: 12,
        fontFamily: 'kanit',
        color: '#1e1e1e'
    }
});


export default connect(mapStateToProps)(ChoiceSend);
