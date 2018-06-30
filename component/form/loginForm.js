import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';

export default class LoginForm extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="เลขบัตรประชาชน"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput}
          onChangeText={(username) => this.setState({ username })}
          style={styles.input}
        />
        <TextInput
          placeholder="รหัสผ่าน"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          onChangeText={(password) => this.setState({ password })}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,

  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    opacity: 0.8,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    height: 40,
    width: '75%',
    backgroundColor: '#4CD946',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',

  }

})
