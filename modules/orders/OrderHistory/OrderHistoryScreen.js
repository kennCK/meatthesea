import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import styles from '../Style';
import {BasicStyles} from 'common';
import Style from 'modules/accounts/Style';
import {Color, Routes} from 'common';
import OrderItems from './OrderItems';
import Separator from '../components/Separator';
import DeliveryDetails from '../components/DeliveryDetails';
import {OrderDetails, dummyData as orders, deliveryDetails} from '../DummyData';
import Api from 'services/apiv2/index.js';

class OrderHistoryScreen extends Component {
  state = {
    deliveryDetails: {},
    orderDetails: {},
    orders: [],
    id: 1,
  };
  componentDidMount() {
    Api.getRequest(
      Routes.ordersRetrieveById('4'),
      (response) => {
        let {order_items} = response;
        let data = order_items.map((order) => {
          return {};
        });

        this.setState({
          orders: order_items,
        });
      },
      (error) => {},
    );
  }
  redirect = (route) => {
    this.props.navigation.push(route);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.MainContainer}>
          <View style={styles.TopContainer}>
            <Text
              style={[
                styles.DescriptionContainer,
                {fontSize: BasicStyles.standardFontSize + 2},
              ]}>
              Order number 1234
            </Text>
          </View>
          <Separator />
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={[styles.OrderHistoryListContainer]}>
          <View>
            {orders.map((data, idx) => {
              return <OrderItems key={idx} data={data} />;
            })}
          </View>
          <DeliveryDetails {...{OrderDetails, deliveryDetails}} />
        </ScrollView>
        <Separator />
        <View style={styles.MainContainer}>
          <TouchableHighlight
            style={[
              BasicStyles.btn,
              Style.btnPrimary,
              {borderRadius: 0, width: Style.getWidth() - 30},
            ]}
            underlayColor={Color.gray}>
            <Text
              style={[
                {color: Color.tertiary},
                Style.fontWeight('bold'),
                Style.fontSize(BasicStyles.standardFontSize),
              ]}>
              RATE ORDER
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(OrderHistoryScreen);
