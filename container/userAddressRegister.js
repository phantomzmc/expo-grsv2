import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,StatusBar
} from "react-native";
import { StackNavigator } from "react-navigation";
import {Container} from 'native-base'
import { connect } from "react-redux";

import HeaderUser from "../component/items/header_profile";
import FormAddressRegister from "../component/form/registerAddressForm";
import HeaderTeam from '../component/items/headerTeam'

class UserAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      title: "สมัครสมาชิก",
      address: {
        number: "",
        t: "",
        a: "",
        city: "",
        country: "",
        postNumber: ""
      }
    }
  }

  gotoListEvent = (number, t, a, city, country, postNumber) => {
    this.props.setAddress({ address: number, t, a, city, country, postNumber });
    this.props.navigation.navigate("UserHelpRegister");
  };
  gotoBack = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <Container>
        <HeaderTeam
          title={this.state.title}
          goback={this.gotoBack.bind(this)}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <ScrollView>
          <View style={styles.container}>
            <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
            <FormAddressRegister goEvent={this.gotoListEvent.bind(this)} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (address) => {
      dispatch({
        type: "setAddress",
        payload: address
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(UserAddressRegister);
