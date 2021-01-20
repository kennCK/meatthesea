import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import styles from './Style';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
class OrderTile extends Component {
  constructor(props) {
    super(props);
  }

  setSelectedOrder(item){
    const { setOrder } = this.props;
    setOrder(item)
    this.props.navigate()
  }
  render() {
    return (
      <TouchableHighlight style={{
        width: '100%'
      }}
      onPress={() => {
        this.setSelectedOrder(this.props.data)
      }}
      >
         <View style={styles.OrderContainer}>
          {this.props.withIcon && (
              <FontAwesomeIcon
                icon={faCircle}
                size={12}
                style={{color: '#FF0045', paddingRight: 25}}
              />
            )}
            <Text style={styles.OrderNumberStyle}>
              Order no {this.props.orderNumber}
            </Text>
            <View style={styles.OrderDateContainer}>
              <Text style={styles.OrderDateStyle}>{this.props.orderDate}</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setOrder: order => dispatch(actions.setOrder(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTile);
