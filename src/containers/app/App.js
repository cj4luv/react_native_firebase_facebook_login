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

const config = {
  apiKey: "AIzaSyBBAvfR4ffQmKtg2GQTqAi3htH3R2ehvqw",
  authDomain: "roompackersdb.firebaseapp.com",
  databaseURL: "https://roompackersdb.firebaseio.com",
  storageBucket: "roompackersdb.appspot.com",
  messagingSenderId: "332389298611"
}

import LoginPage from '../loginPage/LoginPage'

class App extends Component {
  render() {
    return (
      <LoginPage config={config} />
    );
  }
}

module.exports = App;
