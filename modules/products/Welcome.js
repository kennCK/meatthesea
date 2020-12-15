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
      selectedMenu: null,
      isLoading: false,
      type: null,
      products: null,
      token: true,
      isGuest: true,
    };
  }
  
  isLoading(data) {
    this.setState({isLoading: data});
  }
  componentDidMount() {
    this.setState({
      isGuest: this.props.state.user == null,
    });
    // console.log("user: ", this.props.state.user)
  }
  changeSelectedMenu(data, type) {
    if (data == null) {
      this.setState({products: null});
    } else {
      this.isLoading(true);
      Api.getRequest(
        Routes.productsRetrieve + '?categoryid=' + data,
        (response) => {
          this.setState({products: response.products});
          this.isLoading(false);
        },
        (error) => {
          console.log(error);
        },
      );
    }
    this.setState({selectedMenu: data, type: type});
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
          {this.state.selectedMenu == null && (
            <Products
              state={this.state.menu}
              click={(index) => this.changeMenu(index)}
              choose={(data, type) => this.changeSelectedMenu(data, type)}
              load={(data) => this.isLoading(data)}
            />
          )}
          {this.state.selectedMenu != null && (
            <Menu
              router={this.props.navigation}
              products={this.state.products}
              menu={this.state.selectedMenu}
              type={this.state.type}
              isGuest={this.state.isGuest}
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
                      style={{color: Color.darkGray}}
                      size={30}
                    />
                    <Text style={Style.bottomMenuText}>Basket</Text>
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
  state,
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setStores: (stores) => dispatch(actions.setStores(stores)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
// export default Welcome;
