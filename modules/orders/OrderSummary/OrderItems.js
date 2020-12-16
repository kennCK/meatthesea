import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color, Routes } from 'common';
import Separator from '../components/Separator'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';

class OrderItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data.items
    };
  }

  updateCart(data, increment = true) {
    const { user, location } = this.props.state;
    if(user == null || location == null || data == null){
      return
    }
    let quantity = increment == false ? parseInt(data.quantity) - 1 : parseInt(data.quantity) + 1
    let parameters = '?CustomerId=' + user.id + '&StoreId=' + location.id + '&ProductId=' + data.product_id + '&Quantity=' + quantity + '&CartType=1';
    Api.postRequest(Routes.shoppingCartItemsUpdateCart + parameters, {}, (response) => {
        this.retrieveCart()
      }, (error) => {
        console.log(error);
      }
    );
  }


  retrieveCart = () => {
    const { user } = this.props.state;
    if(user == null){
      return
    }
    Api.getRequest(Routes.shoppingCartItemsRetrieve + '/' + user.id, (response) => {
        const { setCart } = this.props;
        setCart(response.shopping_carts)
        this.props.updateOrder()
      }, (error) => {
        console.log(error);
    });
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
                  <Text style={[
                      BasicStyles.titleText,
                      Style.fontSize(BasicStyles.standardFontSize),
                  ]}>
                    <Text  >
                      <>
                      <TouchableOpacity onPress={() => {
                          this.updateCart(data, false)
                    }}>
                        <Text style={[
                            Style.fontSize(BasicStyles.standardFontSize),
                            { marginHorizontal: 2 }
                        ]}>-</Text>
                      </TouchableOpacity>
                      <TouchableOpacity disabled>
                        <Text style={[
                            Style.fontSize(BasicStyles.standardFontSize),
                            { marginHorizontal: 4 }
                        ]}>{data.quantity > 0 ? data.quantity : 0}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.updateCart(data)
                      }}>
                        <Text style={[
                            Style.fontSize(BasicStyles.standardFontSize),
                            { marginHorizontal: 2 }
                        ]}>+</Text>
                      </TouchableOpacity>
                      </>
                    </Text>
                  </Text>
                  <View>
                    <Text style={[
                        { marginVertical: 2 },
                        Style.fontWeight("700"),
                        Style.fontSize(BasicStyles.standardFontSize),
                    ]}>
                        {data.product.name}
                    </Text>
                    <Text style={[
                        { marginVertical: 2 },
                        Style.fontSize(BasicStyles.standardFontSize),
                    ]}>
                        {data.product.short_description}
                    </Text>
                  </View>
                  <Text style={{
                      position: 'absolute',
                      fontSize:BasicStyles.standardFontSize,
                      right: 25,
                      top: 5
                  }}>{'HK$ ' + data.product.price}</Text>
                </View>
                </View>
                        {/*
                            itemText.addOns.map((addOn, id) => {
                                return (
                                    <View key={id} >
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <Text style={[
                                                { marginVertical: 2, marginLeft: 10 },
                                                BasicStyles.titleText,
                                                Style.fontSize(BasicStyles.standardFontSize),
                                            ]}>
                                                <FontAwesomeIcon icon={faTrash} color={Color.primary} />
                                            </Text>
                                            <Text
                                                style={[
                                                    { color: Color.darkGray },
                                                    BasicStyles.titleText,
                                                    Style.fontWeight("100"),
                                                    Style.fontSize(BasicStyles.standardFontSize)
                                                ]}>{"\t"}
                                                +{addOn.item}</Text>
                                            <Text style={{
                                                fontSize:BasicStyles.standardFontSize,
                                                position: 'absolute',
                                                right: 25,
                                                top: 5
                                            }}>{addOn.price}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        */}
          </View>)
        }

      </View>
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
