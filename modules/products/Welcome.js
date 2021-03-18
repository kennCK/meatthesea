import React, {Component} from 'react';
import Style from './Style.js';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {BasicStyles, Color} from 'common';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faEdit,
  faUserCircle,
  faSearch,
  faSlidersH,
  faShoppingBasket,
  faHandHolding,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Products from './components/';
import DeliveryDetails from './components/deliveryDetails';
import Menu from './components/menu.js';
import {Spinner} from 'components';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import {connect} from 'react-redux';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

const width = Math.round(Dimensions.get('window').width);
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: true,
      redirects: [
        'accountStack',
        'filterStack',
        'orderSummaryStack',
        'pickupCrockeryStack',
        'deliveryDetailsStack',
      ],
      deliveryModal: false,
      menu: 0,
      isLoading: false,
      products: null,
      token: true,
      ratingIndex: null,
      isAddingComment: false,
      value: '',
      addresses: [],
      defaultIndex: null
    };
  }

  onFocusFunction = () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component 
    */
    this.retrieveCart()
    this.fetchAddress()
  }

  retrieveProducts = () => {
    const {filter, search, storeLocation} = this.props.state;
    const { setMenuProducts } = this.props
    if (filter == null) {
      return;
    }
    if (search == null || search == '' || storeLocation == null) {
      Api.getRequest(
        Routes.productsRetrieve + '?categoryid=' + filter.id,
        response => {
          setMenuProducts(response.products);
        },
        error => {
          this.props.load(false)
          console.log(error);
        },
      );
    } else {
      let parameters =
        '?Keyword=' +
        search +
        '&StoreId=' +
        storeLocation.id +
        '&CategoryIds=' +
        filter.id;
      Api.getRequest(
        Routes.productSearch + parameters,
        response => {
          setMenuProducts(response.products);
        },
        error => {
          this.props.load(false)
          console.log(error);
        },
      );
    }
  };
  
  isLoading(data) {
    this.setState({isLoading: data});
  }

  componentDidMount() {
    console.log('\n\nSTORE LOCATION : ', this.props.state.storeLocation, '\n\n')
    const { filter } = this.props.state;
    const { setHomepageSettings } = this.props;
    if(filter){
      setHomepageSettings({
        type: filter.category == 'restaurant' ? 0 : 1,
        selectedMenu: filter.category == 'restaurant' ? 0 : 1
      })
    }else{
      setHomepageSettings({
        type: null,
        selectedMenu: null
      })
    }

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

  fetchAddress = () => {
    const { user } = this.props.state
    if(user == null){
      return
    }
    Api.getRequest(Routes.customerRetrieveAddresses(user.id), response => {
      const { address } = response
      if (address) {
        console.log('address response: ', address)
        address.forEach((el, ndx) => {
          address['label'] = el.address_name
          if(el.default_address) {
            this.setState({defaultIndex: ndx})
          }
        });
        this.setState({addresses: address})
        const {setUserLocation} = this.props
        if(this.state.addresses[this.state.defaultIndex] !== undefined && this.state.addresses[this.state.defaultIndex] !== null) {
          setUserLocation(this.state.addresses[this.state.defaultIndex])
        }else {
          setUserLocation(null);
        }
      }
    }, error => {
      console.log('Retrieve addresses error: ', error);
    });
  }


  retrieveCart = () => {
    const { user, storeLocation } = this.props.state;
    if(user == null){
      return
    }
    this.isLoading(true);
    Api.getRequest(Routes.shoppingCartItemsRetrieve + '/' + user.id, (response) => {
        this.isLoading(false);
        const { setCart } = this.props;
        setCart(response.shopping_carts)
      }, (error) => {
        this.isLoading(false);
        console.log(error);
    });
    Api.getRequest(Routes.crockeryRetrieve(user.id, storeLocation.id), response => {
      const { setPickupCrockeries } = this.props;
      setPickupCrockeries(response.crockery)
      console.log('\n\nRETRIEVING CROCKERY RESPONSE: ', response, '\n\n')
    }, error => {
      console.log('\n\nRETRIEVING CROCKERY ERROR: ', error, '\n\n')
    })
  }

  changeSelectedMenu(data, type) {
    if (data == null) {
      this.setState({products: null});
    } else {
    }
    const { setHomepageSettings } = this.props;
    setHomepageSettings({
      type: type,
      selectedMenu: data
    })
  }
  redirect(index) {
    let route = this.state.redirects[index];
    if(index === 1 || this.props.state.user !== null){
      this.props.navigation.navigate(route);
    }else{
      this.props.navigation.navigate('loginStack')
    }
  }
  deliveryModal(payload) {
    if(this.props.state.user !== null){
      this.setState({deliveryModal: this.state.deliveryModal ? false : true});
      if(payload === 'redirecting') {
        this.props.navigation.navigate('savedAddressStack')
      }
    }else{
      this.props.navigation.navigate('loginStack')
    }
  }
  changeMenu(index) {
    this.setState({visibleModal: false});
    if (index == 2) {
      // this.props.navigation.navigate('appOnBoardingStack');
    } else {
      this.setState({menu: index});
    }
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
      const {setShowRating} = this.props
      setShowRating(false)
    }, error => {
      console.log('Add Feedback error')
    })
  }

  selectHandler = index => {
    this.setState({defaultIndex: index});
    console.log('========================testing ========================== ', index)
    Api.postRequest(
      Routes.customerRetrieveDefaultAddress(this.props.state.user.id, this.state.addresses[index].id),
      {},
      response => {
        const {setUserLocation} = this.props
        setUserLocation(this.state.addresses[index])
      },
      error => {
        console.log('Default address error: ', error)
      }
    )
  };

  rating(){
    let stars = []
    for(let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity onPress={() => this.submitRating(i)} key={'start' + i}>
          <FontAwesomeIcon
          icon={ i <= this.state.ratingIndex ? faStar : faStarRegular}
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
          flexDirection: 'row'
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
                      height: 40,
                      borderWidth: 1,
                      height: 40,
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
                  height: 20
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

  deliveryTimeHandler = (data) => {
    const {setSelectedDeliveryTime} = this.props
    let deliveryTime = moment(data).format('HH:mm')
    setSelectedDeliveryTime(deliveryTime)
  }
  render() {
    const { homepage, search, cart, crockeries, user, userLocation, showRating } = this.props.state;
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={Style.MainContainer}>
        <Modal
          isVisible={this.state.visibleModal}
          style={Style.modal}
          onRequestClose={() => {
            this.setState({visibleModal: false});
          }}>
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
              this.changeMenu(2)
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
                  paddingRight: 5,
                  paddingLeft: 6,
                  fontWeight: 'bold'
                }
              ]}
              >&times;</Text>
          </TouchableHighlight>
          <View style={Style.circle}>
            <View style={Style.LogoContainer}>
              <Image
                source={require('assets/groceries.png')}
                style={Style.LogoSize}
              />
            </View>
            <View style={Style.TextContainer}>
              <Text style={[Style.textSecondary]}>
                Products from our deli store right at your finger tips
              </Text>
            </View>
            <TouchableOpacity
              style={[
                Style.btnWhite
              ]}
              onPress={() => this.changeMenu(1)}>
              <Text style={[Style.textPrimary]}>GO TO GROCERIES</Text>
            </TouchableOpacity>
          </View>

          <View style={Style.circle}>
            <View style={Style.LogoContainer}>
              <Image
                source={require('assets/restaurants.png')}
                style={Style.LogoSize}
              />
            </View>
            <View style={Style.TextContainer}>
              <Text style={[Style.textSecondary]}>
                Meals from our kitchen straight to your dinner table
              </Text>
            </View>
            <TouchableHighlight
              style={[
                Style.btnWhite
              ]}
              onPress={() => this.changeMenu(0)}>
              <Text style={[Style.textPrimary]}>GO TO RESTAURANTS</Text>
            </TouchableHighlight>
          </View>
        </Modal>

        <DeliveryDetails
          state={this.state.deliveryModal}
          click={(payload) => this.deliveryModal(payload)}
          user={user}
          navigation={this.props.navigation}
          defaultIndex={this.state.defaultIndex}
          addresses={this.state.addresses}
          selectHandler={this.selectHandler}
          deliveryTimeHandler={this.deliveryTimeHandler}
        />
        <View>
          <View style={[
            Style.delivery,
            {
              padding: 10
            }
          ]}>
            <View style={
              {
                flex: 1,
                flexDirection: 'row',
                width: '100%'
              }
            }>
              <Text style={[{fontSize: BasicStyles.standardFontSize}]}>
                Deliver to:{' '}
              </Text>
              <TouchableOpacity 
                onPress={
                  () => {
                    this.props.navigation.navigate('savedAddressStack')
                  }
                }
              >
                <Text
                  style={[
                    Style.textPrimary,
                    {fontSize: BasicStyles.standardFontSize},
                  ]}>
                  {
                    userLocation !== null ?
                      userLocation.address1 !== "" ||
                      userLocation.address1 !== null ||
                      userLocation.address1 !== undefined 
                    ?
                      userLocation.address1.length > 40 ?
                        userLocation.address1.substring(0, 40) + '...'
                      :
                      userLocation.address1
                    :
                      userLocation.address2.length > 40 ?
                        userLocation.address2.substring(0, 40) + '...'
                      :
                      userLocation.address2
                    :
                      ''
                  }
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[{flex: 0}]}
              onPress={() => this.deliveryModal()}>
              <FontAwesomeIcon
                icon={faEdit}
                style={{color: Color.darkGray}}
                size={BasicStyles.iconSize}
              />
            </TouchableOpacity>
          </View>
          <View style={[
            Style.delivery,
            {
              padding: 10
            }
          ]}>
            <View style={Style.searchBar}>
              <TouchableOpacity style={[{flex: 1}]}>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{color: Color.darkGray, marginLeft: 10}}
                  size={BasicStyles.iconSize}
                />
              </TouchableOpacity>
              <TextInput
                style={[{height: 37, flex: 7, width: '100%'}]}
                placeholder={'Search'}
                onChangeText={(search) => {
                    this.setState({search})
                    const { setSearch, setHomepageSettings } = this.props;
                    if(search.length > 3){
                      setSearch(search)
                      setHomepageSettings({
                        type: 1,
                        selectedMenu: 1
                      })
                    }else{
                      setSearch(null)
                      setHomepageSettings(null)
                    }
                    
                  }
                }
                value={search}
              />
              <TouchableOpacity
                style={[
                  {flex: 0, borderLeftColor: Color.gray, borderLeftWidth: 1},
                ]}
                onPress={() => this.redirect(1)}>
                <FontAwesomeIcon
                  icon={faSlidersH}
                  style={{
                    color: Color.darkGray,
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                  size={BasicStyles.iconSize}
                />
              </TouchableOpacity>
            </View>
            {
              // this.props.state.user &&
              <TouchableOpacity
                style={[{flex: 0}]}
                onPress={() => this.redirect(0)}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{color: Color.primary}}
                  size={40}
                />
              </TouchableOpacity>
            }
          </View>
          {(homepage == null || (homepage && homepage.selectedMenu == null)) && (
            <Products
              active={this.state.menu}
              click={(index) => this.changeMenu(index)}
              choose={async (data, type) => {
                await this.changeSelectedMenu(data, type)
                await this.retrieveProducts()
              }}
              load={(data) => this.isLoading(data)}
            />
          )}
          {(homepage && homepage.selectedMenu != null) && (
            <Menu
              router={this.props.navigation}
              menu={homepage.selectedMenu}
              type={this.state.type}
              press={(data, type) => this.changeSelectedMenu(data, type)}
              load={(data) => this.isLoading(data)}
            />
          )}
          {(
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                backgroundColor: Color.white,
              }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={{
                    width: width / 2,
                    borderWidth: 1,
                    borderColor: Color.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.redirect(3)}>
                  <View
                    style={[
                      {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      },
                    ]}>
                    <FontAwesomeIcon
                      icon={faHandHolding}
                      style={{color: Color.secondary}}
                      size={30}
                    />
                    {
                      (crockeries && crockeries.length > 0) && (
                        <View style={{
                          height: 20,
                          width: 20,
                          backgroundColor: Color.danger,
                          borderRadius: 10,
                          marginLeft: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: -15,
                          marginTop: -10
                        }}>
                          <Text style={[Style.bottomMenuText, {
                            color: Color.white,
                            marginLeft: 0,
                            textAlign: 'center',
                            fontSize: 10
                          }]}>{crockeries.length}</Text>
                        </View>
                      )
                    }
                    <Text style={Style.bottomMenuText}>Pick up crockeries</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={{
                    width: width / 2,
                    borderWidth: 1,
                    borderColor: Color.primary,
                    alignItems: 'center',
                  }}
                  onPress={() => this.redirect(2)}>
                  <View
                    style={[
                      {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      },
                    ]}>
                    <FontAwesomeIcon
                      icon={faShoppingBasket}
                      style={{color: Color.secondary}}
                      size={30}
                    />
                    {
                      (cart && cart.length > 0) && (
                        <View style={{
                          height: 20,
                          width: 20,
                          backgroundColor: Color.danger,
                          borderRadius: 10,
                          marginLeft: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: -15,
                          marginTop: -10
                        }}>
                          <Text style={[Style.bottomMenuText, {
                            color: Color.white,
                            marginLeft: 0,
                            textAlign: 'center',
                            fontSize: 10
                          }]}>{cart.length}</Text>
                        </View>
                      )
                    }
                    <Text style={Style.bottomMenuText}>Basket</Text>
                    
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>
        {
          showRating && user && (
            <View style={{
              position: 'absolute',
              bottom: 0,
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
                    top: 7,
                    left: '5%',
                  }}
                  onPress={() => {
                    const {setShowRating} = this.props
                    setShowRating(false)
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
        {isLoading ? <Spinner mode="overlay"/> : null }
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setStores: (stores) => dispatch(actions.setStores(stores)),
    setSearch: (search) => dispatch(actions.setSearch(search)),
    setHomepageSettings: (settings) => dispatch(actions.setHomepageSettings(settings)),
    setCart: (cart) => dispatch(actions.setCart(cart)),
    setPickupCrockeries: (crockeries) => dispatch(actions.setPickupCrockeries(crockeries)),
    setMenuProducts: (menuProducts) => dispatch(actions.setMenuProducts(menuProducts)),
    setUserLocation: (userLocation) => dispatch(actions.setUserLocation(userLocation)),
    setSelectedDeliveryTime: (deliveryTime) => dispatch(actions.setSelectedDeliveryTime(deliveryTime)),
    setShowRating: (showRating) => dispatch(actions.setShowRating(showRating))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
