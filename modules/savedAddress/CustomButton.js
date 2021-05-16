import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './Styles';
import { Color } from 'common';

class CustomButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
        }}
        style={[
          styles.CustomButtonContainer,
          {backgroundColor: this.props.buttonColor},
        ]}>
        <View style={styles.ButtonTextContainer}>
          <Text style={{
            ...styles.ButtonTextStyle,
            fontSize: 13,
            color: Color.warning
          }}>{this.props.buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CustomButton;
