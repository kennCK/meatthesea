import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
const width = Math.round(Dimensions.get('window').width);

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <View style={styles.AddAddressContainer}>
        <View>
          <AddressCard addressType="home" address="1a, Centre Stage Tower 1" />
          <AddressCard
            addressType="office"
            address="2b, Centre Stage Tower 2"
          />
        </View>
        <View style={styles.ButtonContainer}>
          <CustomButton buttonColor="#0064B1" buttonText="+ ADD ADDRESS" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddAddressContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  AddressCardContainer: {},
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: '3%',
    width: width,
    borderTopWidth: 1,
    borderColor: '#F3F3F3',
    paddingTop: '3%',
  },
});

export default AddAddress;
