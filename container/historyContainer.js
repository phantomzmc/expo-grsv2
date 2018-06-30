import React, { Component } from 'react';
import { View, StyleSheet,StatusBar } from 'react-native'
import HistoryList from '../component/list/history/historylist'
import HeaderTeam from '../component/items/headerTeam'

class HistoryContainer extends Component {
    state = {
        title: "ประวัติการวิ่ง"
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderTeam title={this.state.title} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <View style={styles.list}>
                    <HistoryList />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    list: {
        padding: 10
    }
})

export default HistoryContainer;