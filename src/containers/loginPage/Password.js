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

class Password extends Component {
  constructor(props){
    super(props);

    this.state = {
      password: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:'center', marginTop: 100, marginBottom: 250}}>
          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({password: text})}
            placeholder='비밀번호' secureTextEntry={true}
            value={this.state.password}
          />
        </View>

        <Button>로그인</Button>
        <Button>비밀번호 찾기</Button>
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
    textAlign:'center',

  }
});

module.exports = Password;
