import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import Schedule from 'modules/scheduledPickup/Schedule.js';
import ProgressBar from 'modules/scheduledPickup/ProgressBar.js';
import styles from 'modules/scheduledPickup/Style.js';

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
      <View style={styles.MainContainer}>
        <View style={styles.OrderNumberContainer}>
          <Text style={styles.OrderNumberStyle}>Order Number 1234</Text>
        </View>

        <View style={styles.ScheduleDetailsContainer}>
          <ProgressBar />
          <Schedule address={this.state.address} />
        </View>
      </View>
    );
  }
}

export default ScheduledPickup;
