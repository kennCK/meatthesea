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
import {deliveryDetails} from '../DummyData';
import Api from 'services/apiv2/index.js';

class OrderHistoryScreen extends Component {
  state = {
    deliveryDetails: {
      address: '',
      payment: '',
      time: '',
    },
    orderDetails: {},
    orders: [],
    total: 0,
    subtotal: 0,
    id: 1,
    allStores: [],
  };
  componentDidMount() {
    let {stores} = this.props.state;
    this.setState({allStores: stores});
    if (stores.length == 0) {
      Api.getRequest(
        Routes.storeRetrieveAll,
        (response) => {
          console.log(response.stores);
          this.props.setStores(response.stores);
          this.setState({allStores: response.stores});
        },
        (error) => {
          alert('error : ' + JSON.stringify(error));
        },
      );
    }

    Api.getRequest(
      Routes.ordersRetrieveById('1'),
      (response) => {
        let {orders} = response;
        let items = [];
        orders.forEach((order) => {
          let tempTotal = this.state.total;
          let tempSubTotal = this.state.subtotal;

          this.setState({
            total: tempTotal + order.order_total,
            subtotal: tempSubTotal + order.order_subtotal_incl_tax,
            deliveryDetails: {
              address: order.shipping_address.address1,
              payment: order.payment_method_system_name,
              time: order.paid_date_utc,
            },
          });
          let {store_id, order_items} = order;
          let store = this.state.allStores.filter(
            (_store) => (_store.id = store_id),
          );
          let ordered_items = order_items.map((i) => {
            let {quantity, product} = i;
            let {name, price, created_on_utc} = product;
            return {
              name,
              price,
              quantity,
              created_on_utc,
            };
          });
          let _item = {
            store: store ? store[0].name : '',
            ordered_items,
          };
          items.push(_item);
        });

        let result = [];
        for (let i = 0; i < items.length; i++) {
          const outer = items[i];
          if (result.length == 0) {
            result.push(outer);
          } else {
            for (let idx = 0; idx < result.length; ++idx) {
              const inner = result[idx];
              if (inner.store == outer.store) {
                inner['ordered_items'].push(outer['ordered_items']);
                break;
              } else {
                result.push(outer);
                break;
              }
            }
          }
        }
        this.setState({
          orders: result,
        });
      },
      (error) => {
        alert('error : ' + JSON.stringify(error));
      },
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
            {this.state.orders.map((item, idx) => {
              return (
                <OrderItems
                  key={idx}
                  {...{
                    store: item.store,
                    items: item.ordered_items,
                  }}
                />
              );
            })}
          </View>
          <DeliveryDetails
            {...{
              OrderDetails: {
                total: this.state.total,
                subtotal: this.state.subtotal,
              },
              deliveryDetails: this.state.deliveryDetails,
            }}
          />
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

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setStores: (stores) => dispatch(actions.setStores(stores)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen);
