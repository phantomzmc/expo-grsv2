import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import HeadUser from '../component/items/header_profile'
import FormUser from '../component/form/registerForm'
import HeaderTeam from '../component/items/headerTeam'

class Profile extends Component {
    state = {
        title: "ข้อมูลส่วนตัว"
    }
    render() {
        return (
            <View>
                <HeaderTeam title={this.state.title} />
                <ScrollView>
                    <View style={styles.container}>
                        <HeadUser />
                        <FormUser />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default Profile;
