import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

class CheckButton extends React.Component {

  render() {

    return (
      <View style={this.props.baseRowStyle}>
        <TouchableOpacity onPress={this.props.onChange} style={{flexDirection: 'row', justifyContent:'center'}} >
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            width: PIXEL_X * 20,
            height: PIXEL_Y * 20,
            borderColor:'#1a8793',
            borderRadius: 50,
            backgroundColor: this.props.checked ? '#1a8793':'#fff',
          }}>
            <View style={this.props.checked ? styles.checked:''}></View>
          </View>
          <View style={{justifyContent:'center'}}>
            <Text style={this.props.textStyle}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  checked: {
    width: PIXEL_X * 6,
    height: PIXEL_Y * 10,
    borderColor: '#fff',
    borderTopWidth: 0,
    borderRightWidth: PIXEL_X * 1.5,
    borderBottomWidth: PIXEL_X * 1.5,
    borderLeftWidth: 0,
    transform: [
      { translateY: -1 },
      { rotate: '45deg'},
    ]
  },
})

export default CheckButton;
