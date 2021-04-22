import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {BasicStyles, Color} from 'common';
import Style from './style.js';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import NumericInput from 'react-native-numeric-input';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Counter from 'modules/products/components/Counter.js';
import { color } from 'react-native-reanimated';
import Alert from 'modules/generic/alert';

const width = Math.round(Dimensions.get('window').width);

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
      isAddingAddressName: false,
      alertText: "",
      orderMaximumQuantity: 0,
      isError: true
    };
  }

  onFocusFunction = () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component 
    */
    this.retrieveCart()
  }

  componentDidMount() {
    this.focusListener = this.props.router.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount () {
    /**
     * removing the event listener added in the componentDidMount()
     */
    this.focusListener.remove()
  }

  retrieveProducts = () => {
    const {filter, search, storeLocation, homepage} = this.props.state;
    const { setMenuProducts } = this.props
    if (filter == null) {
      return;
    }
    if (search == null || search == '' || storeLocation == null) {
      Api.getRequest(
        Routes.productsRetrieve + (filter === null ? '' : `?CategoryId=${filter[homepage.type === 0 ? 'restaurant' : 'deli'].item[0].id}`) + '&PublishedStatus=true',
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
        (filter === null ? '' : `&CategoryId=${filter[homepage.type === 0 ? 'restaurant' : 'deli'].item[0].id}`) +
        '&CategoryType=' + this.state.menu
      Api.getRequest(
        Routes.productSearch + parameters,
        response => {
          if(response !== undefined && response !== null){
            const { setMenuProducts } = this.props
            setMenuProducts(response.products);
          }
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
    const {storeLocation} = this.props.state;
    Api.getRequest(
      Routes.restaurantCategoriesRetrieve + '?storeId=' + storeLocation.id,
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
    const {storeLocation} = this.props.state;
    Api.getRequest(
      Routes.deliCategoriesRetrieve + '?storeId=' + storeLocation.id,
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

  setSelectedFilter = async (item, category) => {
    const {setFilter} = await this.props;
    const { filter } = this.props.state;
    // let isSet = null
    // if(filter !== null && filter !== undefined) {
    //   isSet = Object.keys(filter)
    // }else {
    //   isSet = []
    // }
    let tempRestaurant = []
    let tempDeli = []
    // if(isSet.length > 0) {
    //   if(filter[category] !== undefined) {
    //     tempRestaurant = filter['restaurant'].item
    //     tempDeli = filter['deli'].item
    //   }
    // }

    if(category === 'restaurant') {
      tempRestaurant.push(item)
    }else if(category === 'deli') {
      tempDeli.push(item)
    }

    let objectFilter = {}
    objectFilter['restaurant'] = {item: tempRestaurant, category: 'restaurant'}
    objectFilter['deli'] = {item: tempDeli, category: 'deli'}

    await setFilter(objectFilter)
    // await setFilter({...item, category: category});
    await this.retrieveProducts();
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
        itemImage: item.images[0] !== null && item.images[0] !== undefined ? item.images[0].src : '#',
        itemDescription: item.full_description,
        qty: selectedCartItem ? selectedCartItem.quantity : 1,
        orderMaximumQuantity: item.order_maximum_quantity
      });
    }, 1000);
  }

  alertMethod(title, message) {
    // Alert.alert(
    //   title,
    //   message,
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         this.setState({visibleModal: false});
    //         this.retrieveCart();
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
    this.setState({visibleModal: false});
    this.setState({isAddingAddressName: true})
  }

  addToCart() {
    const {user, storeLocation} = this.props.state;
    const {itemID, productInCart} = this.state;
    if (user == null || storeLocation == null || itemID == null) {
      return;
    }
    let parameters =
      '?CustomerId=' +
      user.id +
      '&StoreId=' +
      storeLocation.id +
      '&ProductId=' +
      itemID +
      '&Quantity=' +
      this.state.qty +
      '&CartType=1';
    Api.postRequest(
      (productInCart ? Routes.shoppingCartItemsUpdateCart : Routes.shoppingCartItemsAddToCart) + parameters,
      {},
      response => {
        this.retrieveCart();
        if(response != undefined) {
          let temp = {
            addToBasketResponse : {
              
              isError: false
            }
          }
          this.setState({
            alertText: 'Added to basket successfully!',
            isError: false,
            isAddingAddressName: true
          })
        }
        // this.alertMethod('Success Added!', 'Test');
      },
      error => {

        this.setState({
          alertText: 'Product requested to be added in the cart is not allowed. Product is in different Store.',
          isError: true
        }, () => {
          this.setState({isAddingAddressName: true})
          console.log('\nAdd to basket error: ', this.state.addToBasketResponse);
        })
      },
    );
  }

  filterCheck = (toCheck, category) => {
    const {filter, homepage} = this.props.state;
    let _return = false;
    if(filter !== null && filter !== undefined) {
      if(filter[category] !== undefined){
        // filter[category].item.forEach(el => {
        //   if(el.id === toCheck) {
        //     _return = true;
        //     return;
        //   }
        // })
        if(filter[category].item.length > 0) {
          _return = filter[category].item[0].id === toCheck
        }else{
          _return = false
        }
      }
    }else {
      _return = false;
    }
    return _return;
  }


  render() {
    const {restaurant, deliStore, filter, homepage, menuProducts} = this.props.state;
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
            {(homepage && homepage.type == 0 && restaurant != null) &&
              restaurant.map((data, idx) => {
                return (
                  <TouchableOpacity
                    style={[Style.menuButton, {
                      backgroundColor: filter && this.filterCheck(data.id, 'restaurant') ? Color.secondary : Color.white
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
            {(homepage && homepage.type == 1 && deliStore != null) && deliStore != null &&
              deliStore.map((data, idx) => {
                return (
                  <TouchableOpacity
                    style={[Style.menuButton, {
                      backgroundColor: filter && this.filterCheck(data.id, 'deli') ? Color.secondary : Color.white
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
              {menuProducts !== null &&
                menuProducts.map((item, idx) => {
                  return (
                    <TouchableHighlight
                      activeOpacity={0.9}
                      underlayColor={Color.lightGray}
                      onPress={() => this.selectItem(item)}
                      key={idx} 
                    >
                      <View style={Style.menuContainer}>
                        {item.images.length > 0 && 
                          <View style={{
                            width: Style.menuImage.width,
                            height: Style.menuImage.height,
                            backgroundColor: Color.white,
                            shadowColor: "#000",
                            shadowOffset:{
                              width: 0,
                              height: 3,
                            },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 6,
                          }}>
                            <Image
                              resizeMode={'contain'}
                              source={{uri: item.images.length > 0 ? item.images[0].src : '#'}}
                              style={Style.menuImage}
                            />
                          </View>
                        }
                        {item.images.length === 0 && 
                          <FontAwesomeIcon
                            icon={faImage}
                            size={Style.menuImage.width}
                            style={
                              {
                                color: Color.gray
                              }
                            }
                          />
                        }
                        <Text style={{fontWeight: 'bold'}}>
                          HK$ {item.price}
                        </Text>
                        <Text>{item.name}</Text>
                      </View>
                    </TouchableHighlight>
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
            { this.state.itemImage !== '#' && this.state.itemImage !== null && this.state.itemImage !== undefined &&
              <Image
                resizeMode={'contain'}
                source={{uri: this.state.itemImage !== null && this.state.itemImage !== undefined ? this.state.itemImage : '#'}}
                style={Style.productImageFull}
              />
            }
            {this.state.itemImage === '#' && 
              <FontAwesomeIcon
                icon={faImage}
                size={Style.menuImage.width + 50}
                style={
                  {
                    color: Color.gray
                  }
                }
              />
            }
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={Color.lightGray}
              style={{
                borderWidth: 1,
                paddingTop: 0,
                borderWidth: 0,
                borderRadius: 20,
                position: 'absolute',
                top: 20,
                left: 20,
                backgroundColor: 'rgba(0,100,177,.7)'
              }}
              onPress={() => {
                this.setState({visibleModal: false});
              }}
            >
              <Text
                style={[
                  {
                    color: Color.white,
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
            <View
              style={{
                padding: 30,
                borderBottomWidth: 1,
                borderBottomColor: Color.gray,
                width: width
              }}>
              <Text style={{
                fontWeight: 'bold',
                marginBottom: 10
              }}>{this.state.itemName}</Text>
              <Text style={{
                fontWeight: 'bold',
                marginBottom: 10
              }}>
                HK$ {this.state.itemPrice}
              </Text>
              <Text style={{fontSize: BasicStyles.standardFontSize}}>
                {/* {this.state.itemDescription} */}
                {this.state.isError}
              </Text>
            </View>
          </View>
          <View style={{
            alignItems: 'center'
          }}>
            <Counter
              count={this.state.qty}
              increment={() => {
                if(this.state.qty + 1 <= this.state.orderMaximumQuantity){
                  this.setState({qty: this.state.qty + 1});
                }
              }}
              decrement={() => {
                if (this.state.qty > 1) {
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
        <Alert
          show={this.state.isAddingAddressName}
          text={this.state.alertText}
          onClick={()=> this.setState({ isAddingAddressName: false}) }
          alertType={this.state.isError == true ? 'error' : 'primary'}
        />
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
    setMenuProducts: (menuProducts) => dispatch(actions.setMenuProducts(menuProducts))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
