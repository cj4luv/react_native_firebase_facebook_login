import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Button from '../../components/buttons/Button';
import FirebaseAuthFBLogin from '../../components/loginBtn/FirebaseAuthFBLogin';

const config = {
  apiKey: "AIzaSyBBAvfR4ffQmKtg2GQTqAi3htH3R2ehvqw",
  authDomain: "roompackersdb.firebaseapp.com",
  databaseURL: "https://roompackersdb.firebaseio.com",
  storageBucket: "roompackersdb.appspot.com",
  messagingSenderId: "332389298611"
}

class LoginPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <FirebaseAuthFBLogin config={config} />
        <Text>어여쁜 민영님!!12123123</Text>
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

module.exports = LoginPage;
