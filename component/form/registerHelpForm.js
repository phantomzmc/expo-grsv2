import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,

} from "react-native";
import randomstringPromise from 'randomstring-promise';
import Communications from 'react-native-communications';
import { StackNavigator } from "react-navigation";
import { Form, Item, Input, Label, Picker, Icon } from 'native-base'
import { connect } from 'react-redux'


class FormAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    email: PropTypes.string

  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      relation: "ความสัมพันธ์",
      tel: "",
      verifycode: "",
      statusVerify: 0,
      email: ""
    };
  }
  componentWillMount() {
    let { verifycode, email } = this.state
    randomstringPromise(10)
      .then((verifycode) => {
        this.setState({ verifycode : verifycode })
        // console.log(code);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
        console.log(verifycode)
        this.props.setVerify(verifycode)
      });
    this.setState({ email: this.props.profile.profile.email })
  }


  sendData = (firstname, lastname, relation, tel) => {
    let { verifycode, statusVerify } = this.state
    Communications.email([this.state.email], null, null, 'GuuRun Code Verify', 'VerifyCode is : ' + this.state.verifycode)
    this.props.goEvent(firstname, lastname, relation, tel, verifycode, statusVerify);
    this.props.setHelp({ firstname, lastname, relation, tel,verifycode });
    
  };

  render() {
    let { firstname, lastname, relation, tel } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image
              source={require("../icon/heartbeat.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.titleText}>กรณีฉุกเฉิน</Text>
        </View>
        {/* <View style={styles.addressContainer}> */}
        <Text style={styles.headForm}>ชื่อ-นามสกุล</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.ชื่อ</Label>
            <Input
              onChangeText={firstname => this.setState({ firstname })}
            />
          </Item>
        </Form>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.นามสกุล</Label>
            <Input
              onChangeText={lastname => this.setState({ lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>หมายเลขโทรศัพท์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.090-xxxxxx</Label>
            <Input
              onChangeText={tel => this.setState({ tel })}
            />
          </Item>
        </Form>
        <View style={styles.viewPicker}>
          <Text style={styles.headForm}>ความสัมพันธ์</Text>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="เลือกความสัมพันธ์"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={styles.picker}
              selectedValue={this.state.relation}
              onValueChange={(itemValue, itemIndex) => this.setState({ relation: itemValue })}
            >
              <Picker.Item label="ความสัมพันธ์" value="ความสัมพันธ์" />
              <Picker.Item label="พ่อแม่" value="พ่อแม่" />
              <Picker.Item label="ญาติ" value="ญาติ" />
              <Picker.Item label="เพื่อน" value="เพื่อน" />
            </Picker>
          </Form>
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.sendData(firstname, lastname, relation, tel)}
          >
            <Text style={styles.textButton}>ยืนยัน</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  textTitle: {
    backgroundColor: "#fc561f",
    padding: 10,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 15,
    fontFamily: "kanit",
    color: "#fc561f"
  },
  contectTitle: {
    alignItems: "center"
  },
  icon: {
    width: 25,
    height: 25
  },
  textInput: {
    borderColor: "#FC561F",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    height: 35,
    marginTop: 15,
    fontFamily: "kanit"
  },

  submitContainer: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 30
  },
  buttonContainer: {
    height: 40,
    width: "100%",
    backgroundColor: "#FC561F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  textButton: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
    fontFamily: "kanit"
  },
  viewPicker: {
    flexDirection: 'row'
  },
  picker: {
    paddingTop: 15,
    padding: 30
  },

  headForm: {
    fontFamily: 'kanit',
    fontSize: 16,
    paddingTop: 20
  },
  textLabel: {
    fontSize: 14,
    fontFamily: 'kanit'
  }
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHelp: help => {
      dispatch({
        type: "setHelp",
        payload: help
      });
    },
    setVerify: verify => {
      dispatch({
        type: "setVerify",
        payload: verify
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormAddressRegister);
