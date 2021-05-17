import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Style';
import { BasicStyles, Helper } from 'common';
import Style from 'modules/accounts/Style';
import { Color, Routes } from 'common';
import Separator from '../components/Separator'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';

class OrderedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data.items
    };
  }

  updateCart(data, increment = true) {
    const { user, storeLocation } = this.props.state;
    if(user == null || storeLocation == null || data == null){
      return
    }
    let quantity = increment == false ? parseInt(data.quantity) - 1 : parseInt(data.quantity) + 1
    let parameters = '?CustomerId=' + user.id + '&StoreId=' + storeLocation.id + '&ProductId=' + data.product_id + '&Quantity=' + quantity + '&CartType=1';
    Api.postRequest(Routes.shoppingCartItemsUpdateCart + parameters, {}, (response) => {
        this.props.onUpdate()
      }, (error) => {
        console.log(error);
      }
    );
  }

  returnAttributes = (type, data) => {
    if(data.product_attributes.length > 0){
      let ids = []
      let details = []
      data.product_attributes.forEach((id, ndx) => {
        ids.push(parseInt(id.value))
      })
      data.product.attributes[type].attribute_values.forEach( (el, ndx) => {
        if(ids.includes(el.id)){
          details.push(el)
        }
      })

      return (details.map((addOn, ndx) => {
        return (
          <View key={ndx + 'add-ons2'} style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text
              style={[
                {
                  color: Color.black,
                  marginTop: 2,
                  marginBottom: 2,
                  fontSize: BasicStyles.standardFontSize
                },
              ]}
            >
              + {addOn.name }
            </Text>
            {data.product.attributes[type].product_attribute_id == 11 && <Text>
              {'HK$ ' + addOn.price_adjustment}
            </Text>}
          </View>
        )
      }))
    }else {
      return null
    }
  }

  render() {
    let data  = this.props.data.order_items;
    const { cart } = this.props.state;
    let restaurant = []
    let deli = []
    data.forEach(el => {
      if(el.product.category_type == 0){
        restaurant.push(el)
      }else if(el.product.category_type == 1){
        deli.push(el)
      }
    })
    console.log('ORDER DATA: ', data)
    return (
      <View style={{
        width: '100%'
      }}>
      {
        restaurant && (
          <View 
            style={{
              paddingTop: 20
            }}
          >
            <Text
            style={{
              textAlign: 'left',
              elevation: 10,
              fontWeight: 'bold',
              fontSize: 20,
              color: Color.primary,
              marginBottom: 10,
              paddingLeft: 15
            }}
          >RESTAURANT MENU ITEMS</Text>
          {restaurant.map((el, ndx) => {
            return (
              <View style={{width: '100%', padding: 15, paddingBottom: 0}} key={'orderPlace-restaurant-' + ndx}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <Text>
                    {el.product.name}
                  </Text>
                  <Text>
                  {Helper.currency[0].title} {el.product.price}
                  </Text>
                </View>
                <View style={{
                  marginTop: 10
                }}>
                  {this.returnAttributes(0, el)}
                  {this.returnAttributes(1, el)}
                </View>
              </View>
            )
          })}
        </View>
      )}
    
      {
        deli && (
          <View
            style={{
              paddingTop: 20
            }}
          >
            <Text
              style={{
                textAlign: 'left',
                elevation: 10,
                fontWeight: 'bold',
                fontSize: 20,
                color: Color.primary,
                marginBottom: 10,
                paddingLeft: 15
              }}
            >DELI-SHOP ITEMS</Text>
          {deli.map((el, ndx) => {
            return (
              <View style={{width: '100%', padding: 15, paddingBottom: 0}} key={'orderPlace-deli-' + ndx}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <Text>
                    {el.product.name}
                  </Text>
                  <Text>
                  {Helper.currency[0].title} {el.product.price}
                  </Text>
                </View>
                <View style={{
                  marginTop: 10
                }}>
                  {this.returnAttributes(0, el)}
                  {this.returnAttributes(1, el)}
                </View>
              </View>
            )
          })}
        </View>
      )}
      <View
        style={{
          width: '100%', 
          padding: 15, 
          paddingBottom: 0,
          marginBottom: 20
        }}
      >
        {/* <View
          style={{
            marginBottom: 20,
            width: '100%'
          }}
        >
          <Text>Contactless delivery: ---</Text>
        </View> */}
        <View
          style={{
            marginBottom: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text>Sub total:</Text>
          <Text>HKD {this.props.total ? this.props.total : 0}</Text>
        </View>
        <View
          style={{
            marginBottom: 20,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text>Total:</Text>
          <Text style={{
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 20,
            color: Color.black,
          }}>HKD {this.props.total ? this.props.total : 0}</Text>
        </View>
      </View>
      <Separator />
    </View>)
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setCart: (cart) => dispatch(actions.setCart(cart)),
    setOrderDetails: (details) => dispatch(actions.setOrderDetails(details)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderedItems);
