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

import FirebaseEmailLogin from '../../modules/firebaseEmailLogin/routePage/RouterContainer'

class App extends Component {
  render() {
    return (
      <FirebaseEmailLogin />
    );
  }
}

module.exports = App;
