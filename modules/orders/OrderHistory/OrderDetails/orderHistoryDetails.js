import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Color, BasicStyles, Routes} from 'common';
import Style from './Style.js';
import { faMapMarkerAlt, faClock, faCreditCard, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Api from 'services/apiv2/index.js';

class OrderHistoryDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurant: [],
      store: [],
      showRatings: false
    }
  }

  filterOrder = () => {
    // console.log('-----> ordered items <----- ', this.props.state.orderDetails)
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

  rate = () => {
    this.setState({showRatings: !this.state.showRatings})
  }

  rating = () => {
    let stars = []
    for(let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity onPress={() => this.submitRating(i)} key={'start' + i}>
          <FontAwesomeIcon
          icon={ i <= this.state.ratingIndex ? faStar : faStarRegular}
          size={40}
          style={{
            color: Color.secondary
          }}
          key={i}
          />
        </TouchableOpacity>
      )
    }
    return(
      <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row' 
        }}>
        {
          stars
        }
      </View>
    );
  }

  submitRating(index){
    const {user, storeLocation} = this.props.state
    this.setState({isLoading: true})
    Api.postRequest(Routes.addRatings(user.id, storeLocation.id, index + 1), {}, response => {
      console.log("ADD RATING RESPONSE: ", response)
      this.setState({
        isLoading: false,
        ratingIndex: index
      })
      setTimeout(() => {this.setState({showRatings: false})}, 500)
    }, error => {
      console.log('Add Ratings Error: ', error)
    })
  }


  render(){
    this.filterOrder()
    const data = this.props.state.orderDetails
    const {user} = this.props.state
    const {showRatings} = this.state
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
            <TouchableOpacity
              onPress={() => this.rate()}
            >
              <View style={Style.rateInsideContainer}> 
                <Text style={Style.rateText}> RATE ORDER </Text>
              </View>
            </TouchableOpacity>
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
        {
          showRatings && user && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: Color.primary,
                paddingTop: 20,
                paddingBottom: 20,
                width: '100%',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    color: Color.warning
                  }}
                >RATE YOUR EXPERIENCE</Text>
              </View>
              <View>
                {this.rating()}
              </View>
            </View>
          )
        }
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