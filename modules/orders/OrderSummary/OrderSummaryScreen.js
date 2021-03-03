import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Modal,
    ActivityIndicator, Linking
} from 'react-native';
// import Modal from 'react-native-modal';
import styles from '../Style';
import Style from 'modules/accounts/Style';
import { Color, Routes, BasicStyles } from 'common';
import OrderItems from './OrderItems';
import Separator from '../components/Separator';
import DeliveryDetails from '../components/DeliveryDetails';
import { OrderDetails, dummyData, deliveryDetails } from "../DummyData";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker'
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';
import {Spinner} from 'components';

class OrderSummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selectedTime: '',
      hour: '',
      mins: '',
      key: 1,
      errorMessage: null,
      isSubmit: 0,
      paypalInfo: {},
      isLoading: false
    };
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

  componentDidMount() {
    // console.log('cart : ', this.props.state.cart)
    console.log('::==->Address: ', this.props.state.userLocation)
    console.log('::==->Store Address: ', this.props.state.storeLocation.id)
    Api.getRequest(Routes.paypalAccountRetrieve, response => {
      this.setState({paypalInfo: response})
      console.log('::==->Paypal Account ID ', response.paypal.client_id)
      console.log('::==->Paypal Account SECRET ', response.paypal.client_secret)
    }, error => {
      console.log('Retrieving Paypal Account Error: ', error)
    })
  }
  
  redirect = (route) => {
    this.props.navigation.push(route);
  }

  setSelectedTime(time){
    const { setSelectedDeliveryTime } = this.props;
    setSelectedDeliveryTime(time)
    this.toggleModal()
  }

  isLoading(data) {
    this.setState({isLoading: data});
  }

  toggleModal = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible })
  }

  placeOrder = () => {
    const { user, userLocation, paymentMethod, deliveryTime, cart, orderDetails, storeLocation} = this.props.state;
    // this.setState({
    //   isSubmit: 1
    // })
    // setTimeout(() => {
    //   this.setState({
    //     isSubmit: 0
    //   })
    //   this.redirect('orderPlacedStack')
    // }, 2000)
    if(user == null){
      this.setState({
        errorMessage: 'Invalid Customer Information'
      })
      return
    }
    /**
     * Should not proceed to confirm order if conditions below meet
     */
    if(userLocation == null){
      this.setState({
        errorMessage: 'Address is required.'
      })
      return
    }
    // if(paymentMethod == null){
    //   this.setState({
    //     errorMessage: 'Payment Method is required.'
    //   })
    //   return
    // }
    // if(deliveryTime == null){
    //   this.setState({
    //     errorMessage: 'Delivery Time is required.'
    //   })
    //   return
    // }
    // let parameters = {
    //   customerId: user.id,
    //   location: userLocation,
    //   paymentMethod: paymentMethod,
    //   deliveryTime: deliveryTime,
    //   carts: cart,
    //   orderSummary: orderDetails
    // }
    let parameters = {
      CustomerId: user.id,
      StoreId: storeLocation.id,
      AddressId: 1
    }
    this.executeOrderPlacement()
  }
  
  executeOrderPlacement = async () => {
    const {userLocation, storeLocation, cart, user} = await this.props.state;
    this.setState({isLoading: true});
    await Api.postRequest(Routes.paypalCreateOrder(
        this.state.paypalInfo.paypal.client_id,
        this.state.paypalInfo.paypal.client_secret, 
        0,
        true, 
        user.id, 
        userLocation.id, 
        storeLocation.id
      ), {}, response => {
        console.log("CREATE PAYPAL ORDER RESPONSE: ", response)
        const { setPaypalSuccessData } = this.props;
        setPaypalSuccessData(response);
        this.setState({isLoading: false});
        let approve = response.paypal.links.filter(el => {
          return el.rel.toLowerCase() === 'approve';
        })
        this.openURL(approve[0].href);
    }, error => {
      this.setState({isLoading: false});
      console.log('Creating Paypal Order Error: ', error)
    })
  }

  openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open: ${url}`);
    }
  }
  
  render() {
    const { cart, orderDetails, deliveryTime } = this.props.state;
    const { errorMessage, isLoading } = this.state;
    return (
      <View style={{ flex: 1 }} key={this.state.key}>
        <Modal visible={this.state.isSubmit > 0 ? true : false}>
          <View style={{ flex: 1, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              size={100}
              color={Color.secondary}
              style={[
                styles.wrapper
              ]}
              />
          </View>
        </Modal>
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
        <View style={styles.HeaderContainer}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={[Style.fontSize(BasicStyles.standardFontSize)]}>Delivery time : </Text>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={[Style.fontSize(BasicStyles.standardFontSize), Style.fontWeight('bold'), { color: Color.primary, borderBottomColor: Color.darkGray }]}>{deliveryTime ? deliveryTime : 'As soon as possible'}
                <TouchableOpacity style={[{ flex: 0 }]} onPress={this.toggleModal} >
                    <FontAwesomeIcon icon={faEdit} style={{ color: Color.darkGray, marginRight: 10, marginLeft: 10 }} size={BasicStyles.standardFontSize} />
                </TouchableOpacity>
              </Text>
              <View
                style={{
                  height: 1,
                  width: Style.getWidth() - 190,
                  backgroundColor: Color.black,
                }}
                />
            </View>
          </View>
          <View style={[{ marginTop: 15 },]}>
            <Text style={[{ color: Color.darkGray }, Style.fontSize(BasicStyles.standardFontSize)]}>Current wait time: around 30 mins
            <View style={{ marginTop: 10 }}>
                    <FontAwesomeIcon style={{ marginLeft: 10 }} color={Color.darkGray} icon={faInfoCircle} size={BasicStyles.standardFontSize} />
                </View>
            </Text>
          </View>
        </View>
        <Separator />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.OrderHistoryListContainer]}>
          <View >
            {
              cart && cart.map((cartItem, idx) => {
                return <OrderItems key={idx} data={cartItem} editable={true} updateOrder={() => this.updateTotal()} onUpdate={() => this.retrieveCart()}/>
              })
            }
          </View>
          {
            (
              <DeliveryDetails navigate={(route) => this.props.navigation.navigate(route)} isSummary={false} key={orderDetails} errorMessage={errorMessage}/>
            )
          }

        </ScrollView>
        <Separator />
        <View style={styles.MainContainer}>
          <TouchableHighlight
            onPress={() => { this.placeOrder() }}
            disabled={this.props.state.orderDetails === null ? true : false}
            style={[BasicStyles.btn, Style.btnPrimary, { borderRadius: 0, width: Style.getWidth() - 30 }]}
            underlayColor={Color.gray}>
            <Text style={[{ color: Color.tertiary }, Style.fontWeight('bold'), Style.fontSize(BasicStyles.standardFontSize)]}>
              PLACE ORDER
            </Text>
          </TouchableHighlight>
        </View>
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
    setPaypalSuccessData: (paypalSuccessData) => dispatch(actions.setPaypalSuccessData(paypalSuccessData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryScreen);
