import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color, Routes } from 'common';
import Separator from '../components/Separator'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt, faTrash } from '@fortawesome/free-regular-svg-icons';
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';
import Confirm from 'modules/generic/confirm';

class OrderItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data.items,
      isAddingAddressName: false,
      visibleModal: false,
      alertText: ''
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
    let quantity = increment == false ? parseInt(data.quantity) - 1 : parseInt(data.quantity) + 1
    let parameters = '?CustomerId=' + user.id + '&CartId=' + data.id + '&Quantity=' + quantity;
    Api.postRequest(Routes.shoppingCartItemsUpdateCart + parameters, {}, (response) => {
        this.props.onUpdate()
      }, (error) => {
        console.log(error);
      }
    );
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
    console.log(data)
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
      if(data.product.attributes.lenght > 0){
        return (data.product.attributes[type].attribute_values.map((addOn, ndx) => {
          return (
            <Text key={ndx + 'add-ons2'}
              style={[
                {
                  color: Color.black,
                  marginTop: 2,
                  marginBottom: 2
                },
                Style.fontSize(BasicStyles.standardFontSize)
              ]}
            >
              + {addOn.name}
            </Text>
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
      <View><View style={{ paddingTop: 20, marginBottom: 15 }}>
        {
          data && (
            <View>
              <View >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View
                    style={{
                      flexDirection: 'column'
                    }}
                  >
                    <View>
                      <View style={[
                          BasicStyles.titleText,
                          Style.fontSize(BasicStyles.standardFontSize),
                          {
                            marginTop: -7
                          }
                      ]}>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                          <>
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
                          </>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        paddingLeft: 7,
                        paddingTop: 10
                      }}
                    >
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
                  <View>
                    <View>
                      <Text style={[
                          { marginVertical: 2 },
                          Style.fontWeight("700"),
                          Style.fontSize(BasicStyles.standardFontSize),
                      ]}>
                        {data.product.name}
                      </Text>
                      {this.returnAttributes(0)}
                      {this.returnAttributes(1)}
                    </View>
                  </View>
                  <Text style={{
                      position: 'absolute',
                      fontSize:BasicStyles.standardFontSize,
                      right: 25,
                      top: 5
                  }}>{'HK$ ' + data.product.price}</Text>
                </View>
                </View>
          </View>)
        }

      </View>
      <Confirm
        show={this.state.isAddingAddressName}
        text={this.state.alertText}
        onCancel={()=> {this.setState({ isAddingAddressName: false})} }
        onSuccess={()=> {this.removingItem(data)} }
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
