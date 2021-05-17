import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import {Color, BasicStyles, Routes, Helper} from 'common';
import Style from './Style.js';
import { faMapMarkerAlt, faClock, faCreditCard, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Api from 'services/apiv2/index.js';
import StepIndicator from 'react-native-step-indicator';

const height = Math.round(Dimensions.get('window').height);
const labels = ["Order received","Processing your order","Out for delivery","Delivered"];
const customStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Color.success,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 3,
  stepStrokeFinishedColor: Color.success,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Color.success,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Color.success,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Color.success,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: BasicStyles.standardFontSize,
  currentStepLabelColor: Color.success,
}

class OrderHistoryDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurant: [],
      store: [],
      showRatings: false,
      ratingIndex: null,
      isAddingComment: false,
      value: '',
      currentPosition: 0
    }
  }

  async componentDidMount() {
    await this.filterOrder()
  }

  filterOrder = () => {
    console.log('\n\n-----> ordered items <----- ', this.props.state.orderDetails, '\n---------------------------------------------------------------------------------')
    let data = this.props.state.orderDetails
    let rtn = 0
    switch (data.order_status) {
      case 'Pending':
        rtn = 0;
        break;
      case 'Processing':
        rtn = 1;
        break;
      case 'Delivering':
        rtn = 2;
        break;
      case 'Complete':
        rtn = 3;
        break;
    }
    this.setState({currentPosition: rtn})
    /**
     * 
     * categorization of ordered products for restaurant and deli-shop
     * 
     *  */ 
    let rest = []
    let store = []
    this.props.state.orderDetails.order_items.forEach(async el=> {
      /**
       * categorizes(Restaurant, Deli-Shop) the products response from api
       */
      if(el.product.category_type === 1){
        store.push(el)
      }else if(el.product.category_type === 0){
        rest.push(el)
      }
      await this.setState({store: store})
      await this.setState({restaurant: rest})
      
    })
    console.log('TESTING: ', rest[0].product.attributes)
    console.log('\n\n\n: ', store)
  }
   
  onStepPress = (position) => {
    this.setState({currentPosition: position})
  };


  itemMenu = (stateVariable) => {
    const currency = this.props.state.orderDetails.customer_currency_code
    return (
      this.state[stateVariable].map((el, index) => {
        return (
          <View style={[
            Style.width, 
            {
              marginTop: 5,
              marginBottom: 5
            }
          ]} key={index + 'orderItems ' + el.product.id}>
            <View style={Style.itemRow}> 
              <Text style={Style.itemName}> {el.product.name} </Text> 
              <Text style={[
                Style.itemPrice,
                {
                  fontSize: BasicStyles.standardFontSize
                }
              ]}> HK$  {el.product.price} </Text> 
            </View>
            <View style={Style.itemDetails}> 
              {/* <Text style={Style.detailsText}> + {el.product.short_description} </Text> 
              <Text> </Text>  */}
              { el.product.attributes.length > 0 && (
                el.product.attributes[0].attribute_values.map((le, ndx) => {
                  return (
                    <View key={ndx + 'add-ons1'} style={{
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
                          BasicStyles.standardFontSize
                        ]}
                      >
                        + {le.name }
                      </Text>
                      <Text>
                        {Helper.currency[0].title} {le.price_adjustment}
                      </Text>
                    </View>
                  )
                })
                )
              }
              { el.product.attributes.length > 0 && (
                el.product.attributes[1].attribute_values.map((le, ndx) => {
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
                          BasicStyles.standardFontSize
                        ]}
                      >
                        + {le.name }
                      </Text>
                      <Text>
                        {'HK$ ' + le.price_adjustment}
                      </Text>
                    </View>
                  )
                })
                )
              }
            </View>
          </View>
        )
      })
    )
  }

  rate = () => {
    this.setState({showRatings: !this.state.showRatings})
  }

  submitRating(index){
    const {user, storeLocation} = this.props.state
    this.setState({isLoading: true})
    Api.postRequest(Routes.addRatings(user.id, storeLocation.id, index + 1), {}, response => {
      console.log("ADD RATING RESPONSE: ", response)
      this.setState({isAddingComment: true})
      this.setState({
        isLoading: false,
        ratingIndex: index,
        isAddingComment: true
      })
    }, error => {
      console.log('Add Ratings Error: ', error)
    })
  }

  submitFeedBack() {
    const {user, storeLocation} = this.props.state
    console.log("Comment : ", this.state.value)
    this.setState({isLoading: true})
    Api.postRequest(Routes.addFeedback(user.id, storeLocation.id, this.state.value), {}, response => {
      console.log('Add Feedback Response: ', response)
      this.setState({isLoading: false, showRatings: false})
    }, error => {
      console.log('Add Feedback error')
    })
  }

  rating(){
    let stars = []
    for(let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity onPress={() => this.submitRating(i)} key={'start' + i}>
          <FontAwesomeIcon
          icon={  i <= this.state.ratingIndex === i ? faStar : faStarRegular}
          size={40}
          style={{
            color: Color.secondary
          }}
          key={i}
          />
        </TouchableOpacity>
      )
    }
    return(
      <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        { !this.state.isAddingComment &&
          stars
        }
        { this.state.isAddingComment &&
          <View
            style={{
              width: '100%'
            }}
          >
            <View
              style={{
                width: '100%',
                alignItems: 'center'
              }}
            >
              <TextInput 
                style={
                  [
                    {
                      borderWidth: 1,
                      height: 45,
                      borderColor: Color.gray,
                      borderWidth: 1,
                      paddingLeft: 10,
                      marginBottom: 5,
                      borderRadius: 5,
                      color: Color.lightYellow,
                      width: '90%'
                    }
                  ]
                }
                onChangeText={value => this.setState({value})}
                value={this.state.value}
                placeholder={'Write here...'}
                placeholderTextColor={Color.lightYellow}
              />
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 5
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Color.lightYellow,
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40
                }}
                onPress={ () => {
                  this.submitFeedBack()
                }}
              >
                <Text
                  style={{
                    color: Color.primary,
                    fontSize: BasicStyles.standardFontSize,
                    fontWeight: 'bold'
                  }}
                >SEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    );
  }

  renderStepIndicator(stepPosition, stepStatus) {
    return 
  }
  

  render(){
    const data = this.props.state.orderDetails
    const {user} = this.props.state
    const {showRatings} = this.state
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{
          height: height
        }}>
          <View
            style={{
              marginTop: 30
            }}
          >
            <StepIndicator
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              stepCount={4}
              renderStepIndicator={(args) => {
                return [<FontAwesomeIcon icon={faCheck} size={BasicStyles.iconSize} style={{
                  color: args.stepStatus == 'finished' ? Color.white : Color.success }}
                />]
              }}
              labels={labels}
            />
          </View>
          <View style={Style.orderNo}>
            <Text style={Style.orderNoText}> Order number {data.id} </Text>
          </View>
          {this.state.restaurant.length > 0 &&
            <View style={Style.menuItems}>
              <Text style={Style.menuText}> RESTAURANT MENU ITEMS </Text>
            </View>
          }
          {this.itemMenu('restaurant')}
          {this.state.store.length > 0 && 
            <View style={Style.menuItems}>
              <Text style={Style.menuText}> DELI-SHOP ITEMS </Text>
            </View>
          }
          {this.itemMenu('store')}
          <View style={Style.totalSection}>
            {/* <Text style={Style.deliveryCondition}> Contactless delivery: ____</Text> */}
            <View style={Style.flexDirectionBetween}>
              <Text> Sub total </Text>
              <Text> {Helper.currency[0].title}  { data.order_subtotal_incl_tax } </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Delivery fee </Text>
              <Text> {Helper.currency[0].title}  {data.delivery_fee} </Text>
            </View>
            <View style={Style.flexDirectionBetween}>
              <Text> Total </Text>
              <Text> {Helper.currency[0].title} {data.order_total} </Text>
            </View>
          </View>
          <View style={Style.rateContainer}>
            <TouchableOpacity
              onPress={() => this.rate()}
            >
              <View style={Style.rateInsideContainer}> 
                <Text style={Style.rateText}> RATE ORDER </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={Style.deliveryDetailsContainer}>
            <View style={Style.addressItems}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={BasicStyles.iconSize}
                style={{color: Color.primary, marginRight: 5}}
              />
              <Text> {
                data.shipping_address.address1 !== "" 
                ? 
                  data.shipping_address.address1.length < 45 
                  ? 
                    data.shipping_address.address1
                  : 
                    data.shipping_address.address1.substring(0, 45) + '...'
                : 
                  data.shipping_address.address2
              } </Text>
            </View>
            <View style={Style.addressItems}>
              <FontAwesomeIcon
                icon={faClock}
                size={BasicStyles.iconSize}
                style={{color: Color.primary, marginRight: 5}}
              />
              <Text> Delivery time: {data.delivery_time_requested} </Text>
            </View>
            <View style={Style.addressItems}>
              <FontAwesomeIcon
                icon={faCreditCard}
                size={BasicStyles.iconSize}
                style={{color: Color.primary, marginRight: 5}}
              />
              <Text> Payment method: {
                data.payment_method_system_name.length < 25 
                ?
                  data.payment_method_system_name
                :
                  data.payment_method_system_name.substring(0, 23) + '...'
              } </Text>
            </View>
          </View>
        </ScrollView>
        {
          showRatings && user && (
            <View style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              minHeight: 125,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: Color.primary,
              width: '100%',
              zIndex: 10,
              paddingBottom: 10
            }}>
              { this.state.isAddingComment && 
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '3%',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 20,
                    paddingLeft: 20
                  }}
                  onPress={() => {
                    this.setState({showRatings: false})
                  }}
                >
                  <Text
                    style={{
                      fontSize: BasicStyles.standardFontSize + 12,
                      color: Color.lightYellow
                    }}
                  >&times;</Text>
                </TouchableOpacity>
              }
              <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                { !this.state.isAddingComment && 
                  <Text style={{
                    color: Color.secondary,
                    fontWeight: 'bold',
                    fontSize: 16,
                    paddingTop: 15,
                    paddingBottom: 15
                  }}>RATE YOUR EXPERIENCE</Text>
                }
                { this.state.isAddingComment &&
                  <View
                    style={{
                      width: '70%',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 15,
                        paddingTop: 15,
                        fontSize: BasicStyles.standardFontSize,
                        textAlign: 'center',
                        color: Color.lightYellow
                      }}
                    >
                      Please help us improve our services and send us your feedback
                    </Text>
                </View>
                }
              </View>
              <View>
                {this.rating()}
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryDetails);