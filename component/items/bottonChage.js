import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
// import TabRouter from '../../config/tabrouter'
import RegisterDistance from '../../container/registerDistance'

class ButtonChage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            pageNumber: 0
        }

    }
    updateIndex = (index) => {
        if (this.state.index === 1) {
            this.props.Single()
        } else if (this.state.index === 0) {
            this.props.Team()
        }
        // this.setState({ index })
    }

    render() {
        return (
            <View style={styles.container}>
            <Container>
                <Tabs initialPage={this.state.pageNumber}>
                    <Tab heading={<TabHeading><Icon name="camera" /><Text> Camera</Text></TabHeading>}>
                        <RegisterDistance />
                    </Tab>
                    <Tab heading={<TabHeading><Text>No Icon</Text></TabHeading>}>
                        <TabRouter />
                    </Tab>
                </Tabs>
            </Container>
                {/* <TouchableOpacity>
                    <Text style={styles.button}
                        onPress={this.props.Single}>ลงทะเบียนแบบเดียว</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 5 }}>
                    <Text style={styles.button}
                        onPress={this.props.Team}>ลงทะเบียนแบบกลุ่ม</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#fff',
        // padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        padding: 5,
        fontSize: 10,
        fontFamily: 'kanit',
        borderColor: '#FC561F',
        borderRadius: 5,
        borderWidth: 1,
        color: '#FC561F',
        backgroundColor: '#fff',
    },
})

export default ButtonChage;
