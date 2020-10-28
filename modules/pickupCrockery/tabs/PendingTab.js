import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';
import OrderTile from 'modules/pickupCrockery/OrderTile';

class PendingTab extends Component {
  render() {
    return (
      <FlatList
        data={this.props.orders}
        renderItem={({item}) => {
          return (
            <OrderTile
              withIcon={this.props.withIcon}
              orderNumber={item.orderNumber}
              orderDate={item.orderDate}
            />
          );
        }}
        keyExtractor={item => item.orderNumber}
      />
    );
  }
}

export default PendingTab;
