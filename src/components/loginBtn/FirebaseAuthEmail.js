import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

import Button from '../buttons/Button';

import * as firebase from 'firebase';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

const emailValidChecked = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
const passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

class FirebaseAuthEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      password: '',
      passwordChecked:'',

      validCheckMessage: '유효성검사 결과 경고메세지가 보여지는 부분',
      passwordValidCheckMessage:'유효성검사 결과 경고메세지가 보여지는 부분' ,
    }

    //파이어베이스 초기화
    const firebaseApp = firebase.initializeApp(this.props.config);
  }

  //현재 로그인한 사용자 가져오기 인증 여부 검사
  componentWillMount() {
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

  // 이메일 검사 체크
  _fetchProvidersForEmail(email) {
    firebase.auth().fetchProvidersForEmail(email).then((result)=> {
      if(emailValidChecked.test(email)) {
        if(result.length === 0) {
          /* 회원가입으로 */
          console.log('가입하세요');
        } else if(result[0] === 'password') {
          console.log('이미 등록된 이메일입니다.');
        } else if(result[0] ==='facebook.com') {
          this.setState({validCheckMessage: '페이스북으로 가입하셨습니다.'})
        }
      } else {
        this.setState({validCheckMessage: '정상적인 이메일 양식을 적어주세요'})
        console.log('esel')
      }
    })
    .catch((error)=>{
      if(error.code === 'auth/invalid-email'){
        this.setState({validCheckMessage: '유효한 이메일 주소를 입력하지 않았습니다.'})
      }
      console.log(error);
    })
  }

  //비밀번호 유효성 검사
  _emailPasswordCheckedSignUp(email ,ps1, ps2) {
    firebase.auth().fetchProvidersForEmail(email).then((result)=> {
      if(emailValidChecked.test(email)) {

        if(result.length === 0) {
          /* 회원가입으로 */
          console.log('가입하세요');
          if(passwordRules.test(ps1) && passwordRules.test(ps2) ) {
            if(ps1 === ps2) {
              console.log('비밀번호 일치')
              this._firebaseSignUp(email, ps1)
            } else {
              console.log('두개의 비밀번호가 일치하지 않습니다.')
            }
          } else {
            console.log('비밀번호는 6~16자리로 특수문자 하나를 입력해 생성해주세요');
          }

        } else if(result[0] === 'password') {
          console.log('이미 등록된 이메일입니다.');
        } else if(result[0] ==='facebook.com') {
          this.setState({validCheckMessage: '페이스북으로 가입하셨습니다.'})
        }
      } else {
        this.setState({validCheckMessage: '정상적인 이메일 양식을 적어주세요'})
        console.log('esel')
      }
    })
    .catch((error)=>{
      if(error.code === 'auth/invalid-email'){
        this.setState({validCheckMessage: '유효한 이메일 주소를 입력하지 않았습니다.'})
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
      alert('인증 이메일을 발송했습니다.');
      // [END_EXCLUDE]
    }).catch((error)=>{
      console.log(error);
    });
    // [END sendemailverification]
  }

  // 회원 가입 하기
  _firebaseSignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      this._sendEmailVerification();
      console.log('회원 가입이 되셨습니다.');
      //Actions.checkedEmail();
    }).catch((error) => {

      let errorCode = error.code;
      let errorMessage = error.message;

      if(errorCode === 'auth/email-already-in-use') {
        console.log('이미 가입된 이메일입니다.')
      }
      if(errorCode === 'auth/invalid-email') {
        console.log('정상적인 이메일주소를 기입해주세요')
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

  // 로그인 하기
  _firebaseSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        // 이메인증 확인
        if(user.emailVerified) {
          console.log('이메일이 정상 적으로 인증 되어 로그인 되셨습니다.');
          alert('로그인이 되습니다.')
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
            onChangeText={(text) => this.setState({userEmail: text})}
            placeholder='이메일을 입력하세요'
            value={this.state.userEmail}
          />
          <Text>{this.state.validCheckMessage}</Text>

          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({password: text})}
            placeholder='비밀번호' secureTextEntry={true}
            value={this.state.password}
          />
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({passwordChecked: text})}
            placeholder='비밀번호 확인' secureTextEntry={true}
            value={this.state.passwordChecked}
          />
          <Text>{this.state.passwordValidCheckMessage}</Text>

        </View>

        <Button onPress={()=>this._firebaseSignIn(this.state.userEmail, this.state.password)} >로그인</Button>
        <Button onPress={()=>this._emailPasswordCheckedSignUp(this.state.userEmail, this.state.password, this.state.passwordChecked)} >회원가입</Button>

        <Button onPress={()=>this._sendPasswordReset(this.state.userEmail)}>비밀번호 재설정 이메일 보내기</Button>
        <Button onPress={()=>this._fetchProvidersForEmail(this.state.userEmail)}>이메일 주소 체크</Button>
        <Button onPress={()=>firebase.auth().signOut()} >로그아웃</Button>
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

module.exports = FirebaseAuthEmail;
