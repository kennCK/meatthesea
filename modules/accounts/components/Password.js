import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles } from 'common';
class PasswordWithIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      input: null
    }
  }

  setInput(input) {
    this.setState({
      input: input
    })
    this.props.onTyping(input)
  }

  render() {
    let { placeholderTextColor, style, placeholder } = this.props
    return (
      <View style={{
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextInput
          {...{ placeholderTextColor }}
          style={style}
          onChangeText={(input) => this.setInput(input)}
          value={this.state.input}
          placeholder={placeholder ? placeholder : '*******'}
          secureTextEntry={this.state.flag == false ? true : false}
        />
        <TouchableHighlight onPress={() => this.setState({
          flag: !this.state.flag
        })}
          style={{
            position: 'absolute',
            right: 10,
            top: 20
          }}
          underlayColor={Color.white}
        >
          <FontAwesomeIcon  color={Color.white} icon={this.state.flag == false ? faEyeSlash : faEye} size={20} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default PasswordWithIcon;