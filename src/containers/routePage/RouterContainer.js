import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  BackAndroid
} from 'react-native';
import {
  Actions,
  Scene,
  Router,
  ActionConst
} from 'react-native-router-flux';

import LoginPage from '../loginPage/LoginPage';
import CheckedEmail from '../loginPage/CheckedEmail';
import Password from '../loginPage/Password';
import SendPassword from '../loginPage/SendPassword';

import SignUpPassword from '../loginPage/signUp/SignUpPassword';
import SignUp from '../loginPage/signUp/SignUp';

import MainPage from '../mainPage/MainPage';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

const FONT_SC = Platform.OS === 'android' ? PIXEL_X * 0.9:1;

class RouterContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Scene key="loginPage" component={LoginPage} title="opening" initial/>
        <Scene key="checkedEmail" component={CheckedEmail} title="email_sign_in" />
        <Scene key="password" component={Password} title="password"/>
        <Scene key="sendPassword" component={SendPassword} title="Send Password"/>

        <Scene key="signUpPassword" component={SignUpPassword} title="Sign Up Password"/>
        <Scene key="signUp" component={SignUp} title="Sign Up"/>

        <Scene key="mainPage" component={MainPage} title="main Page"/>
      </Router>
    );
  }
}

// 라우터 네비게이터 마진값 CSS
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#ffffff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 :PIXEL_Y * 64 * FONT_SC;
  }
  return style
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor:'#ffffff',
    height: PIXEL_Y * 64 * FONT_SC,
  },
  title:{
    marginTop: Platform.OS === 'android' ? 2:0,
    width: WINDOW_WIDTH,
    fontSize: PIXEL_X * 17 * FONT_SC,
    textAlign: 'center',
  },
  titleWrapperStyle:{
    borderWidth: 1,
  },
  leftButtonIconStyle: {
    width: PIXEL_X * 12.6,
    height: PIXEL_Y * 21.2,
    tintColor: "#ff2d55",
  }
});

module.exports = RouterContainer;
