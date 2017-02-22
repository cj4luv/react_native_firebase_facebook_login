import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Button from '../buttons/Button';

import FBSDK, {
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk';

import * as firebase from 'firebase';

class FirebaseAuthFBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookToken: 'facebook token',
      userName: 'user name',
      userEmail:'email',
      firebaseUid:'firebase uid',
      photoURL:'photoURL',

      isChangeView: false,
    }
    //init firebase data
    const firebaseApp = firebase.initializeApp(this.props.config);
  }

  _onPressLogin() {
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
              firebase.auth().signInWithCredential(credential).then((result) => {
                //파이어베이스 인증 로그인 성공 시
                this.setState({
                  facebookToken: accessToken,
                  userName: result.displayName,
                  userEmail:result.email,
                  firebaseUid:result.uid,
                  photoURL:'https://graph.facebook.com/v2.8/me/picture?width=400&access_token=' + accessToken,
                  isChangeView: true,
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

  showUserInfo() {
    let user = firebase.auth().currentUser;
    if(user) {
      console.log('user');
      console.log(this.state);
      return
    } else {
      console.log('plz sign up');
    }
  }

  _onPressLogOut() {
    firebase.auth().signOut().then( () => {
      // Sign-out successful.
      console.log("sign Out");
      LoginManager.logOut();

      this.setState({
        isChangeView: false,
      });
    }, (error) => {
      // An error happened.
      console.log(error);
    });
  }

  render() {
    if(this.state.isChangeView === false) {
      return (
        <View style={styles.container}>
          <Button onPress={()=>this._onPressLogin()}>
            {this.props.btnText}
          </Button>
          <Button onPress={()=>this.showUserInfo()}>
            Login Checker
          </Button>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Image style={{ width:400, height:400, borderWidth:1 }} source={{uri:this.state.photoURL}}></Image>
          <Text>{this.state.userName}</Text>
          <Text>{this.state.userEmail}</Text>
          <Text>{this.state.firebaseUid}</Text>
          <Text>{this.state.facebookToken}</Text>
          <Button onPress={()=>this._onPressLogOut()}>
            Facebook Login out
          </Button>
          <Button onPress={()=>this.showUserInfo()}>
            Login Checker
          </Button>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
  }
});

module.exports = FirebaseAuthFBLogin;
