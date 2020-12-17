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
    };
  }

  async componentDidMount() {
    await this.getOrders();
  }

  getOrders = async () => {
    await Api.getRequest(
      Routes.ordersRetrieve + '?limit=' + 1,
      response => {
        const address =
          response.orders[0].shipping_address.address1 +
          ', ' +
          response.orders[0].shipping_address.city +
          ', ' +
          response.orders[0].shipping_address.province;
        this.setState(
          {
            address,
          },
          () => {
            console.log('RESPONSE', this.state.address);
          },
        );
      },
      error => {
        console.log('error', error);
      },
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={[styles.MainContainer, {
          minHeight: height
        }]}>
          <View style={styles.OrderNumberContainer}>
            <Text style={styles.OrderNumberStyle}>Order Number 1234</Text>
          </View>

          <View style={styles.ScheduleDetailsContainer}>
            <ProgressBar />
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