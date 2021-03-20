import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color, Routes } from 'common';
import OrderItems from './OrderedItems';
import Separator from '../components/Separator';
import DeliveryDetails from '../components/DeliveryDetails';
import { OrderDetails, dummyData, deliveryDetails } from "../DummyData";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker'
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';
import {Spinner} from 'components';
import moment from 'moment';

class OrderedSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selectedTime: '',
      hour: '',
      mins: '',
      key: 1,
      errorMessage: null,
      isLoading: false,
      isRendered: false
    };
  }

  onFocusFunction = () => {
    const {paypalSuccessData, user, storeLocation, userLocation, deliveryTime} = this.props.state
    if(paypalSuccessData !== null) {
      this.setState({isLoading: true, isRendered: false})
      Api.postRequest(Routes.paypalConfirmOrder(
          user.id, 
          storeLocation.id, 
          userLocation.id, 
          paypalSuccessData.order_guid, 
          paypalSuccessData.paypal.paypal_id,
          deliveryTime,
          moment().format('HH:mm')
        ),
      {}, response=> {
        console.log('CONFIRM ORDER PAYPAL RESPONSE: ', response);
        this.setState({isLoading: false, isRendered: true});
        const {setShowRating} = this.props;
        setShowRating(true);
      }, error => {
        console.log('CONFIRM PAYPAL ORDER ERROR: ', error)
      })
    }else {
      this.props.navigation.navigate('orderSummaryStack')
    }
  }

  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount () {
    /**
     * removing the event listener added in the componentDidMount()
     */
    this.focusListener.remove()
  }

  retrieveCart = () => {
    const { user } = this.props.state;
    if(user == null){
      return
    }
    Api.getRequest(Routes.shoppingCartItemsRetrieve + '/' + user.id, (response) => {
        const { setCart } = this.props;
        setCart(response.shopping_carts)
        this.setState({
          key: this.state.key + 1
        })
      }, (error) => {
        console.log(error);
    });
  }
  
  redirect = (route) => {
    this.props.navigation.push(route);
  }

  setSelectedTime(time){
    const { setSelectedDeliveryTime } = this.props;
    setSelectedDeliveryTime(time)
    this.toggleModal()
  }

  toggleModal = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible })
  }

  placeOrder(){
    const { user, userLocation, paymentMethod, deliveryTime, cart, orderDetails} = this.props.state;
    this.redirect('orderPlacedStack')
    if(user == null){
      this.setState({
        errorMessage: 'Invalid Customer Information'
      })
      return
    }
    if(userLocation == null){
      this.setState({
        errorMessage: 'Address is required.'
      })
      return
    }
    if(paymentMethod == null){
      this.setState({
        errorMessage: 'Payment Method is required.'
      })
      return
    }
    if(deliveryTime == null){
      this.setState({
        errorMessage: 'Delivery Time is required.'
      })
      return
    }
    let parameters = {
      customerId: user.id,
      location: userLocation,
      paymentMethod: paymentMethod,
      deliveryTime: deliveryTime,
      carts: cart,
      orderSummary: orderDetails,
      isRendered: true
    }
    this.redirect('orderPlacedStack')
  }

  render() {
    const { cart, orderDetails, deliveryTime } = this.props.state;
    const { errorMessage, isLoading, isRendered } = this.state;
    return (
      <View style={{ flex: 1 }} key={this.state.key}>
        <Modal visible={this.state.isVisible} >
          <View style={{ flex: 1, backgroundColor: Color.primary }}>
          <TouchableOpacity
              style={[{ marginTop: 40, marginLeft: 20 }]} onPress={this.toggleModal}>
              <FontAwesomeIcon icon={faTimesCircle} style={{
                  color: Color.gray
              }} size={BasicStyles.iconSize} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: Color.primary,
                alignItems: "center",
            }}>

              <View style={{
                  backgroundColor: Color.white,
                  borderRadius: 10,
                  padding: 35,
                  width: Style.getWidth() - 100,
                  alignItems: "center",
              }}>
                <Text style={[Style.fontSize(BasicStyles.standardFontSize), { textAlign: 'center', color: Color.darkGray }]}>Available delivery slots from :</Text>
                <DatePicker
                    mode='time'
                    date={new Date()}
                    is24hourSource="locale"
                    minuteInterval={15}
                    onDateChange={(e) => {
                        this.setState({ hour: e.getHours() })
                        this.setState({ mins: e.getMinutes() })
                    }}
                />
                <View style={{ marginTop: 40 }}>
                  <TouchableOpacity style={{
                    backgroundColor: Color.secondary,
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    borderRadius: 10
                  }}
                    onPress={() => {
                        const { hour, mins } = this.state
                        this.setState({ selectedTime: `${hour}:${parseInt(mins) > 0? mins : '00'}` })
                        this.setSelectedTime(`${hour}:${parseInt(mins) > 0? mins : '00'}`)
                    }}
                  >
                    <Text style={[Style.fontSize(BasicStyles.standardFontSize), Style.fontWeight('bold')]}>GO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {
          isRendered && 
        
          <View style={styles.HeaderContainer}>
            {/* */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={[Style.fontSize(BasicStyles.standardFontSize)]}>Delivery time : {deliveryTime}</Text>
            </View>
            <View style={[{ marginTop: 15 },]}>
              <Text style={[{ color: Color.darkGray }, Style.fontSize(BasicStyles.standardFontSize)]}>Current wait time: around 30 mins
              <View style={{ marginTop: 10 }}>
                      <FontAwesomeIcon style={{ marginLeft: 10 }} color={Color.darkGray} icon={faInfoCircle} size={BasicStyles.standardFontSize} />
                  </View>
              </Text>
            </View>
          </View>
        }
        <Separator />
        {
          isRendered && 
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.OrderHistoryListContainer]}>
            <View >
              {
                cart && cart.map((cartItem, idx) => {
                  return <OrderItems key={idx} data={cartItem} editable={true} updateOrder={() => this.updateTotal()} onUpdate={() => this.retrieveCart()}/>
                })
              }
            </View>

          </ScrollView>
        }
        {isLoading ? <Spinner mode="overlay"/> : null }
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
    setSelectedDeliveryTime: (time) => dispatch(actions.setSelectedDeliveryTime(time)),
    setShowRating: (showRating) => dispatch(actions.setShowRating(showRating))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderedSummary);
