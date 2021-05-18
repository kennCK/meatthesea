import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from '../Style';
import {BasicStyles, Helper} from 'common';
import Style from 'modules/accounts/Style';
import {Color} from 'common';
import Separator from './Separator';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCreditCard, faClock} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RadioButton, RadioButtonInput} from 'react-native-simple-radio-button';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {connect} from 'react-redux';

class DeliveryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      value2: 0
    };
  }


  updateQuantity = (mode = 1) => {
    let {tip} = this.state;
    this.setState({tip: mode == 1 ? ++tip : --tip});
  };

  componentDidMount() {
    const { cart } = this.props.state;
    if(cart == null){
      return
    }
    
    let total = 0
    for (var i = 0; i < cart.length; i++) {
      let item = cart[i]
      let temp_price = 0
      item.product_attributes.forEach(el => {
        let p = 0
        item.product.attributes.forEach(le => {
          if(el.id === le.id) {
            le.attribute_values.forEach(me => {
              if(el.value == me.id){
                p += me.price_adjustment
              }
            })
          }
        })
        temp_price += p
      })

      total += (parseInt(item.quantity) * parseFloat(item.product.price) + temp_price)
      console.log('ITEM: ', item)
      if(i == cart.length - 1){
        const { setOrderDetails } = this.props;
        setOrderDetails({
          total: total,
          subtotal: total,
          tip: 0
        })
      }
    }
  }

  render() {
    let { isSummary, errorMessage } = this.props;
    const { orderDetails, userLocation, paymentMethod, deliveryTime, cart } = this.props.state;
    return (
      <View>
        {(orderDetails) && (
          <>
            <View style={{paddingTop: 20, marginBottom: 20}}>
              <View>
                <Text
                  style={[
                    {marginVertical: 2, marginLeft: 5, color: Color.black},
                    BasicStyles.titleText,
                    Style.fontSize(BasicStyles.standardFontSize),
                    Style.fontWeight('bold'),
                  ]}>
                  Add cutlery
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 25,
                    top: 5,
                  }}>
                  <RadioButton labelHorizontal={true}>
                    <RadioButtonInput
                      obj={{value: 1}}
                      isSelected={this.state.value}
                      onPress={() => {
                        let {value} = this.state;
                        this.setState({value: !value}, () => {
                          this.props.isAddingCutlery(this.state.value)
                        });
                      }}
                      buttonSize={5}
                      buttonWrapStyle={{marginRight: 10}}
                    />
                  </RadioButton>
                </Text>
              </View>
              {/* <View style={{marginTop: 10}}>
                <Text
                  style={[
                    {marginVertical: 2, marginLeft: 5, color: Color.black},
                    BasicStyles.titleText,
                    Style.fontSize(BasicStyles.standardFontSize),
                    Style.fontWeight('bold'),
                  ]}>
                  Contactless delivery
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 25,
                    top: 5,
                  }}>
                  <RadioButton labelHorizontal={true}>
                    <RadioButtonInput
                      obj={{value: 1}}
                      isSelected={this.state.value1}
                      onPress={() => {
                        let {value1} = this.state;
                        this.setState({value1: !value1});
                      }}
                      buttonSize={5}
                      buttonWrapStyle={{marginRight: 10}}
                    />
                  </RadioButton>
                </Text>
              </View> */}
            </View>
            <Separator />
          </>
        )}
        <View style={{paddingTop: 20, marginBottom: 20}}>
          <View>
            <Text
              style={[
                {marginVertical: 2, marginLeft: 5, color: Color.darkGray},
                BasicStyles.titleText,
                Style.fontSize(BasicStyles.standardFontSize),
              ]}>
              Subtotal
            </Text>
            <Text
              style={{
                position: 'absolute',
                right: 25,
                top: 5,
                fontSize: BasicStyles.standardFontSize,
              }}>
              {Helper.currency[0].title} $ {orderDetails && cart.length > 0? parseFloat(orderDetails.subtotal).toFixed(2) : 0}
            </Text>
          </View>
          {isSummary && (
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  {marginVertical: 2, marginLeft: 5, color: Color.primary},
                  BasicStyles.titleText,
                  Style.fontWeight('100'),
                  Style.fontSize(BasicStyles.standardFontSize),
                ]}>
                Add tip
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  right: 25,
                  fontSize: BasicStyles.standardFontSize,
                  top: 5,
                }}>
                <>
                  <TouchableOpacity
                    style={styles.TipButton}
                    onPress={() => {
                      this.updateQuantity(0);
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>-</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity disabled>
                    <Text
                      style={[
                        Style.fontSize(BasicStyles.standardFontSize),
                        {marginHorizontal: 4},
                      ]}>
                      {orderDetails && cart.length > 0 ? orderDetails.tip : 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.TipButton}
                    onPress={() => {
                      this.updateQuantity();
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>+</Text>
                    </View>
                  </TouchableOpacity>
                </>
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                {marginVertical: 2, marginLeft: 5, color: Color.black},
                BasicStyles.titleText,
                Style.fontWeight('bold'),
                Style.fontSize(BasicStyles.standardFontSize),
              ]}>
              TOTAL
            </Text>
            <Text
              style={{
                position: 'absolute',
                right: 25,
                fontSize: BasicStyles.standardFontSize,
                top: 5,
                fontWeight: 'bold'
              }}>
              {Helper.currency[0].title} {orderDetails && cart.length > 0? parseFloat(orderDetails.total).toFixed(2) : 0.00}
            </Text>
          </View>
        </View>
        <Separator />
        <View style={{paddingTop: 20, marginBottom: 20}}>
          <View>
            <View>
              <Text
                style={[
                  {marginVertical: 2, marginLeft: 5, color: Color.black},
                  BasicStyles.titleText,
                  Style.fontWeight('bold'),
                  Style.fontSize(BasicStyles.standardFontSize),
                ]}>
                Delivery Details
              </Text>
              {
                errorMessage && (
                  <Text style={{
                      marginVertical: 2,
                      marginLeft: 5,
                      width: '100%',
                      textAlign: 'center',
                      color: Color.danger,
                      fontSize: BasicStyles.standardFontSize
                  }}>
                    {errorMessage}
                  </Text>
                )
              }
              {isSummary && (
                <Text
                  style={{
                    position: 'absolute',
                    right: 25,
                    fontSize: BasicStyles.standardFontSize,
                    top: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.redirect('accountStack');
                    }}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{color: Color.darkGray}}
                      size={BasicStyles.standardFontSize}
                    />
                  </TouchableOpacity>
                </Text>
              )}
            </View>
            {
              userLocation && (
                <View style={{
                  marginRight: 5,
                  marginTop: 10
                }}>
                  <FontAwesomeIcon
                    style={[styles.DeliveryDetailIcon, {
                      marginTop: 2
                    }]}
                    color={Color.primary}
                    icon={faMapMarkerAlt}
                    size={BasicStyles.standardFontSize}
                  />
                  <TouchableOpacity onPress={() => {
                    this.props.navigate('savedAddressStack')
                  }}>
                    <Text
                      style={[
                        BasicStyles.titleText,
                        styles.DeliveryDetailText,
                        {fontSize: BasicStyles.standardFontSize},
                      ]}>
                      {' '}
                      {
                        userLocation.address1 !== null && userLocation.address1 !== '' && userLocation.address1 !== undefined
                        ? 
                          userLocation.address1
                        : 
                          userLocation.building_name !== '' &&
                          userLocation.building_name !== null &&
                          userLocation.building_name !== undefined ?
                            userLocation.building_name.length > 40 
                            ?
                              userLocation.building_name.substring(0, 40) + '...'
                            :
                              userLocation.building_name
                          :
                            <Text style={[
                              BasicStyles.titleText,
                              styles.DeliveryDetailText,
                              {
                                fontSize: BasicStyles.standardFontSize,
                                left: -30,
                                top: -2
                              },
                            ]}>Click to add address</Text>
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
            {
              userLocation == null && (
                <TouchableOpacity onPress={() => {
                  this.props.navigate('savedAddressStack')
                }}>
                  <View style={{
                    marginRight: 5,
                    marginTop: 10
                  }}>
                    <FontAwesomeIcon
                      style={[styles.DeliveryDetailIcon, {
                        marginTop: 3
                      }]}
                      color={Color.primary}
                      icon={faMapMarkerAlt}
                      size={BasicStyles.standardFontSize}
                    />
                    <Text
                      style={[
                        BasicStyles.titleText,
                        styles.DeliveryDetailText,
                        {
                          fontSize: BasicStyles.standardFontSize
                        },
                      ]}>
                      {'  '}
                      Click to add address
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }

            <View style={{
                marginRight: 5,
                marginTop: 10
              }}>
              <FontAwesomeIcon
                style={[styles.DeliveryDetailIcon, {
                    marginTop: 3
                  }]}
                color={Color.primary}
                icon={faClock}
                size={BasicStyles.standardFontSize}
              />
              <Text
                style={[
                  BasicStyles.titleText,
                  styles.DeliveryDetailText,
                  {fontSize: BasicStyles.standardFontSize},
                ]}>
                {'  '}
                {'Delivery time: ' + (deliveryTime ? deliveryTime : 'Required')}
              </Text>
            </View>

            <TouchableOpacity onPress={() => {
              this.props.navigate('paymentStack')
            }}>
              <View style={{
                  marginRight: 5,
                  marginTop: 10
                }}>
                <FontAwesomeIcon
                  style={[styles.DeliveryDetailIcon, {
                    marginTop: 3
                  }]}
                  color={Color.primary}
                  icon={faCreditCard}
                  size={BasicStyles.standardFontSize}
                />
                <Text
                  style={[
                    BasicStyles.titleText,
                    styles.DeliveryDetailText,
                    {
                      fontSize: BasicStyles.standardFontSize
                    },
                  ]}>
                  {'  '}
                  {'Payment Method: ' + (paymentMethod ? paymentMethod.type : 'Click to add payment method')}
                </Text>
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails);

