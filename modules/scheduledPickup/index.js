import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';

import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import Schedule from 'modules/scheduledPickup/Schedule.js';
import ProgressBar from 'modules/scheduledPickup/ProgressBar.js';
import styles from 'modules/scheduledPickup/Style.js';
import {connect} from 'react-redux';
const height = Math.round(Dimensions.get('window').height);

class ScheduledPickup extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      order_number: null,
      crockeryStatus: ''
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    const {id} = this.props.navigation.state.params;
    Api.getRequest(
      Routes.ordersRetrieveById(id),
      response => {
        this.retrieveCrockery(response.orders[0].id);
        const address =
          response.orders[0].shipping_address.address1 +
          ', ' +
          response.orders[0].shipping_address.city +
          (response.orders[0].shipping_address.province ? ', ' + response.orders[0].shipping_address.province : '');
        this.setState(
          {
            address: address,
            order_number: response.orders[0].id
          },
          () => {
            console.log(':::RESPONSE::: ', response);
          },
        );
      },
      error => {
        console.log('error', error);
      },
    );
  };

  retrieveCrockery = (id) => {
    const {storeLocation} = this.props.state
    Api.getRequest(Routes.crockeryRetrieve + `?StoreId=${storeLocation.id}&OrderId=${id}`, response => {
      this.setState({crockeryStatus: response.crockery[0].crockery_status})
      console.log('CROCKERY RESPONSE: ', response)
    }, error => {
      console.log('Retrieve Crockery Error')
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.MainContainer, {
          minHeight: height
        }]}>
          <View style={styles.OrderNumberContainer}>
            <Text style={styles.OrderNumberStyle}>Order Number {this.state.order_number}</Text>
          </View>

          <View style={styles.ScheduleDetailsContainer}>
            <ProgressBar status={this.state.crockeryStatus} />
            <Schedule address={this.state.address} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setFilter: filter => dispatch(actions.setFilter(filter)),
    setCart: cart => dispatch(actions.setCart(cart)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduledPickup);