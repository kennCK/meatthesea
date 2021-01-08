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

  componentDidMount(){
    console.log("====== order details mounted ====== ", this.props.state.orderDetails)
  }

  filterOrder = () => {
    /**
     * 
     * initial categorization for restaurant and deli-shop
     * 
     *  */ 
    this.props.state.orderDetails.order_items.forEach(el=> {
      // if(el.product.full_description.toLowerCase().includes('deli-shop')){
      //   this.state.store.push(el)
      // }else {
      //   this.state.restaurant.push(el)
      // }
      let keys = Object.keys(el.product)
      if(keys.includes('category') && el.product.category == 'restaurant'){
        this.state.store.push(el)
      }else if(keys.includes('category')){
        this.state.restaurant.push(el)
      }
    })
    console.log("\nrestaturant ", this.state.restaurant.length, "shop ", this.state.store.length, "\n")
  }

  itemMenu = (stateVariable) => {
    // loop the elements
    return (
      // console.log("\nrestaturant ", this.state.restaurant.length, "shop ", this.state.store.length, "\n")
      this.state[stateVariable].map(el => {
        return (
          <View style={Style.width}>
            <View style={Style.itemRow}> 
              <Text style={Style.itemName}> {el.product.name} </Text> 
              <Text style={Style.itemPrice}> HK$ {el.product.price} </Text> 
            </View>
            {/* <View style={Style.itemDetails}> 
              <Text style={Style.detailsText}> + Side Dish</Text> 
              <Text style={Style.detailsText}> HK$ XX </Text> 
            </View> */}
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
          {/* {this.state.restaurant.length > 0 && */}
            <View style={Style.menuItems}>
              <Text style={Style.menuText}> RESTAURANT MENU ITEMS </Text>
            </View>
          {/* } */}
          {this.itemMenu('restaurant')}
          {/* {this.state.store.length > 0 &&  */}
            <View style={Style.menuItems}>
              <Text style={Style.menuText}> DELI-SHOP ITEMS </Text>
            </View>
          {/* } */}
          {this.itemMenu('store')}
          <View style={Style.totalSection}>
            <Text style={Style.deliveryCondition}> Contactless delivery: YES</Text>
            <View style={Style.flexDirectionBetween}>
              <Text> Sub total </Text>
              <Text> HK$ { data.order_subtotal_incl_tax } </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Delivery fee </Text>
              <Text> HK$ XX </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Total </Text>
              <Text> HK$ {data.order_total} </Text>
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
              <Text> Delivery time: ASAP </Text>
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