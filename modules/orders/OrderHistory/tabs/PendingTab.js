import React, {Component} from 'react';
import {Text, FlatList, View, ScrollView} from 'react-native';
import OrderTile from '../OrderTile';
import {ActivityIndicatorComponent} from 'react-native';
import { connect } from 'react-redux';

class PendingTab extends Component {
  constructor(props) {
    super(props);
  }

  seeDetails = (data) => {
    const { setOrderDetails } = this.props
    setOrderDetails(data)
    this.props.navigation.navigate('orderDetailsStack')
  }

  displayOrders = () => {
    let orders = this.props.orders;
    if(orders.length > 0){
      return orders.map((order, index) => {
        var date = new Date(order.paid_date_utc).toLocaleDateString();
        return (
          <OrderTile
            key={index}
            withIcon={this.props.withIcon}
            orderNumber={order.id}
            orderDate={date}
            data={order}
            navigate={() => this.seeDetails(order)}
          />
        );
      });
    }
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

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setOrderDetails: (orderDetails) => dispatch(actions.setOrderDetails(orderDetails))
  };
};

export default connect( mapStateToProps,mapDispatchToProps)(PendingTab);
