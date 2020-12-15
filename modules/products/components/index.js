import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Style from './style.js';
import ProductItem from './productItems.js';
import Pagination from 'components/Pagination/Dynamic.js';
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
    const { location } = this.props.state;
    this.props.load(true);
    Api.getRequest(
      Routes.restaurantCategoriesRetrieve + '?storeId=' + location.id,
      response => {
        this.setState({restaurant: response.categories});
        console.log('products restaurant', response.categories)
        this.props.load(false);
      },
      error => {
        console.log(error);
      },
    );
  };
  retrieveDeli = () => {
    const { location } = this.props.state;
    this.props.load(true);
    Api.getRequest(
      Routes.deliCategoriesRetrieve + '?storeId=' + location.id,
      response => {
        this.setState({deli: response.categories});
        console.log('products categories', response.categories)
        this.props.load(false);
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
  render() {
    let menu = [
      {
        title: 'RESTAURANT MENU',
      },
      {
        title: 'DELI-STORE',
      },
    ];
    return (
      <View style={[{flex: 1, backgroundColor:Color.white}]}>
        <Pagination
          menu={menu}
          activeIndex={this.props.active}
          onChange={index => this.props.click(index)}
        />
        {this.props.active == 0 && (
          <ScrollView
            style={this.props.state == 0 ? Style.showScroll : Style.hideScroll}
            showsVerticalScrollIndicator={false}>
            <View style={Style.scrollContainer}>
              <Image source={require('assets/products/res.png')} />
              <View style={Style.imageRow}>
                {this.state.restaurant != null &&
                  this.state.restaurant.map((data, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.props.choose(data.id, 0)}
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
            style={this.props.state == 1 ? Style.showScroll : Style.hideScroll}
            showsVerticalScrollIndicator={false}>
            <View style={Style.scrollContainer}>
              <Image source={require('assets/products/deli.png')} />
              <View style={Style.imageRow}>
                {this.state.deli != null &&
                  this.state.deli.map((data, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.props.choose(data.id, 1)}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

