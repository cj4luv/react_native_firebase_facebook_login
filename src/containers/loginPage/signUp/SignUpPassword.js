import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

import Button from '../../../components/buttons/Button';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

const passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

class SignUpPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      userEmail: this.props.userEmail,
      password: '',
      passwordChecked:'',

      validCheckMessage: '유효성검사 결과 경고메세지가 보여지는 부분',
    }
  }

  _passwordChecked(ps1, ps2) {
    if(passwordRules.test(ps1) && passwordRules.test(ps2) ) {
      if(ps1 === ps2) {
        console.log('비밀번호 일치')
        Actions.signUp({userEmail: this.state.userEmail, password:this.state.password});
      } else {
        console.log('두개의 비밀번호가 일치하지 않습니다.')
      }
    } else {
      console.log('비밀번호는 6~16자리로 특수문자 하나를 입력해 생성해주세요');
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
          <Text>{this.state.validCheckMessage}</Text>

          <TextInput style={styles.textInput}
            underlineColorAndroid='transparent' returnKeyType="done"
            onChangeText={(text) => this.setState({passwordChecked: text})}
            placeholder='비밀번호 확인' secureTextEntry={true}
            value={this.state.passwordChecked}
          />
          <Text>{this.state.validCheckMessage}</Text>
        </View>

        <Button onPress={()=>this._passwordChecked(this.state.password, this.state.passwordChecked)} >다음</Button>
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

module.exports = SignUpPassword;
