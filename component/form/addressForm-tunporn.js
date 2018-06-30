import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Form, Input, Label, Item, Button } from "native-base";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Font } from "expo";
import axios from 'axios'
import { connect } from 'react-redux'
import req from '../../config/uri_req'
import api_key from '../../config/api_key'
const KEYS_TO_FILTERS = ['Value'];

class TambonForm extends Component {
    static propTypes = {
        searchTerm: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            emails: [],
            data: "",
            tumporn: "",
            isItems: true
        }
    }
    componentDidMount(){
        Font.loadAsync({
            'kanit': require('../../assets/fonts/Kanit-Light.ttf'),
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.tumporn && prevState.tumporn) {
            this.loadData = false

        }
        else if (this.state.searchTerm && prevState.searchTerm) {
            this.loadData()
        }


    }

    loadData = () => {
        let uri = req[0].uspGetTambonSuggestion
        let apikey = api_key[0].api_key
        let data = ({
            params: {
                value: this.state.searchTerm,
            }
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({ isLoading: false, emails: responseJson.data });
                console.log(this.state.emails)
            })
            .catch((error) => {
                // console.error(error);
            });
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term, isItems: true })
    }
    hideItem() {
        if (this.state.tumporn !== "")
            this.setState({ isItems: false })
    }
    onGettumporn = () => {
        let { tumporn, emails } = this.state
        console.log(this.state.tumporn)
        this.props.gettumporn(this.state.tumporn)
        this.hideItem()
    }

    render() {
        let { emails, isItems } = this.state
        const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <View style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label style={styles.text}>Ex.ตำบล</Label>
                        <Input
                            onChangeText={(term) => { this.searchUpdated(term) }}
                        />
                    </Item>
                </Form>
                {this.state.isItems &&
                    <ScrollView style={styles.list}>
                        {filteredEmails.map(email => {
                            return (
                                <TouchableOpacity onPress={() => this.setState({ tumporn: email.Value })}
                                    onPressIn={this.onGettumporn.bind(this)}
                                    key={email.Value} >
                                    <View style={styles.items}>
                                        <Text style={styles.textValue}>{email.Value}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        fontFamily: 'kanit'
    },
    list: {
    },
    items: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    textValue: {
        fontFamily: 'kanit'
    }
});

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(TambonForm)