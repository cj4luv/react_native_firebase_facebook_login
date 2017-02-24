import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import Button from '../../../../components/buttons/Button';
import CheckButton from '../../../../components/buttons/CheckButton';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

import * as firebase from 'firebase';

const nickNameValid = /^[가-힣a-zA-Z0-9]{2,5}$/;

class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      userEmail: this.props.userEmail,
      password: this.props.password,
      nickName: '',

      isVisble: false,

      validCheckMessage: '유효성검사 결과 경고메세지가 보여지는 부분',
      validCheckMail: '이메일 인증 유무 판단'
    }
  }

  _onAuthStateChanged() {
    console.log('onAuth')
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
          this.setState({validCheckMail:'email 인증이 되지 않으셨습니다.'})
        }
        if(emailVerified) {
          console.log('email 인증이 된 상태입니다.')
        }
      } else {
        console.log('user 정보를 가져올수 없습니다.')
      }
    })
  }

  //현재 로그인한 사용자 가져오기 인증 여부 검사
  componentWillMount() {
    this._onAuthStateChanged();

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
        Actions.checkedEmail();
      }
      if(errorCode === 'auth/invalid-email') {
        console.log('정상적인 이메일주소를 기입해주세요')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:'center', marginTop: 100, marginBottom: 250}}>
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({nickName: text})}
            placeholder='닉네임'
            value={this.state.nickName}
          />
          <Text>{this.state.validCheckMessage}</Text>

          <CheckButton text='약관동의' checked={this.state.isVisble} onChange={()=>{this.setState({isVisble:true})}}/>
          <Text>{this.state.validCheckMessage}</Text>
        </View>

        <Text>{this.state.validCheckMail}</Text>

        <Button onPress={()=> {
          if(nickNameValid.test(this.state.nickName) && this.state.isVisble) {
            this._firebaseSignUp(this.state.userEmail, this.state.password);
          } else if(!nickNameValid.test(this.state.nickName)) {
            console.log('닉네임은 최소 2자리에서 최대 5자리로 입력해주세요');
          } else if(!this.state.isVisble) {
            console.log('약관에 동의 해주세요');
          }
        }}> 회원가입 </Button>
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

module.exports = SignUp;
