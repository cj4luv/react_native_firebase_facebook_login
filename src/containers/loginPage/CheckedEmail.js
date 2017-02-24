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

import * as firebase from 'firebase';

class CheckedEmail extends Component {
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
          Actions.signUpPassword({userEmail:this.state.userEmail})
        } else if(result[0] === 'password') {
          Actions.password({userEmail:this.state.userEmail});
          console.log('move to password page ');
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


        <Button onPress={()=>this._fetchProvidersForEmail(this.state.userEmail)} >다음</Button>
        {/* <Button onPress={()=>this._firebaseSignUp(this.state.userEmail, this.state.password)}> 회원가입 </Button> */}
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

module.exports = CheckedEmail;
