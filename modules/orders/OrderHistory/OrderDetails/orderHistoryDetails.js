import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Color, BasicStyles} from 'common';
import Style from './Style.js';
import { faMapMarkerAlt, faClock, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class OrderHistoryDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurant: [],
      store: []
    }
  }

  filterOrder = () => {
    console.log('-----> ordered items <----- ', this.props.state.orderDetails)
    /**
     * 
     * categorization of ordered products for restaurant and deli-shop
     * 
     *  */ 
    this.props.state.orderDetails.order_items.forEach(el=> {
      /**
       * categorizes(Restaurant, Deli-Shop) the products response from api
       */
      if(el.product.category_type === 1){
        this.state.store.push(el)
      }else if(el.product.category_type === 0){
        this.state.restaurant.push(el)
      }
    })
  }

  itemMenu = (stateVariable) => {
    const currency = this.props.state.orderDetails.customer_currency_code
    return (
      this.state[stateVariable].map((el, index) => {
        return (
          <View style={Style.width} key={index + 'orderItems ' + el.product.id}>
            <View style={Style.itemRow}> 
              <Text style={Style.itemName}> {el.product.name} </Text> 
              <Text style={Style.itemPrice}> {currency} {el.product.price} </Text> 
            </View>
            <View style={Style.itemDetails}> 
              <Text style={Style.detailsText}> + {el.product.short_description} </Text> 
              <Text> </Text> 
            </View>
          </View>
        )
      })
    )
  }

  render(){
    this.filterOrder()
    const data = this.props.state.orderDetails
    return (
      <View>
        <ScrollView>
          <View style={Style.orderNo}>
            <Text style={Style.orderNoText}> Order number {data.id} </Text>
          </View>
          {this.state.restaurant.length > 0 &&
            <View style={Style.menuItems}>
              <Text style={Style.menuText}> RESTAURANT MENU ITEMS </Text>
            </View>
          }
          {this.itemMenu('restaurant')}
          {this.state.store.length > 0 && 
            <View style={Style.menuItems}>
              <Text style={Style.menuText}> DELI-SHOP ITEMS </Text>
            </View>
          }
          {this.itemMenu('store')}
          <View style={Style.totalSection}>
            <Text style={Style.deliveryCondition}> Contactless delivery: -^-</Text>
            <View style={Style.flexDirectionBetween}>
              <Text> Sub total </Text>
              <Text> {data.customer_currency_code} { data.order_subtotal_incl_tax } </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Delivery fee </Text>
              <Text> {data.customer_currency_code} -^- </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Total </Text>
              <Text> {data.customer_currency_code} {data.order_total} </Text>
            </View>
          </View>
          <View style={Style.rateContainer}>
            <View style={Style.rateInsideContainer}> 
              <Text style={Style.rateText}> RATE ORDER </Text>
            </View>
          </View>
          <View style={Style.deliveryDetailsContainer}>
            <View style={Style.addressItems}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={BasicStyles.iconSize}
                style={{color: Color.primary, marginRight: 5}}
              />
              <Text> {data.shipping_address.address1 !== "" ? data.shipping_address.address1 : data.shipping_address.address2} </Text>
            </View>
            <View style={Style.addressItems}>
              <FontAwesomeIcon
                icon={faClock}
                size={BasicStyles.iconSize}
                style={{color: Color.primary, marginRight: 5}}
              />
              <Text> Delivery time: -^- </Text>
            </View>
            <View style={Style.addressItems}>
              <FontAwesomeIcon
                icon={faCreditCard}
                size={BasicStyles.iconSize}
                style={{color: Color.primary, marginRight: 5}}
              />
              <Text> Payment method: {data.payment_method_system_name} </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryDetails);