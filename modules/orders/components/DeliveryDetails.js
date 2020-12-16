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
import {BasicStyles} from 'common';
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
      total += (parseInt(item.quantity) * parseFloat(item.product.price))
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
    let {deliveryDetails, isSummary = false} = this.props;
    const { orderDetails, userLocation } = this.props.state;
    console.log('orderDetails', orderDetails)
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
                  Add cultery
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
                        this.setState({value: !value});
                      }}
                      buttonSize={5}
                      buttonWrapStyle={{marginRight: 10}}
                    />
                  </RadioButton>
                </Text>
              </View>
              <View style={{marginTop: 10}}>
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
              </View>
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
              HK$ {orderDetails ? parseFloat(orderDetails.subtotal).toFixed(2) : 0}
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
                      {orderDetails ? orderDetails.tip : 0}
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
              HK$ {orderDetails ? parseFloat(orderDetails.total).toFixed(2) : 0.00}
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
                <Text style={[BasicStyles.titleText, {marginTop: 10}]}>
                  <FontAwesomeIcon
                    style={[styles.DeliveryDetailIcon]}
                    color={Color.primary}
                    icon={faMapMarkerAlt}
                    size={BasicStyles.standardFontSize}
                  />
                  <Text
                    style={[
                      BasicStyles.titleText,
                      styles.DeliveryDetailText,
                      {fontSize: BasicStyles.standardFontSize},
                    ]}>
                    {'  '}
                    {userLocation.route + ', ' + userLocation.city + ', ' + userLocation.country}
                  </Text>
                </Text>
              )
            }

            <Text style={[BasicStyles.titleText, {marginTop: 10}]}>
              <FontAwesomeIcon
                style={[styles.DeliveryDetailIcon]}
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
                {moment(deliveryDetails.time).format('MM-DD-YYYY, hh:mm a')}
              </Text>
            </Text>

            <TouchableOpacity onPress={() => {
              this.props.navigate('paymentStack')
            }}>
              <Text style={[BasicStyles.titleText, {marginTop: 10}]}>
                <FontAwesomeIcon
                  style={[styles.DeliveryDetailIcon]}
                  color={Color.primary}
                  icon={faCreditCard}
                  size={BasicStyles.standardFontSize}
                />
                <Text
                  style={[
                    BasicStyles.titleText,
                    styles.DeliveryDetailText,
                    {fontSize: BasicStyles.standardFontSize},
                  ]}>
                  {'  '}
                  {'Payment Method: ' + deliveryDetails.payment}
                </Text>
              </Text>
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

