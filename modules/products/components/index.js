import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import Style from './style.js';
import ProductItem from './productItems.js';
import Pagination from 'components/Pagination/WithBackground.js';
import Api from 'services/apiv2/index.js';
import {Routes, Color} from 'common';
import {connect} from 'react-redux';
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      deli: null,
    };
  }
  retrieveRestaurant = () => {
    const { storeLocation } = this.props.state;
    const { setRestaurantCategories } = this.props;
    if(storeLocation == null){
      return
    }
    Api.getRequest(
      Routes.restaurantCategoriesRetrieve + '?storeId=' + storeLocation.id,
      response => {
        setRestaurantCategories(response.categories)
      },
      error => {
        console.log(error);
      },
    );
  };
  retrieveDeli = () => {
    const { storeLocation } = this.props.state;
    const { setDeliCategories } = this.props;
    if(storeLocation == null){
      return
    }
    Api.getRequest(
      Routes.deliCategoriesRetrieve + '?storeId=' + storeLocation.id,
      response => {
        setDeliCategories(response.categories)
      },
      error => {
        console.log(error);
      },
    );
  };
  componentDidMount() {
    this.retrieveRestaurant();
    this.retrieveDeli();
  }

  setSelectedFilter(item, category){
    const{ setFilter } = this.props;
    setFilter({...item,
      category: category
    })
  }

  render() {
    let menu = [
      {
        title: 'RESTAURANT MENU',
      },
      {
        title: 'DELI-STORE',
      },
    ];
    const { restaurant, deliStore } = this.props.state;
    return (
      <View style={[{flex: 1, backgroundColor:Color.white, padding: 0}]}>
        <Pagination
          menu={menu}
          activeIndex={this.props.active}
          onChange={index => this.props.click(index)}
        />
        {this.props.active == 0 && (
          <ScrollView
          style={this.props.active == 0 ? Style.showScroll : Style.hideScroll}
          showsVerticalScrollIndicator={false}>
            <View style={Style.scrollContainer}>
              <Image source={require('assets/products/res.png')} />
              <View style={Style.imageRow}>
                {restaurant != null &&
                  restaurant.map((data, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          await this.setSelectedFilter(data, 'restaurant')
                          await this.props.choose(data.id, 0)
                        }}
                        key={idx}>
                        <ProductItem
                          name={data.name}
                          imageURL={data.image.src}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
        )}
        {this.props.active == 1 && (
          <ScrollView
            style={this.props.active == 1 ? Style.showScroll : Style.hideScroll}
            showsVerticalScrollIndicator={false}>
            <View style={Style.scrollContainer}>
              <Image source={require('assets/products/deli.png')} />
              <View style={Style.imageRow}>
                {deliStore != null &&
                  deliStore.map((data, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          await this.setSelectedFilter(data, 'deli')
                          await this.props.choose(data.id, 1)
                        }}
                        key={idx}>
                        <ProductItem
                          name={data.name}
                          imageURL={data.image.src}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setDeliCategories: (categories) => dispatch(actions.setDeliCategories(categories)),
    setRestaurantCategories: (categories) => dispatch(actions.setRestaurantCategories(categories)),
    setFilter: (filter) => dispatch(actions.setFilter(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

