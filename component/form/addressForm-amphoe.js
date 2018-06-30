import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Form, Input, Label, Item, Button } from "native-base";
import axios from 'axios'
import { connect } from 'react-redux'
import req from '../../config/uri_req'
import api_key from '../../config/api_key'
const KEYS_TO_FILTERS = ['Value'];

class AddressFormAmphoe extends Component {
    static propTypes = {
        searchTerm: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            emails: [],
            data: "",
            amphoe: "",
            isItems: true
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.amphoe && prevState.amphoe) {
            this.loadData = false

        }
        else if (this.state.searchTerm && prevState.searchTerm) {
            this.loadData()
        }
    }

    loadData = () => {
        let uri = req[0].uspGetAmphoeSuggestion
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
        if (this.state.amphoe !== "")
            this.setState({ isItems: false })
    }
    onGetamphoe = () => {
        let { amphoe } = this.state
        console.log(this.state.amphoe)
        this.props.getamphoe(this.state.amphoe)
        this.hideItem()
    }

    render() {
        let { emails, isItems } = this.state
        const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <View style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label style={styles.text}>Ex.อำเภอ</Label>
                        <Input
                            onChangeText={(term) => { this.searchUpdated(term) }}
                        />
                    </Item>
                </Form>
                {this.state.isItems &&
                    <ScrollView style={styles.list}>
                        {filteredEmails.map(email => {
                            return (
                                <TouchableOpacity onPress={() => this.setState({ amphoe: email.Value })}
                                    onPressIn={this.onGetamphoe.bind(this)}
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
        fontFamily: "kanit"
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
        fontFamily: "kanit"
    }
});
const mapStateToProps = state => {
    return { 
        token : state.token
    }
}


export default connect(mapStateToProps)(AddressFormAmphoe)