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
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

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
      isRendered: false,
      data: []
    };
  }

  onFocusFunction = () => {
    const {paypalSuccessData, user, storeLocation, userLocation, deliveryTime, setIsAddingCutlery} = this.props.state
    console.log('Is adding cutlery on confirm: ', setIsAddingCutlery)
    if(paypalSuccessData !== null) {
      this.setState({isLoading: true, isRendered: false})
      Api.postRequest(Routes.paypalConfirmOrder(
          user.id, 
          storeLocation.id, 
          userLocation.id, 
          paypalSuccessData.order_guid, 
          paypalSuccessData.paypal.paypal_id,
          deliveryTime,
          moment().format('HH:mm'),
          setIsAddingCutlery
        ),
      {}, response=> {
        this.setState({data: response.orders})
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} 
        style={[
          styles.OrderHistoryListContainer,
          {
            width: '100%'
          }
        ]}
      >
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
        <View>
        <View
          style={{
            alignItems: 'center',
            width: '100%' 
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              elevation: 10,
              fontWeight: 'bold',
              fontSize: 20,
              color: Color.darkGray,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 35,
              paddingBottom: 35 
            }}
          >THANK YOU FOR YOUR ORDER!</Text>
        </View>
        </View>
        {
          isRendered && 
        
          <View
            style={{
              alignItems: 'center',
              width: '100%' 
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                elevation: 10,
                fontWeight: 'bold',
                fontSize: 20,
                color: Color.primary,
                padding: 0
              }}
            >DELIVERY TIME: {this.state.data[0] ? this.state.data[0].delivery_time_requested : ''}</Text>
          </View>
        }
        {
          isRendered && 
            <View
              style={{
                alignItems: 'center',
                width: '100%' 
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  elevation: 10,
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: Color.black,
                  padding: 20
                }}
              >Order number {this.state.data[0] ? this.state.data[0].id : ''}</Text>
            </View>
        }
        <Separator />
        {
          isRendered && 
          <View >
            {
              this.state.data && this.state.data.map((cartItem, idx) => {
                return <OrderItems key={idx} data={cartItem} total={this.state.data[0].order_total} editable={true} updateOrder={() => this.updateTotal()} onUpdate={() => this.retrieveCart()}/>
              })
            }
            <View style={{
              width: '100%',
              padding: 15,
              paddingTop: 20
            }}>
              <Text style={{
                textAlign: 'left',
                elevation: 10,
                fontWeight: 'bold',
                fontSize: 20,
                color: Color.black,
                marginBottom: 20
              }}>Delivery details</Text>
              <View
                style={{
                  marginBottom: 20,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingLeft: 20,
                  paddingRight: 20
                }}
              >
                <Text>
                  {
                    this.state.data[0].shipping_address.address1 != '' && this.state.data[0].shipping_address.address1 != null && this.state.data[0].shipping_address.address1 != undefined ?
                      this.state.data[0].shipping_address.address1
                    :
                      this.state.data[0].shipping_address.address2 != '' && this.state.data[0].shipping_address.address2 != null && this.state.data[0].shipping_address.address2 != undefined ?
                        this.state.data[0].shipping_address.address2
                      :
                        ''
                  }
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20,
                  width: '100%',
                  paddingLeft: 20,
                  paddingRight: 20
                }}
              >
                <Text>Delivery time: {this.state.data[0].delivery_time_requested}</Text>
              </View>
              <View
                style={{
                  marginBottom: 20,
                  width: '100%',
                  paddingRight: 20,
                  paddingLeft: 20
                }}
              >
                <Text>Payment method: {this.state.data[0].payment_method_system_name}</Text>
              </View>
            </View>
          </View>
        }
        <View 
          style={
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }
        >
          {/* {!isLoading && 
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={Color.lightGray}
              // style={{ 
              //   ...Style.openButton, backgroundColor: Color.primaryDark }}
              style={
                [
                  BasicStyles.btn,
                  {
                    height: 50,
                    backgroundColor: Color.primary,
                    width: Style.getWidth() - 100,
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    marginTop: 20
                  }
                ]
              }
              onPress={() => {
                this.props.navigation.navigate('orderHistoryStack');
              }}
            >
              <Text style={{
                color: Color.tertiary,
                fontWeight: "bold",
                textAlign: "center"
              }}>FINISH</Text>
            </TouchableHighlight>
          } */}
        </View>
        {isLoading ? <Spinner mode="overlay"/> : null }
      </ScrollView>
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
