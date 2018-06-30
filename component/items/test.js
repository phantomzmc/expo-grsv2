import React, { Component } from 'react';
import {  View, Text, } from 'react-native';

class Test extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.price} บาม</Text>
      </View>
    );
  }
}
export default Test