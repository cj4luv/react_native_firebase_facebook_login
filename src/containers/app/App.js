import React, { Component } from 'react';
import {
  StyleSheet,
  AlertIOS,
  NavigatorIOS,
  TouchableHighlight,
  ScrollView,
  View,
  Text
} from 'react-native';


import LoginPage from '../loginPage/LoginPage'

class App extends Component {
  render() {
    return (
      <LoginPage/>
    );
  }
}

module.exports = App;
