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
import {BasicStyles, Color, Helper} from 'common';
import Style from './style.js';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import NumericInput from 'react-native-numeric-input';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Counter from 'modules/products/components/Counter.js';
import { color } from 'react-native-reanimated';
import Alert from 'modules/generic/alert';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Spinner } from 'components';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

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
      isError: true,
      addOn1: {},
      addOn2: {},
      selectedIds: [],
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
      }, () => {
        if(item.attributes[1] !== undefined) {
          if(item.attributes[1].product_attribute_id == 12) { //id 12 means bundle items
            this.setState({addOn1: item.attributes[1], addOn2: item.attributes[0]})
          }else{
            this.setState({addOn1: item.attributes[0], addOn2: item.attributes[1]})
          }
        }else{
          this.setState({addOn1: item.attributes[0],
            addOn2: item.attributes[1]});
        }
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
    this.state.selectedIds.forEach((el, ndx) => {
      parameters += `&AttributesId=${this.state.addOn2.id}-${el}`
    })
    if(this.state.addOn1 !== undefined) {
      if(Object.keys(this.state.addOn1).length > 0){
        this.state.addOn1.attribute_values.forEach((el, ndx) => {
          parameters += `&AttributesId=${this.state.addOn1.id}-${el.id}`
        })
      }
    }
    console.log('ADD TO CART PARAMETERS: ', Routes.shoppingCartItemsAddToCart + parameters)
    this.setState({isLoading: true})
    Api.postRequest(
      (Routes.shoppingCartItemsAddToCart) + parameters,
      {},
      response => {
        this.setState({isLoading: false})
        let error = {}
        if(typeof response == 'string'){
          error = JSON.parse(response)
        }
        if(error.errors) {
          if(error.errors.updatecart != undefined) {
            this.setState({
              alertText: error.errors.updatecart[0],
              isError: true
            }, () => {
              this.setState({isAddingAddressName: true})
            })
          }else if(error.errors.add_to_shopping_cart != undefined) {
            this.setState({
              alertText: error.errors.add_to_shopping_cart[0],
              isError: true
            }, () => {
              this.setState({isAddingAddressName: true})
            })
          }
          return
        }
        this.retrieveCart();
        this.setState({
          alertText: 'Added to basket successfully!',
          isError: false,
          isAddingAddressName: true,
          selectedIds: []
        })
        // this.alertMethod('Success Added!', 'Test');
      },
      error => {
        this.setState({isLoading: false})
        if(error.errors.updatecart){
          this.setState({
            alertText: error.errors.updatecart[0],
            isError: true
          }, () => {
            this.setState({isAddingAddressName: true})
          })
        }else {
          this.setState({
            alertText: 'Product requested to be added in the cart is not allowed.',
            isError: true
          }, () => {
            this.setState({isAddingAddressName: true})
          })
        }
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

  returnAddOn1 = () => {
    let addOn1 = this.state.addOn1
    if(addOn1 !== undefined) {
      if(Object.keys(addOn1).length > 0){
        return addOn1.attribute_values.map((el, ndx) => {
          return <Text key={'a_on1' + ndx} style={{
            marginTop: 10
          }}>{el.name}</Text>
        })
      }else {
        return null
      }
    }else {
      return null
    }
  }

  returnAddOn2 = () => {
    let addOn2 = this.state.addOn2
    if(addOn2 !== undefined) {
      if(Object.keys(addOn2).length > 0){
        return addOn2.attribute_values.map((el, ndx) => {
          return <View style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            key={'a_on2' + ndx}
          >
            <Text>{el.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text>({Helper.currency[0].title} {el.price_adjustment}){el.initial}</Text>
              <RadioForm
                formHorizontal={true}
                animation={true}
              >
                {
                  <RadioButton labelHorizontal={true} key={'a_on1_button' + ndx} >
                    <RadioButtonInput
                      obj={{label: '', value: el.id}}
                      index={ndx}
                      isSelected={this.state.selectedIds.includes(el.id)}
                      onPress={(value) => {
                        if(this.state.selectedIds.includes(el.id)) {
                          let index = this.state.selectedIds.indexOf(el.id)
                          let temp1 = this.state.selectedIds
                          temp1.splice(index, 1)
                          this.setState({selectedIds: temp1})
                        }else {
                          let temp2 = this.state.selectedIds
                          temp2.push(el.id)
                          this.setState({selectedIds: temp2})
                        }
                      }}
                      borderWidth={1}
                      buttonInnerColor={Color.primary}
                      buttonOuterColor={Color.primary}
                      buttonSize={8}
                      buttonOuterSize={16}
                      buttonStyle={{marginTop: 8, marginLeft: 15}}
                      buttonWrapStyle={{}}
                    />
                  </RadioButton>
                }  
              </RadioForm>
            </View>
          </View>
        })
      }else {
        return null
      }
    }else {
      return null
    }
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
                        {Helper.currency[0].title} {item.price}
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
          style={[
            Style.modalWhite,
            {
              paddingBottom: 0
            }
          ]}
          onRequestClose={() => {
            this.setState({visibleModal: false});
          }}>
          <ScrollView 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
          >
            <View style={{
              alignItems: 'center',
              height: height,
              paddingBottom: 150
            }}>
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
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingTop: 30,
                  paddingBottom: 0,
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
                  {Helper.currency[0].title} {this.state.itemPrice}
                </Text>
                <Text style={{fontSize: BasicStyles.standardFontSize}}>
                  {/* {this.state.itemDescription} */}
                  {this.state.isError}
                </Text>
              </View>
            
              <View
                style={{
                  padding: 30,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: width
                }}
              >
                {this.state.addOn1 !== undefined && this.state.addOn2 !== undefined &&
                  <Text style={{
                    fontWeight: 'bold'
                  }}>Add more</Text>
                }
                {this.returnAddOn1()}
                {this.returnAddOn2()}
              </View>
            </View>
            <View style={{
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              width: '100%'
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
          </ScrollView>
        </Modal>
        <Alert
          show={this.state.isAddingAddressName}
          text={this.state.alertText}
          onClick={()=> {
            this.setState({ isAddingAddressName: false, visibleModal: false})
            // if(!this.state.isError){
            //   this.props.router.push('orderSummaryStack');
            // }
          }}
          alertType={this.state.isError == true ? 'error' : 'primary'}
        />
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
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
