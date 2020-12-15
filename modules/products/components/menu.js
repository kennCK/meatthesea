import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
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
class Menu extends Component {
  state = {
    restaurant: null,
    deli: null,
    visibleModal: false,
    itemName: null,
    itemPrice: null,
    itemDescription: null,
    itemImage: null,
    itemID: null,
    qty: 0,
  };

  retrieveRestaurant = () => {
    this.props.load(true);
    Api.getRequest(
      Routes.restaurantCategoriesRetrieve + '?storeId=' + 1,
      (response) => {
        this.setState({restaurant: response.categories});
        this.props.load(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  retrieveDeli = () => {
    this.props.load(true);
    Api.getRequest(
      Routes.deliCategoriesRetrieve + '?storeId=' + 1,
      (response) => {
        this.setState({deli: response.categories});
        this.props.load(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  componentDidMount() {
    console.log(this.props.state);
    if (this.props.type == 0) {
      this.retrieveRestaurant();
    } else {
      this.retrieveDeli();
    }
  }
  selectItem(ndx) {
    this.setState({
      visibleModal: true,
      itemID: this.props.products[ndx].id,
      itemName: this.props.products[ndx].name,
      itemPrice: this.props.products[ndx].price,
      itemImage: this.props.products[ndx].images[0].src,
      itemDescription: this.props.products[ndx].full_description,
      qty: 1,
    });
  }
  addToCart() {
    console.log(this.state.itemID);
  }
  render() {
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
          {this.props.type == 0 && (
            <Text style={{fontWeight: 'bold'}}>RESTAURANT MENU</Text>
          )}
          {this.props.type == 1 && (
            <Text style={{fontWeight: 'bold'}}>DELI-STORE MENU</Text>
          )}
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.restaurant != null &&
              this.state.restaurant.map((data, idx) => {
                return (
                  <TouchableOpacity
                    style={Style.menuButton}
                    onPress={() => this.props.press(data.id, this.props.type)}
                    key={idx}>
                    <Text
                      style={
                        this.props.menu == data.id
                          ? {color: Color.primary}
                          : {color: Color.black}
                      }>
                      {data.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            {this.state.deli != null &&
              this.state.deli.map((data, idx) => {
                return (
                  <TouchableOpacity
                    style={Style.menuButton}
                    onPress={() => this.props.press(data.id, this.props.type)}
                    key={idx}>
                    <Text
                      style={
                        this.props.menu == data.id
                          ? {color: Color.primary}
                          : {color: Color.black}
                      }>
                      {data.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={Style.imageRow}>
              {this.props.products != null &&
                this.props.products.map((data, idx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.selectItem(idx)}
                      key={idx}>
                      <View style={Style.menuContainer}>
                        <Image
                          source={{uri: data.images[0].src}}
                          style={Style.menuImage}
                        />
                        <Text style={{fontWeight: 'bold'}}>
                          HK$ {data.price}
                        </Text>
                        <Text>{data.name}</Text>
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
          animationIn="slideInRight"
          animationOut="slideOutRight"
          onRequestClose={() => {
            this.setState({visibleModal: false});
          }}>
<<<<<<< HEAD
          <View style={{ alignItems: 'center', height: '100%', flex: 1}}>
            <Image source={{ uri: this.state.itemImage }} style={Style.productImageFull} />
            <TouchableOpacity
              style={[{ backgroundColor: Color.primary, borderRadius: 20, position: 'absolute', top: 15, left: 15 }]}
=======
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
>>>>>>> 71cac73f61c94522568d3f879f0c5d4a200542ef
              onPress={() => {
                this.setState({visibleModal: false});
              }}>
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  color: Color.white,
                  margin: 5
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
            <NumericInput
              value={this.state.qty}
              onChange={(qty) => this.setState({qty})}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              valueType="real"
              minValue={1}
              borderColor="#ffffff"
              totalWidth={130}
              editable={false}
              iconStyle={{color: Color.primary}}
            />
            <TouchableHighlight
              style={[BasicStyles.btn, {marginTop: 15}]}
              underlayColor={Color.gray}
              onPress={() => {
                if (this.props.user == null) {
                  this.props.router.push('loginStack');
                  this.setState({visibleModal: false});
                } else {
                  this.addToCart();
                }
              }}>
              <Text
                style={[{color: 'white', fontWeight: 'bold', fontSize: 18}]}>
                {this.props.isGuest == true
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
export default Menu;
