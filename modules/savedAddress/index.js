import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
const width = Math.round(Dimensions.get('window').width);


class SavedAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: 0,
      addresses: []
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (params.user) {
      let { addresses } = params.user
      if (addresses) {
        addresses.map(address => {
          this.setState({
            addresses: [...this.state.addresses, {
              addressType: address.company,
              address: address.address1 ? address.address1 : address.address2
            }]
          })
        });

      }
    }
  }
  selectHandler = index => {
    this.setState({ selectedTile: index });
  };
  redirect = route => {
    this.props.navigation.push(route);
  };
  render() {
    return (
      <View style={styles.SavedAddressContainer}>
        <View>
          {this.state.addresses.map((data, index) => {
            return (
              <AddressCard
                key={index}
                id={index}
                selectedTile={index === this.state.selectedTile ? true : false}
                addressType={data.addressType}
                address={data.address}
                onSelect={this.selectHandler}
              />
            );
          })}
        </View>
        <View style={styles.ButtonContainer}>
          <CustomButton
            buttonColor="#0064B1"
            buttonText="+ ADD ADDRESS"
            onPress={() => {
              this.redirect('addAddressScreen');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SavedAddressContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
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

export default SavedAddress;
