import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Button from '../../components/buttons/Button';

import FBSDK, {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBBAvfR4ffQmKtg2GQTqAi3htH3R2ehvqw",
  authDomain: "roompackersdb.firebaseapp.com",
  databaseURL: "https://roompackersdb.firebaseio.com",
  storageBucket: "roompackersdb.appspot.com",
  messagingSenderId: "332389298611"
}

var firebaseApp = firebase.initializeApp(config);
var auth = firebaseApp.auth();

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookToken: 'facebook token',
      userName: 'user name',
      userEmail:'email',
      firebaseUid:'firebase uid',
      photoURL:'photoURL',
    }
  }

  //페이스북 연동 로그인
  _fbLogin() {
    //페이스북 SDK Login Manager 요청 할 권한과 함께 호출
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if(result.isCancelled) {
          //facebook sign up cancel
        }
        else {
          //facebook Token 가져오기
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              //페이스북 토큰
              let accessToken = data.accessToken.toString();

              //파이베이스와 페이스북 연동 관찰자 선언
              let credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

              //페이스북 엑세스토큰으로 인증 과정 부분
              auth.signInWithCredential(credential).then((result) => {
                //파이어베이스 인증 로그인 성공 시
                this.setState({
                  facebookToken: accessToken,
                  userName: result.displayName,
                  userEmail:result.email,
                  firebaseUid:result.uid,
                  photoURL:'https://graph.facebook.com/v2.8/me/picture?width=400&access_token=' + accessToken,
                });
              })
              //파이어베이스 로그인 성공했으나 에러 발생시
              .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                let email = error.email;
                let credential = error.credential;

                if (errorCode === 'auth/account-exists-with-different-credential') {
                  alert('You have already signed up with a different auth provider for that email.');
                  // If you are using multiple auth providers on your app you should handle linking
                  // the user's accounts here.
                } else {
                  console.error(error);
                }
              });
            }
          )
          //페이스북 토큰져오기 실패 했을 경우
          .catch((error) => this.onError && this.onError(error));
        }
      },
      //페이스북 로그인 조차 시도 안될때 발생되는 에러출력
      (error) => {
        console.log('Login failed with error ' + error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{borderWidth:1, width:400, height:400}} source={{url:this.state.photoURL}}></Image>
        <Text>{this.state.userName}</Text>
        <Text>{this.state.userEmail}</Text>
        <Text>{this.state.firebaseUid}</Text>
        <Button style={{borderWidth:1}} onPress={()=>this._fbLogin()}>
          Facebook Login
        </Button>
        <Text>{this.state.facebookToken}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});

module.exports = LoginPage;
