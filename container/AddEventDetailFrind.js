import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import { Font } from "expo";
import ListFriendDistance from '../component/list/event/listFriendDistance'
import ListShirth from '../component/list/listShirt/listShirt'


class AddEventFriend extends Component {
    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../assets/fonts/Kanit-Light.ttf'),
        });
    }
    gotoCrediPayment = () => {
        this.props.navigation.navigate('CrediPayment')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* <Text style={styles.textDistance}>เลือกระยะทาง</Text> */}
                    <ListFriendDistance />
                    <Text style={styles.textSizeshirth}>เลือกไซค์เสื้อ</Text>
                    <ListShirth />
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={this.gotoCrediPayment}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textDistance : {
        padding: 15,
        fontSize: 20,
        fontFamily: 'kanit',
    },
    textSizeshirth :{
        padding: 15,
        fontSize: 20,
        fontFamily: 'kanit',
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'kanit',

    }
})
export default AddEventFriend;