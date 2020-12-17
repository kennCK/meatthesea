import React, {Component} from 'react';
import {SafeAreaView, View, Text, Dimensions} from 'react-native';
import _ from 'lodash';
import styles from './Style';
import Pagination from './pickUpCrockeryPagination';
import ScheduledTab from 'modules/pickupCrockery/tabs/ScheduledTab';
import PendingTab from 'modules/pickupCrockery/tabs/PendingTab';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
const height = Math.round(Dimensions.get('window').height);

class PickupCrockery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      orders: [],
      orderLength: 0,
      pageNumber: 1,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    this.setState({
      isLoading: true,
    });
    Api.getRequest(
      Routes.ordersRetrieve + '?limit=' + 1 + '&page=' + this.state.pageNumber,
      response => {
        this.setState(prevState => ({
          orders: _.uniqBy([...this.state.orders, ...response.orders], 'id'),
          isLoading: false,
        }));
      },
      error => {
        console.log('error', error);
      },
    );
  };

  handlePagination = () => {
    this.setState({pageNumber: this.state.pageNumber + 1}, () => {
      this.getOrders();
    });
  };

  resetPage = () => {
    this.setState({
      pageCount: 0,
    });
  };

  onTabChange = i => {
    this.setState({index: i});
  };

  getCurrentTab = () => {
    let tab;
    switch (this.state.index) {
      case 0:
        tab = (
          <ScheduledTab
            height={height}
            isLoading={this.state.isLoading}
            orders={this.state.orders}
            handlePagination={this.handlePagination}
            resetPage={this.resetPage}
            isLoading={this.state.isLoading}
            navigation={this.props.navigation}
          />
        );
        break;
      case 1:
        tab = (
          <PendingTab
            height={height}
            isLoading={this.state.isLoading}
            orders={this.state.orders}
            handlePagination={this.handlePagination}
            resetPage={this.resetPage}
            isLoading={this.state.isLoading}
            withIcon={true}
            navigation={this.props.navigation}
          />
        );
        break;
      default:
        break;
    }
    return tab;
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Pagination
          activeIndex={this.state.index}
          onChange={this.onTabChange}
          notificationTitle={'PENDING'}
          notificationCount={this.state.orders.length}
        />
        <View>{this.getCurrentTab()}</View>
      </View>
    );
  }
}

export default PickupCrockery;
