import React, {Component} from 'react';
import styles from './Style';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Color, BasicStyles} from 'common';
import Helper from './Helper';
import { createStackNavigator } from 'react-navigation-stack';
import CompletedTab from './tabs/CompletedTab';
import PendingTab from './tabs/PendingTab';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import _ from 'lodash';
import {connect} from 'react-redux';
import { Spinner } from 'components';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      orders: [],
      orderLength: 0,
      pageNumber: 1,
      isLoading: false,
    };
  }

  async componentDidMount() {
    console.log("==========u s e r========== " + JSON.stringify(this.props.state.user) + "========= u s e r =========")
    this.getOrders();
  }

  getOrders = () => {
    this.setState({
      isLoading: true,
    });
    Api.getRequest(
      Routes.ordersRetrieve + '?limit=' + 1 + '&page=' + this.state.pageNumber, // use the route below
      // Routes.ordersRetrieveByCustomer(this.props.state.user.customer_guid),
      response => {
        console.log("======= order history response =======" + JSON.stringify(response))
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

  setActiveIndex = (index) => {
    this.setState({activeIndex: index})
  }

  getCurrentTab = () => {
    let tab;
    switch (this.state.activeIndex) {
      case 0:
        tab = (
          <CompletedTab
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
    const {isLoading} = this.state
    return (
      <View>
        <View style={{height: 60, paddingTop: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Helper.pagerMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.setActiveIndex(index)}
                style={{
                  width: width / 2,
                  borderBottomWidth: 8,
                  borderBottomColor:
                    this.state.activeIndex == index ? Color.primary : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={[
                    styles.TitleContainer,
                    {alignSelf: 'center', justifyContent: 'center'},
                  ]}>
                  <Text
                    style={{
                      fontSize: BasicStyles.titleText.fontSize,
                      color:
                        this.state.activeIndex == index
                          ? Color.primary
                          : '#5F5F5F',
                    }}>
                    {item.title}
                  </Text>
                  
                  {item.title === this.props.notificationTitle && (
                    <View style={[styles.NotificationContainer, {
                      marginLeft: 10
                    }]}>
                      <Text style={styles.NotificationTextStyle}>
                        {this.props.notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View>{this.getCurrentTab()}</View>
        {isLoading ? <Spinner mode="overlay"/> : null }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
