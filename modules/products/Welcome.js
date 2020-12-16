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
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Products from './components/';
import DeliveryDetails from './components/deliveryDetails';
import Menu from './components/menu.js';
import {Spinner} from 'components';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import {connect} from 'react-redux';

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
      token: true
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
    Api.getRequest(Routes.shoppingCartItemsRetrieve + '/' + user.id, (response) => {
        const { setCart } = this.props;
        setCart(response.shopping_carts)
      }, (error) => {
        console.log(error);
    });
  }

  changeSelectedMenu(data, type) {
    if (data == null) {
      this.setState({products: null});
    } else {
      this.isLoading(true);
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
  render() {
    const { homepage, search, cart } = this.props.state;
    console.log('homepage', homepage)
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
            <Text style={[{fontSize: BasicStyles.standardFontSize, flex: 1}]}>
              Deliver to:{' '}
            </Text>
            <Text
              style={[
                Style.textPrimary,
                {flex: 3, fontSize: BasicStyles.standardFontSize},
              ]}>
              1a, Centre Stage Tower 1
            </Text>
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
                  size={BasicStyles.iconSize}
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
                      style={{color: Color.darkGray}}
                      size={30}
                    />
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
                      style={{color: cart && cart.length > 0 ? Color.secondary : Color.darkGray}}
                      size={30}
                    />
                    <Text style={Style.bottomMenuText}>Basket</Text>
                    {
                      (cart && cart.length > 0) && (
                        <View style={{
                          height: 30,
                          width: 30,
                          backgroundColor: Color.secondary,
                          borderRadius: 15,
                          marginLeft: 10,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={[Style.bottomMenuText, {
                            color: Color.white,
                            marginLeft: 0,
                            textAlign: 'center'
                          }]}>{cart.length}</Text>
                        </View>
                      )
                    }
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
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
    setStores: (stores) => dispatch(actions.setStores(stores)),
    setSearch: (search) => dispatch(actions.setSearch(search)),
    setHomepageSettings: (settings) => dispatch(actions.setHomepageSettings(settings)),
    setCart: (cart) => dispatch(actions.setCart(cart)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
