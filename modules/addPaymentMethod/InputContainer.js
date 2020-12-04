import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import styles from 'modules/addPaymentMethod/Styles.js';

class InputContainer extends Component {
  render() {
    return (
      <View style={styles.InputContainer}>
        <View style={styles.InputSubContainer}>
          <View style={styles.InputNameContainer}>
            <Text style={styles.InputNameTextStyle}>
              {this.props.inputName}
            </Text>
          </View>
          <View style={[styles.InputFieldContainer, {...this.props.style}]}>
            <TextInput
              placeholder={this.props.defaultValue}
              placeholderTextColor="#000000"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default InputContainer;
