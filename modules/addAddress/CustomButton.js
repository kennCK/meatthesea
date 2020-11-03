import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

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

const styles = StyleSheet.create({
  CustomButtonContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonTextContainer: {},
  ButtonTextStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});

export default CustomButton;
