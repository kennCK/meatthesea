import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import GooglePlacesAutoCompleteWithMap from 'components/Location/GooglePlacesAutoCompleteWithMap.js';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  render() {
    return (
      <View style={styles.AddAddressContainer}>
        <GooglePlacesAutoCompleteWithMap
          onFinish={location => {
            console.log('location', location);
            this.setState({location: location});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddAddressContainer: {
    justifyContent: 'flex-start',
    height: '100%',
  },
});

export default AddAddress;
