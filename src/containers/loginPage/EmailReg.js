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

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import FirebaseAuthFBLogin from '../../components/loginBtn/FirebaseAuthFBLogin';

import * as firebase from 'firebase';
import Config from './constants';

const loginApp = firebase.initializeApp(Config.cfg_firebase_cho, "Secondary");

class EmailReg extends Component {
  constructor(props){
    super(props);

    this.state = {
      userEmail: '',
      password: '',
    }
  }

  _sendPasswordReset(email) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      console.log('reset password');
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

  //이메일 주소 인증 메일 보내기
  _sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then((user) => {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    }).catch((error)=>{
      console.log(error);
    });
    // [END sendemailverification]
  }

  //현재 로그인한 사용자 가져오기 인증 여부 검사
  componentWillMount() {
    console.log('')
    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;

        if(!emailVerified) {
          console.log('email 인증이 되지 않으셨습니다.')
        }
        if(emailVerified) {
          console.log('email 인증이 된 상태입니다.')
        }
      } else {
        console.log('user 정보를 가져올수 없습니다.')
      }
    })
  }

  // 회원 가입 하기
  _firebaseSignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      this._sendEmailVerification()
      console.log('회원 가입이 되셨습니다.')
    }).catch((error) => {

      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorMessage);
    })
  }

  // 로그인 하기
  _firebaseSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        // 이메인증 확인
        // if(user.emailVerified){
        //   alert('이메일이 정상 적으로 인증 되어 로그인 되셨습니다.')
        // } else {
        //   alert('이메일 인증을 해주세요')
        // }

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
            onChangeText={(text) => this.setState({userEmail: text})}
            placeholder='이메일'
            value={this.state.userEmail}
          />
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({password: text})}
            placeholder='비밀번호' secureTextEntry={true}
            value={this.state.password}
          />
        </View>

        <Button onPress={()=>this._firebaseSignIn(this.state.userEmail, this.state.password)} >로그인</Button>
        <Button onPress={()=>this._firebaseSignUp(this.state.userEmail, this.state.password)} >가입하기</Button>
        <Button onPress={()=>firebase.auth().signOut()} >로그아웃</Button>
        <Button onPress={()=>Actions.password()} >다음</Button>

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

module.exports = EmailReg;
