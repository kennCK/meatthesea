import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class AddressCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.AddressCardContainer}>
        <View
          style={[
            {
              height: 18,
              width: 18,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#2C80BF',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#2C80BF',
            }}
          />
        </View>
        <View style={styles.AddressTextContainer}>
          <Text style={styles.AddressTypeTextStyle}>
            {this.props.addressType}
          </Text>
          <Text style={styles.AddressTextStyle}>{this.props.address}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size={17}
            style={{color: '#2C80BF'}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddressCardContainer: {
    marginVertical: '0%',
    marginHorizontal: '0%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F3F3',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    backgroundColor: '#F0FAFF',
  },
  AddressTextContainer: {
    paddingRight: '45%',
  },
  AddressTypeTextStyle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  AddressTextStyle: {},
});

export default AddressCard;
