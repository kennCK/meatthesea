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
      showRatings: true,
      ratingIndex: null
    };
  }
  
  isLoading(data) {
    this.setState({isLoading: data});
  }
  componentDidMount() {
    const { filter } = this.props.state;
    const { setHomepageSettings } = this.props;
    this.retrieveCart()
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
  }

  retrieveCart = () => {
    const { user } = this.props.state;
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
    this.props.navigation.navigate(route);
  }
  deliveryModal() {
    this.setState({deliveryModal: this.state.deliveryModal ? false : true});
  }
  changeMenu(index) {
    console.log('hi')
    this.setState({visibleModal: false});
    if (index == 2) {
      // this.props.navigation.navigate('appOnBoardingStack');
    } else {
      this.setState({menu: index});
    }
  }

  submitRating(index){
    this.setState({
      showRatings: false,
      ratingIndex: index
    })
  }

  rating(){
    let stars = []
    for(let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity onPress={() => this.submitRating(i)}>
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
        {
          stars
        }
      </View>
    );
  }

  render() {
    const { homepage, search, cart, crockeries, user } = this.props.state;
    const { showRatings, isLoading } = this.state;
    return (
      <View style={Style.MainContainer}>
        <Modal
          isVisible={this.state.visibleModal}
          style={Style.modal}
          onRequestClose={() => {
            this.setState({visibleModal: false});
          }}>
          <View
            style={{
              marginRight: -300,
            }}>
            <TouchableOpacity
              style={[
                {marginTop: 40, backgroundColor: Color.white, borderRadius: 10},
              ]}
              onPress={() => this.changeMenu(2)}>
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  color: Color.primary,
                }}
                size={BasicStyles.iconSize}
              />
            </TouchableOpacity>
          </View>
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
              style={[BasicStyles.btn, Style.btnWhite, {marginTop: 70}]}
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
              style={[BasicStyles.btn, Style.btnWhite, {marginTop: 70}]}
              onPress={() => this.changeMenu(0)}>
              <Text style={[Style.textPrimary]}>GO TO RESTAURANTS</Text>
            </TouchableHighlight>
          </View>
        </Modal>

        <DeliveryDetails
          state={this.state.deliveryModal}
          click={() => this.deliveryModal()}
        />
        <View>
          <View style={Style.delivery}>
            <View style={
              {
                flex: 1,
                flexDirection: 'row'
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
                  1a, Centre Stage Tower 1
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
          <View style={Style.delivery}>
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
              choose={(data, type) => this.changeSelectedMenu(data, type)}
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
          showRatings && (
            <View style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 125,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: Color.primary,
              width: '100%',
              zIndex: 10
            }}>
              <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: Color.secondary,
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingTop: 15,
                  paddingBottom: 15
                }}>RATE YOUR EXPERIENCE</Text>
              </View>

              <View>
                {this.rating()}
              </View>
            </View>
          )
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
    setStores: (stores) => dispatch(actions.setStores(stores)),
    setSearch: (search) => dispatch(actions.setSearch(search)),
    setHomepageSettings: (settings) => dispatch(actions.setHomepageSettings(settings)),
    setCart: (cart) => dispatch(actions.setCart(cart)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
