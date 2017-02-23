import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Button from '../../components/buttons/Button';

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

class MainPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>MainPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  }
});

module.exports = MainPage;
