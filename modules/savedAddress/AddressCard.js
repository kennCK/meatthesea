import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
class AddressCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.AddressCardContainer}
        onPress={() => {
          this.props.onSelect(this.props.id);
        }}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '85%',
              flexWrap: 'nowrap'
            }
          ]}
        >
          <View
            style={[
              {
                height: 18,
                width: 18,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#2C80BF',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {this.props.selectedTile && (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#2C80BF',
                }}
              />
            )}
          </View>
          <View style={styles.AddressTextContainer}>
            <Text style={styles.AddressTypeTextStyle}>
              {this.props.addressType}
            </Text>
            <Text style={styles.AddressTextStyle}>{this.props.address}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.toDeleteItem(this.props.id);
          }}
        >
          <View
            style={{
              padding: 20,
              marginRight: -15
            }}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              size={17}
              style={{
                color: '#2C80BF'
              }}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

export default AddressCard;
