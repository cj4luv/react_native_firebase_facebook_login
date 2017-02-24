import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

import Button from '../../../components/buttons/Button';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

import * as firebase from 'firebase';

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

class Password extends Component {
  constructor(props){
    super(props);

    this.state = {
      userEmail: this.props.userEmail,
      password: '',

      validCheckMessage: '유효성검사 결과 경고메세지가 보여지는 부분',
    }
  }

  // 로그인 하기
  _firebaseSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        // 이메인증 확인
        if(user.emailVerified) {
          console.log('이메일이 정상 적으로 인증 되어 로그인 되셨습니다.');
          Actions.mainPage();
        } else {
          this.setState({validCheckMessage:'이메일 인증을 해주세요'});
        }

    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:'center', marginTop: 100, marginBottom: 250}}>
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({password: text})}
            placeholder='비밀번호' secureTextEntry={true}
            value={this.state.password}
          />
          <Text>{this.state.validCheckMessage}</Text>
        </View>

        <Button onPress={()=>this._firebaseSignIn(this.state.userEmail, this.state.password)} >로그인</Button>
        <Button onPress={()=>Actions.sendPassword()}> 비밀번호가 기억나지 않습니다 </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  textInput: {
    width: WINDOW_WIDTH - 40,
    height: 50,
    borderWidth: 1,
    textAlign:'center',
  }
});

module.exports = Password;
