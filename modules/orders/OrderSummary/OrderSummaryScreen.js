import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Modal,
    ActivityIndicator, Linking, Dimensions
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
import ModalStyle from '../components/style';
import {Spinner} from 'components';
import moment from 'moment';
import AddressModal from 'modules/generic/addAddressModal';
import Confirm from 'modules/generic/confirm';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

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
      isLoading: false,
      date: '',
      countries: [],
      isAddingAddressName: false,
      value: '',
      postalCode: '',
      showAddAddressConfirmation: false,
      addresses: []
    };
  }
  
  retrieveCart = () => {
    const { user } = this.props.state;
    if(user == null){
      return
    }
    Api.getRequest(Routes.shoppingCartItemsRetrieve + '/' + user.id, (response) => {
      console.log('testing::, ', response)
        const { setCart } = this.props;
        setCart(response.shopping_carts)
        this.setState({
          key: this.state.key + 1
        })
      }, (error) => {
        console.log(error);
    });
  }

  onFocusFunction = () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component
    */
    this.retrieveCountries();
    this.fetchAddress();
    const{userLocation, location} = this.props.state
    this.setState({
      errorMessage: null, 
      postalCode: userLocation === null || userLocation === '' || userLocation === undefined ? this.props.state.location.postal : userLocation.postal_code
    });
    this.setState({date: new Date().toLocaleString()})

    Api.getRequest(Routes.paypalAccountRetrieve, response => {
      this.setState({paypalInfo: response})
      console.log('::==->Paypal Account ID ', response.paypal.client_id)
      console.log('::==->Paypal Account SECRET ', response.paypal.client_secret)
    }, error => {
      console.log('Retrieving Paypal Account Error: ', error)
    })

    this.retrieveCart();
  }


  componentDidMount() {
    // console.log('cart : ', this.props.state.cart)

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

  fetchAddress = () => {
    const { user } = this.props.state
    Api.getRequest(Routes.customerRetrieveAddresses(user.id), response => {
      const { address } = response
      if (address) {
        this.setState({addresses: address})
      }
    }, error => {
      console.log('Retrieve addresses error: ', error);
    });
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
    
    // if(userLocation == null){
    //   this.setState({
    //     errorMessage: 'Address is required.'
    //   })
    //   return
    // }

    // if(userLocation.address1 == '' || userLocation.address1 == null || userLocation.address1 == undefined){
    //   this.setState({
    //     errorMessage: 'Invalid Address!'
    //   })
    //   return
    // }
    // if(paymentMethod == null){
    //   this.setState({
    //     errorMessage: 'Payment Method is required.'
    //   })
    //   return
    // }
    if(deliveryTime == null){
      this.setState({
        errorMessage: 'Delivery Time is required.'
      })
      return
    }
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
    // this.executeOrderPlacement()
    if(userLocation === null || userLocation === '' || userLocation === undefined) {
      this.setState({showAddAddressConfirmation: true})
    }else{
      this.executeOrderPlacement()
    }
  }

  retrieveCountries = () => {
    Api.getRequest(Routes.getCountries, response => {
      this.setState({countries: response.countries})
    }, error => {
      console.log('RETRIEVE COUNTRIES ERROR: ', error)
    })
  }

  saveAddress = () => {
    const {userLocation} = this.props.state
    if(userLocation === null || userLocation === '' || userLocation === undefined){
      const { user, location } = this.props.state;
      const { countries } = this.state
      let temp = location.address.replace(/ /g, '');
      
      let countryObject = countries.find(el => {
        return el.country_name.toLowerCase() === location.country.toLowerCase()
      })

      // CustomerId, FullName, PhoneNumber, Address, AddressName, Latitude, Longitude, City, PostalCode, CountryId
  
      Api.postRequest(
        Routes.customerAddAddress(
          user.id, 
          user.first_name + ' ' + user.last_name, 
          null, 
          location.address, 
          this.state.value, 
          location.latitude, 
          location.longitude, 
          location.locality, 
          this.state.postalCode, 
          countryObject !== null && countryObject !== undefined ? countryObject.id : 131
        ),
        {}, response => {
          let data = response.address
          const{setUserLocation} = this.props
          this.setState({isAddingAddressName: false, value: '', postalCode: ''})
          setUserLocation(response.address[data.length - 1]);
          this.executeOrderPlacement()
        }, error => {
          console.log("Adding address error: ", error);
        });
    }else{
      this.executeOrderPlacement()
    }
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
        const { setPaypalSuccessData } = this.props;
        setPaypalSuccessData(response);
        this.setState({isLoading: false});
        let approve = response.paypal.links.filter(el => {
          return el.rel.toLowerCase() === 'approve';
        })
        this.props.navigation.navigate('webViewStack', {link: approve[0].href});
        // this.openURL(approve[0].href);
    }, error => {
      this.setState({isLoading: false});
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

  setDate = (data) => {
    this.setState({date: data})
  }

  setDeliveryTime() {
    const {setSelectedDeliveryTime} = this.props
    let deliveryTimeRequested = this.state.date

    let deliveryTime = moment(deliveryTimeRequested).format('HH:mm')
    setSelectedDeliveryTime(deliveryTime)
  }

  handleName = (value) => {
    this.setState({value: value})
  }

  handleCode = (value) => {
    this.setState({postalCode: value});
  }

  onAdd = () => {
    this.saveAddress()
  }

  onClose = () => {
    this.setState({isAddingAddressName: false})
  }

  updatingUserLocation = async (checker) => {
    const {setUserLocation} = await this.props
    await setUserLocation(this.state.addresses[checker])
    await this.setState({ showAddAddressConfirmation: false}, () => {
      this.saveAddress()
    })
  }

  onSuccess = () => {
    let checker = null;
    let addresses = this.state.addresses
    const{location} = this.props.state
    addresses.forEach((el, ndx) => {
      if(el.address1 === location.address){
        checker = ndx
      }
    })
    if(checker !== null){
      this.updatingUserLocation(checker)
    }else{
      this.setState({ showAddAddressConfirmation: false, isAddingAddressName: true})
    }
  }
  
  render() {
    const { cart, orderDetails, deliveryTime, location, userLocation } = this.props.state;
    const { isAddingAddressName, errorMessage, isLoading, date, value, postalCode, showAddAddressConfirmation } = this.state;
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          style={{
            height: height
          }}
          >
          <View style={ModalStyle.insideModalCenteredView}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={Color.lightGray}
              style={{
                borderWidth: 1,
                paddingTop: 0,
                borderColor: Color.white,
                borderRadius: 20,
                position: 'absolute',
                top: 30,
                left: 20,
                backgroundColor: Color.white
              }}
              onPress={() => {
                this.setState({isVisible: false})
              }}
              >
              <Text
                style={[
                  {
                    color: 'rgba(0,100,177,.9)',
                    fontSize: BasicStyles.standardFontSize + 15,
                    lineHeight: 21,
                    marginBottom: -10,
                    paddingTop: 7.5,
                    paddingBottom: 7.5,
                    paddingRight: 6,
                    paddingLeft: 6
                  }
                ]}
                >&times;</Text>
            </TouchableHighlight>
            <View style={ModalStyle.modalView}>
              <DatePicker
                date={new Date(date)}
                mode={"time"}
                androidVariant={"nativeAndroid"}
                onDateChange={this.setDate.bind(this)}
                minuteInterval={15}
                locale={'fr-ca'}
                is24hourSource={'locale'}
              />
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={Color.lightGray}
                onPress={() => {
                  this.setDeliveryTime()
                  this.setState({isVisible: false})
                }}
                style={{
                  backgroundColor: Color.lightYellow,
                  color: Color.darkGray,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 5
                }}
              >
                <Text
                  style={[
                    BasicStyles.headerTitleStyle
                  ]}
                >GO</Text>
              </TouchableHighlight>
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
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          showsVerticalScrollIndicator ={false}
          style={[styles.OrderHistoryListContainer]}
        >
          <View >
            {
              cart && cart.map((cartItem, idx) => {
                return <OrderItems key={idx} data={cartItem} editable={true} updateOrder={() => this.updateTotal()} onUpdate={this.retrieveCart}/>
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
            disabled={this.props.state.orderDetails === null || this.props.state.cart === null || this.props.state.cart.length == 0 ? true : false}
            style={[BasicStyles.btn, Style.btnPrimary, { borderRadius: 0, width: Style.getWidth() - 30 }]}
            underlayColor={Color.gray}>
            <Text style={[{ color: Color.tertiary }, Style.fontWeight('bold'), Style.fontSize(BasicStyles.standardFontSize)]}>
              PLACE ORDER
            </Text>
          </TouchableHighlight>
        </View>
        <Confirm
          show={showAddAddressConfirmation}
          text={'Do you want to use your current Location?'}
          onCancel={()=> {this.setState({ showAddAddressConfirmation: false})}}
          onSuccess={()=> {
            this.onSuccess()
          }}
        />
        <AddressModal
          {...this.props}
          onAdd={this.onAdd}
          onClose={this.onClose}
          addressName={value}
          address={userLocation === null || userLocation === '' || userLocation === undefined ? location.address : userLocation.address1}
          isVisible={isAddingAddressName}
          postalCode={postalCode}
          handleName={this.handleName}
          handleCode={this.handleCode}
        />
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
    setPaypalSuccessData: (paypalSuccessData) => dispatch(actions.setPaypalSuccessData(paypalSuccessData)),
    setUserLocation: (userLocation) => dispatch(actions.setUserLocation(userLocation))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryScreen);
