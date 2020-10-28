import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styles from './Style';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
class OrderTile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.OrderContainer}>
        {this.props.withIcon && (
          <FontAwesomeIcon
            icon={faCircle}
            size={12}
            style={{color: '#FF0045', paddingRight: 20}}
          />
        )}
        <Text style={styles.OrderNumberStyle}>
          Order no {this.props.orderNumber}
        </Text>
        <View style={styles.OrderDateContainer}>
          <Text style={styles.OrderDateStyle}>{this.props.orderDate}</Text>
        </View>
      </View>
    );
  }
}

export default OrderTile;
