import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles, Color} from 'common';
import Style from './style.js';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import NumericInput from 'react-native-numeric-input';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Counter from 'modules/products/components/Counter.js';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      deli: null,
      visibleModal: false,
      itemName: null,
      itemPrice: null,
      itemDescription: null,
      itemImage: null,
      itemID: null,
      qty: 0,
      products: null,
      productInCart: null,
    };
  }

  componentDidMount() {
    this.retrieveCart();
  }

  retrieveProducts = () => {
    const {filter, search, location} = this.props.state;
    if (filter == null) {
      return;
    }
    if (search == null || search == '' || location == null) {
      this.props.load(true)
      Api.getRequest(
        Routes.productsRetrieve + '?categoryid=' + filter.id,
        response => {
          this.props.load(false)
          this.setState({products: response.products});
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
        location.id +
        '&CategoryIds=' +
        filter.id;
      Api.getRequest(
        Routes.productSearch + parameters,
        response => {
          this.props.load(false)
          this.setState({products: response.products});
        },
        error => {
          this.props.load(false)
          console.log(error);
        },
      );
    }
  };

  retrieveCart = () => {
    const {user} = this.props.state;
    if (user == null) {
      return;
    }
    this.props.load(true)
    Api.getRequest(
      Routes.shoppingCartItemsRetrieve + '/' + user.id,
      response => {
        this.props.load(false)
        const {setCart} = this.props;
        setCart(response.shopping_carts);
        this.retrieveProducts();
      },
      error => {
        this.props.load(false)
        console.log(error);
      },
    );
  };

  retrieveRestaurant = () => {
    this.props.load(true);
    const {location} = this.props.state;
    Api.getRequest(
      Routes.restaurantCategoriesRetrieve + '?storeId=' + location.id,
      response => {
        this.setState({restaurant: response.categories});
        this.props.load(false);
      },
      error => {
        this.props.load(false)
        console.log(error);
      },
    );
  };

  retrieveDeli = () => {
    this.props.load(true);
    const {location} = this.props.state;
    Api.getRequest(
      Routes.deliCategoriesRetrieve + '?storeId=' + location.id,
      response => {
        this.setState({deli: response.categories});
        this.props.load(false);
      },
      error => {
        this.props.load(false)
        console.log(error);
      },
    );
  };

  setSelectedFilter(item, category) {
    const {setFilter} = this.props;
    setFilter({...item, category: category});
    this.retrieveProducts();
  }

  selectItem(item) {
    const {cart} = this.props.state;
    let selectedCartItem = null;
    if (cart !== null) {
      for (var i = 0; i < cart.length; i++) {
        let cartItem = cart[i];
        if (parseInt(cartItem.product_id) == parseInt(item.id)) {
          selectedCartItem = cartItem;
          this.setState({
            productInCart: cartItem,
          });
          break;
        }
      }
    }
    const {productInCart} = this.state;
    setTimeout(() => {
      this.setState({
        visibleModal: true,
        itemID: item.id,
        itemName: item.name,
        itemPrice: item.price,
        itemImage: item.images[0].src,
        itemDescription: item.full_description,
        qty: selectedCartItem ? selectedCartItem.quantity : 1,
      });
    }, 1000);
  }

  alertMethod(title, message) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({visibleModal: false});
            this.retrieveCart();
          },
        },
      ],
      {cancelable: false},
    );
  }

  addToCart() {
    const {user, location} = this.props.state;
    const {itemID, productInCart} = this.state;
    if (user == null || location == null || itemID == null) {
      return;
    }
    let parameters =
      '?CustomerId=' +
      user.id +
      '&StoreId=' +
      location.id +
      '&ProductId=' +
      itemID +
      '&Quantity=' +
      this.state.qty +
      '&CartType=1';
    Api.postRequest(
      (productInCart
        ? Routes.shoppingCartItemsUpdateCart
        : Routes.shoppingCartItemsAddToCart) + parameters,
      {},
      response => {
        this.alertMethod('Success Added!', 'Test');
      },
      error => {
        console.log(error);
      },
    );
  }

  render() {
    const {restaurant, deliStore, filter, homepage} = this.props.state;
    const {products} = this.state;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            padding: 10,
            borderColor: Color.gray,
          }}>
          <TouchableOpacity
            onPress={() => this.props.press(null, null)}
            style={{position: 'absolute', left: 0}}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={BasicStyles.iconSize}
              style={[{paddingLeft: 20, paddingRight: 20}]}
            />
          </TouchableOpacity>
          {homepage && homepage.type == 0 && (
            <Text style={{fontWeight: 'bold'}}>RESTAURANT MENU</Text>
          )}
          {homepage && homepage.type == 1 && (
            <Text style={{fontWeight: 'bold'}}>DELI-STORE MENU</Text>
          )}
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {restaurant != null &&
              restaurant.map((data, idx) => {
                return (
                  <TouchableOpacity
                    style={[Style.menuButton, {
                      backgroundColor: filter && filter.id == data.id ? Color.secondary : Color.white
                    }]}
                    onPress={() => this.setSelectedFilter(data, 'restaurant')}
                    key={idx}>
                    <Text
                      style={{
                        color:
                          filter && filter.id == data.id
                            ? Color.primary
                            : Color.black,
                        fontWeight:
                          filter && filter.id == data.id ? 'bold' : 'normal',
                      }}>
                      {data.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            {deliStore != null &&
              deliStore.map((data, idx) => {
                return (
                  <TouchableOpacity
                    style={[Style.menuButton, {
                      backgroundColor: filter && filter.id == data.id ? Color.secondary : Color.white
                    }]}
                    onPress={() => this.setSelectedFilter(data, 'deli')}
                    key={idx}>
                    <Text
                      style={{
                        color:
                          filter && filter.id == data.id
                            ? Color.primary
                            : Color.black,
                        fontWeight:
                          filter && filter.id == data.id ? 'bold' : 'normal',
                      }}>
                      {data.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={Style.imageRow}>
              {products != null &&
                products.map((item, idx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.selectItem(item)}
                      key={idx}>
                      <View style={Style.menuContainer}>
                        <Image
                          source={{uri: item.images[0].src}}
                          style={Style.menuImage}
                        />
                        <Text style={{fontWeight: 'bold'}}>
                          HK$ {item.price}
                        </Text>
                        <Text>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.visibleModal}
          style={Style.modalWhite}
          onRequestClose={() => {
            this.setState({visibleModal: false});
          }}>
          <View style={{alignItems: 'center', height: '100%', flex: 1}}>
            <Image
              source={{uri: this.state.itemImage}}
              style={Style.productImageFull}
            />
            <TouchableOpacity
              style={[
                {
                  backgroundColor: Color.primary,
                  borderRadius: 20,
                  position: 'absolute',
                  top: 15,
                  right: 15,
                },
              ]}
              onPress={() => {
                this.setState({visibleModal: false});
              }}>
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  color: Color.white,
                }}
                size={BasicStyles.iconSize}
              />
            </TouchableOpacity>
            <View
              style={{
                padding: 30,
                borderBottomWidth: 1,
                borderBottomColor: Color.gray,
              }}>
              <Text style={{fontWeight: 'bold'}}>{this.state.itemName}</Text>
              <Text style={{fontWeight: 'bold'}}>
                HK$ {this.state.itemPrice}
              </Text>
              <Text style={{fontSize: BasicStyles.standardFontSize}}>
                {this.state.itemDescription}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Counter
              count={this.state.qty}
              increment={() => {
                this.setState({qty: this.state.qty + 1});
              }}
              decrement={() => {
                if (this.state.qty > 0) {
                  this.setState({qty: this.state.qty - 1});
                }
              }}
            />
            <TouchableHighlight
              style={[BasicStyles.btn, {marginTop: 15}]}
              underlayColor={Color.gray}
              onPress={() => {
                if (this.props.state.user == null) {
                  this.props.router.push('loginStack');
                  this.setState({visibleModal: false});
                } else {
                  this.addToCart();
                }
              }}>
              <Text
                style={[{color: 'white', fontWeight: 'bold', fontSize: 18}]}>
                {this.props.state.user === null
                  ? 'LOGIN TO CONTINUE'
                  : 'ADD TO BASKET'}
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setFilter: filter => dispatch(actions.setFilter(filter)),
    setCart: cart => dispatch(actions.setCart(cart)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
