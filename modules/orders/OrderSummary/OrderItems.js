import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles, Helper } from 'common';
import Style from 'modules/accounts/Style';
import { Color, Routes } from 'common';
import Separator from '../components/Separator'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt, faTrash } from '@fortawesome/free-regular-svg-icons';
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';
import Confirm from 'modules/generic/confirm';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Alert from 'modules/generic/alert';

class OrderItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data.items,
      isAddingAddressName: false,
      visibleModal: false,
      alertText: '',
      isError: true,
      isAlert: false
    };
  }

  componentDidMount() {
    const {data} = this.props
  }

  updateCart(data, increment = true) {
    const { user, storeLocation } = this.props.state;
    if(user == null || storeLocation == null || data == null){
      return
    }
    // console.log('testing: ', data)
    let quantity = increment == false ? parseInt(data.quantity) - 1 : parseInt(data.quantity) + 1
    let parameters = '?CustomerId=' + user.id + '&CartId=' + data.id + '&Quantity=' + quantity;
    Api.postRequest(Routes.shoppingCartItemsUpdateCart + parameters, {},(response) => {
      let error = {}
      if(typeof response == 'string'){
        error = JSON.parse(response)
      }
      if(error.errors) {
        if(error.errors.updatecart != undefined) {
          this.setState({
            alertText: error.errors.updatecart[0],
            isError: true
          }, () => {
            this.setState({isAlert: true})
          })
        }else if(error.errors.add_to_shopping_cart != undefined) {
          this.setState({
            alertText: error.errors.add_to_shopping_cart[0],
            isError: true
          }, () => {
            this.setState({isAlert: true})
          })
        }else if(error.errors.addcart != undefined) {
          this.setState({
            alertText: error.errors.addcart[0],
            isError: true
          }, () => {
            this.setState({isAlert: true})
          })
        }
        return
      }
      this.props.onUpdate()
    }, (error) => {
      console.log(error);
    });
  }

  removeCart = () => {
    this.setState(
      {
        alertText: 'Are your sure you want to proceed?',
        isAddingAddressName: true
      }
    )
  }

  removingItem = (data) => {
    const { user, storeLocation } = this.props.state;
    if(user == null || storeLocation == null || data == null){
      return
    }
    Api.deleteRequest(Routes.shoppingCartItemsDelete(data.id), {}, (response) => {
        this.setState({isRemoving: false})
        this.props.onUpdate()
      }, (error) => {
        console.log(error);
      }
    );
  }

  returnAttributes = (type) => {
    let { data } = this.props;
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
                  marginBottom: 2
                },
                Style.fontSize(BasicStyles.standardFontSize)
              ]}
            >
              + {addOn.name }
            </Text>
            {data.product.attributes[type].product_attribute_id == 11 && <Text>
              {Helper.currency[0].title}  {addOn.price_adjustment}
            </Text>}
          </View>
        )
      }))
    }else {
      return <Text></Text>
    }
  }

  render() {
    let { data } = this.props;
    const { cart } = this.props.state;
    return (
      <View style={{ paddingTop: 20, marginBottom: 15 }}>
        {
          data && (
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', width: '27%', padding: 15}}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity onPress={() => {
                      this.updateCart(data, false)
                    }}>
                      <Text style={{
                        marginHorizontal: 2,
                        fontSize: 20,
                        paddingLeft: 5,
                        paddingRight: 5
                      }}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled>
                      <Text style={{
                          fontSize: BasicStyles.standardFontSize,
                          marginHorizontal: 4,
                          lineHeight: 25
                      }}>{data.quantity > 0 ? data.quantity : 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      this.updateCart(data)
                    }}>
                      <Text style={{
                        marginHorizontal: 2,
                        fontSize: 20,
                        paddingLeft: 5
                      }}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 50,
                  }}>
                    <TouchableOpacity
                      onPress={() => {this.removeCart()}}
                    >
                      <FontAwesomeIcon 
                        icon={faTrashAlt}
                        size={BasicStyles.iconSize}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{width: '73%', padding: 15}}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <Text>
                      {data.product.name}
                    </Text>
                    <Text>
                      {'HK$ ' + data.product.price}
                    </Text>
                  </View>
                  <View style={{
                    marginTop: 10
                  }}>
                    {this.returnAttributes(0)}
                    {this.returnAttributes(1)}
                  </View>
                </View>
            </View>
          </View>
        )}
        <Confirm
          show={this.state.isAddingAddressName}
          text={this.state.alertText}
          onCancel={()=> {this.setState({ isAddingAddressName: false})} }
          onSuccess={()=> {this.removingItem(data)} }
        />
        <Alert
          show={this.state.isAlert}
          text={this.state.alertText}
          onClick={()=> this.setState({ isAlert: false}) }
          alertType={this.state.isError == true ? 'error' : 'primary'}
        />
        <Separator />
      </View>
      
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);
