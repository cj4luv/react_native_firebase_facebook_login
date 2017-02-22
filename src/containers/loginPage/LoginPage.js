import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Button from '../../components/buttons/Button';
import FirebaseAuthFBLogin from '../../components/loginBtn/FirebaseAuthFBLogin';

import Config from './constants';

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';


class LoginPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <FirebaseAuthFBLogin config={Config.cfg_firebase_cho} btnText='페이스북 로그인' />
        <Button onPress={()=>Actions.emailReg()}>이메일 로그인</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  }
});

module.exports = LoginPage;
