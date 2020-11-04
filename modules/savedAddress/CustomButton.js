import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './Styles';

class CustomButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.CustomButtonContainer,
          {backgroundColor: this.props.buttonColor},
        ]}>
        <View style={styles.ButtonTextContainer}>
          <Text style={styles.ButtonTextStyle}>{this.props.buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CustomButton;
