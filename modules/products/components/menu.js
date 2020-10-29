import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, TouchableHighlight, Text} from 'react-native';
import Style from './style.js';
import ProductItem from './productItems.js';
import Pagination from 'components/Pagination/Dynamic.js';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex : 0
    };
  }
  changeMenu(index){
    this.setState({activeIndex: index});
  }
  render() {
    let menu = [{
      title: 'RESTAURANT MENU'
    }, {
      title: 'DELI-STORE'
    }]
    return (
      <View style={[{flex: 1}]}>
          <Text>dasdsadasdsa</Text>
        <Pagination menu={menu} activeIndex={this.state.activeIndex} onChange={(index) => this.changeMenu(index)}/>
        { this.state.activeIndex == 0 && 
          <ScrollView style={this.state.activeIndex == 0 ? Style.showScroll: Style.hideScroll} showsVerticalScrollIndicator={false}>
            <View style={Style.scrollContainer}>
              <Image source={require('assets/products/res.png')}/>
              <View style={Style.imageRow}>
                <ProductItem name="Bites" imageURL={require('assets/products/res-bites.png')}/>
                <ProductItem name="Snacks" imageURL={require('assets/products/res-snack.png')}/>
                <ProductItem name="Deep fried snacks" imageURL={require('assets/products/res-fried.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Salads / soups" imageURL={require('assets/products/res-salad.png')}/>
                <ProductItem name="Main Courses" imageURL={require('assets/products/res-main.png')}/>
                <ProductItem name="Pastas"  imageURL={require('assets/products/res-pasta.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Sides" imageURL={require('assets/products/res-sides.png')}/>
                <ProductItem name="Steaks" imageURL={require('assets/products/res-steak.png')}/>
                <ProductItem name="Deserts" imageURL={require('assets/products/res-dessert.png')}/>
              </View>
            </View>
          </ScrollView>
        }
        {this.state.activeIndex == 1 && 
          <ScrollView style={this.state.activeIndex == 1? Style.showScroll: Style.hideScroll} showsVerticalScrollIndicator={false}>
            <View style={Style.scrollContainer}>
              <Image source={require('assets/products/deli.png')}/>
              <View style={Style.imageRow}>
                <ProductItem name="Alcoholic drinks" imageURL={require('assets/products/deli-alcohol.png')}/>
                <ProductItem name="Beef / Steak" imageURL={require('assets/products/deli-beef.png')}/>
                <ProductItem name="Bread" imageURL={require('assets/products/deli-bread.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Candy & Cookies" imageURL={require('assets/products/deli-candy.png')}/>
                <ProductItem name="Cheese" imageURL={require('assets/products/deli-cheese.png')}/>
                <ProductItem name="Chicken" imageURL={require('assets/products/deli-chicken.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Cold cuts" imageURL={require('assets/products/deli-cuts.png')}/>
                <ProductItem name="Crackers & Crisps" imageURL={require('assets/products/deli-crackers.png')}/>
                <ProductItem name="Deli / Antipasti / Tapas" imageURL={require('assets/products/deli-tapas.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Desert" imageURL={require('assets/products/deli-dessert.png')}/>
                <ProductItem name="Dry Goods" imageURL={require('assets/products/deli-goods.png')}/>
                <ProductItem name="Dutch Food" imageURL={require('assets/products/deli-dutch.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Fish & Seafood" imageURL={require('assets/products/deli-fish.png')}/>
                <ProductItem name="Frozen" imageURL={require('assets/products/deli-frozen.png')}/>
                <ProductItem name="Fruit and Vegetables" imageURL={require('assets/products/deli-fruits.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Lamb" imageURL={require('assets/products/deli-lamb.png')}/>
                <ProductItem name="Non alcoholic drinks" imageURL={require('assets/products/deli-nonalcoholic.png')}/>
                <ProductItem name="Pork" imageURL={require('assets/products/deli-pork.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Sauces" imageURL={require('assets/products/deli-sauces.png')}/>
                <ProductItem name="Sausages" imageURL={require('assets/products/deli-sausage.png')}/>
                <ProductItem name="Turkey" imageURL={require('assets/products/deli-turkey.png')}/>
              </View>
              <View style={Style.imageRow}>
                <ProductItem name="Vegetarian 'meats'" imageURL={require('assets/products/deli-veg.png')}/>
              </View>
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

export default Menu;