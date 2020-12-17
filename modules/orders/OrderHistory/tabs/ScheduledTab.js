import React, {Component} from 'react';
import {Text, FlatList, View, ScrollView} from 'react-native';
import OrderTile from 'modules/pickupCrockery/OrderTile';
import {ActivityIndicatorComponent} from 'react-native';

class ScheduledTab extends Component {
  constructor(props) {
    super(props);
  }

  displayOrders = () => {
    console.log('displayOrders');
    let orders = this.props.orders;
    return orders.map((order, index) => {
      var date = new Date(order.paid_date_utc).toLocaleDateString();
      return (
        <OrderTile
          key={index}
          withIcon={this.props.withIcon}
          orderNumber={order.id}
          orderDate={date}
          data={order}
          navigate={() => this.props.navigation.navigate('scheduledPickupStack')}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView
        style={{height: '100%'}}
        onScroll={event => {
          let scrollingHeight =
            event.nativeEvent.layoutMeasurement.height +
            event.nativeEvent.contentOffset.y;
          let totalHeight = event.nativeEvent.contentSize.height - 20;
          if (event.nativeEvent.contentOffset.y <= 0) {
            if (this.props.isLoading == false) {
              // this.retrieve(false)
            }
          }
          if (scrollingHeight >= totalHeight + 10) {
            if (this.props.isLoading == false) {
              this.props.handlePagination();
            }
          }
        }}>
        <View style={{height: '100%', minHeight: this.props.height}}>
          {this.displayOrders()}
        </View>
      </ScrollView>
    );
  }
}

export default ScheduledTab;
