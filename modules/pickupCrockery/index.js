import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import styles from './Style';
import Pagination from './pickUpCrockeryPagination';
import ScheduledTab from 'modules/pickupCrockery/tabs/ScheduledTab';
import PendingTab from 'modules/pickupCrockery/tabs/PendingTab';

const dummyData = [
  {
    orderNumber: '1234',
    orderDate: '01/01/2020',
  },
  {
    orderNumber: '1111',
    orderDate: '01/01/2020',
  },
  {
    orderNumber: '2234',
    orderDate: '01/01/2020',
  },
];

class PickupCrockery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  onTabChange = i => {
    this.setState({index: i});
  };

  getCurrentTab = () => {
    let tab;
    switch (this.state.index) {
      case 0:
        tab = <ScheduledTab orders={dummyData} />;
        break;
      case 1:
        tab = <PendingTab orders={dummyData} withIcon={true} />;
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
          notificationCount={dummyData.length}
        />
        <View>{this.getCurrentTab()}</View>
      </View>
    );
  }
}

export default PickupCrockery;
