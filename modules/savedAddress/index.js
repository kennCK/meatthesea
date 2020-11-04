import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
const width = Math.round(Dimensions.get('window').width);

const dummyData = [
  {
    addressType: 'home',
    address: '1a, Centre Stage Tower 1',
  },
  {
    addressType: 'office',
    address: '2b, Centre Stage Tower 2',
  },
];
class SavedAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: 0,
    };
  }

  selectHandler = index => {
    this.setState({selectedTile: index});
  };

  render() {
    return (
      <View style={styles.SavedAddressContainer}>
        <View>
          {dummyData.map((data, index) => {
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
          <CustomButton buttonColor="#0064B1" buttonText="+ ADD ADDRESS" />
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
