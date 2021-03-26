import React, {Component} from 'react';
import {Text, FlatList, View, ScrollView} from 'react-native';
import OrderTile from '../OrderTile';
import {ActivityIndicatorComponent} from 'react-native';
import { connect } from 'react-redux';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import { Spinner } from 'components';

class PendingTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: false,
    }
  }

  seeDetails = (data) => {
    const { setOrderDetails } = this.props
    setOrderDetails(data)
    this.props.navigation.navigate('orderDetailsStack')
  }

  displayOrders = () => {
    if(this.props.orders.length > 0){
      return this.props.orders.map((order, index) => {
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
    const{isLoading} = this.state
    return (
      <ScrollView
        style={{height: '100%'}}
        showsVerticalScrollIndicator={false}
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
        {isLoading ? <Spinner mode="overlay"/> : null }
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
