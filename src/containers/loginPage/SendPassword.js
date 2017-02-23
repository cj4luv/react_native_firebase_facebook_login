import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

import Button from '../../components/buttons/Button';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

const emailValidChecked = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import FirebaseAuthFBLogin from '../../components/loginBtn/FirebaseAuthFBLogin';

import * as firebase from 'firebase';

class SendPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      userEmail: '',
      password: '',

      validCheckMessage: '유효성검사 결과 경고메세지가 보여지는 부분',
    }
  }

  // 이메일 검사 체크
  _fetchProvidersForEmail(email) {
    firebase.auth().fetchProvidersForEmail(email).then((result)=> {
      if(emailValidChecked.test(email)) {
        if(result.length === 0) {
          /* 회원가입으로 */
          console.log('가입하세요');
        } else if(result[0] === 'password') {
          this._sendPasswordReset(email)
          console.log('send eail' );
        } else if(result[0] ==='facebook.com') {
          this.setState({validCheckMessage: '페이스북으로 로그인를 이용해 주세요 ^^'})
        }
      } else {
        this.setState({validCheckMessage: '정상적인 이메일 양식을 적어주세요'})
      }
    })
    .catch((error)=>{
      if(error.code === 'auth/invalid-email'){
        this.setState({validCheckMessage: '유효한 이메일 주소를 입력하지 않았습니다.'})
      }
      console.log(error);
    })
  }

  _sendPasswordReset(email) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      console.log('reset password');
      alert('정상적으로 비밀번호 초기화 이메일 발송했습니다.')
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{alignItems:'center', marginTop: 100, marginBottom: 250}}>
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({userEmail: text})}
            placeholder='이메일을 입력하세요'
            value={this.state.userEmail}
          />
          <Text>{this.state.validCheckMessage}</Text>
        </View>

        <Button onPress={()=>this._fetchProvidersForEmail(this.state.userEmail)}>비밀번호 재설정 이메일 보내기</Button>
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
  },

});

module.exports = SendPassword;
