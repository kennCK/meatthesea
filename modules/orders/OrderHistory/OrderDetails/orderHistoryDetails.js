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
    this.state = {}
  }

  componentDidMount(){
    console.log("====== order details mounted ====== " + JSON.stringify(this.props.state.order))
  }

  itemMenu = () => {
    // loop the elements
    let item = []
    for (var i = 0; i <= 2; i++) {
      item.push(
        <View style={Style.width}>
          <View style={Style.itemRow}> 
            <Text style={Style.itemName}> Item name </Text> 
            <Text style={Style.itemPrice}> HK$ XX </Text> 
          </View>
          <View style={Style.itemDetails}> 
            <Text style={Style.detailsText}> + Side Dish</Text> 
            <Text style={Style.detailsText}> HK$ XX </Text> 
          </View>
          <View style={Style.itemDetails}> 
            <Text style={Style.detailsText}> + Less Salt </Text> 
            <Text> </Text> 
          </View>
        </View>
      )
    }
    return item;
  }

  render(){
    return (
      <View>
        <ScrollView>
          <View style={Style.orderNo}>
            <Text style={Style.orderNoText}> Order number 123 </Text>
          </View>
          <View style={Style.menuItems}>
            <Text style={Style.menuText}> RESTAURANT MENU ITEMS </Text>
          </View>
          {this.itemMenu()}
          <View style={Style.menuItems}>
            <Text style={Style.menuText}> DELI-SHOP ITEMS </Text>
          </View>
          {this.itemMenu()}
          <View style={Style.totalSection}>
            <Text style={Style.deliveryCondition}> Contactless delivery: YES</Text>
            <View style={Style.flexDirectionBetween}>
              <Text> Sub total </Text>
              <Text> HK$ XX </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Delivery fee </Text>
              <Text> HK$ XX </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Total </Text>
              <Text> HK$ XX </Text>
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
              <Text> 1A, 1 Main Street, Hong Kong </Text>
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
              <Text> Payment method: Credit card ending 1234 </Text>
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