import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Container } from 'native-base'
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";

import HeaderUser from "../component/items/header_profile";
import FormRegister from "../component/form/registerForm";
import HeaderTeam from '../component/items/headerTeam'

class UserRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "สมัครสมาชิก",
      profile: {}
    };
  }

  gotoListEvent = (
    fullname,
    lastname,
    nickname,
    password,
    confirmpassword,
    teamname,
    bib,
    userid,
    tel,
    email,
    journeyDate,
    bloodtype,
    nation,
    gen
  ) => {
    this.props.setProfile({
      fullname,
      lastname,
      nickname,
      password,
      confirmpassword,
      teamname,
      bib,
      userid,
      tel,
      email,
      journeyDate,
      bloodtype,
      nation,
      gen
    });
    this.props.navigation.navigate("UserAddressRegister");
  };
  gotoBack = () => {
    this.props.navigation.navigate('SingleLogin')
  }

  render() {
    return (
      <Container>
        <HeaderTeam
          title={this.state.title}
          goback={this.gotoBack.bind(this)} />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <ScrollView>
          <View style={styles.container}>
            <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
            <FormRegister
              goEvent={this.gotoListEvent.bind(this)}
              getToken={this.props.token.token} />
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
const mapStateToProps = state => {
  return {
    token: state.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setProfile: profile => {
      dispatch({
        type: "setProfile",
        payload: profile
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
