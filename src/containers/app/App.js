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

import RouterContainer from '../routePage/RouterContainer'

class App extends Component {
  render() {
    return (
      <RouterContainer/>
    );
  }
}

module.exports = App;
