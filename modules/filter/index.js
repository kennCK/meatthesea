import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { BasicStyles, Color } from 'common';
import Api from 'services/apiv2/index.js';
import { Routes } from 'common';
import { Spinner } from 'components';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      deli: null,
      isLoading: false
    }
  }
  retrieveRestaurant = () => {
    this.setState({isLoading: true})
    Api.getRequest(Routes.restaurantCategoriesRetrieve + "?storeId=" + 1, response => {
      this.setState({restaurant: response.categories, isLoading: false})
    }, error => {
      console.log(error);
    });
  }
  retrieveDeli = () => {
    this.setState({isLoading: true})
    Api.getRequest(Routes.deliCategoriesRetrieve + "?storeId=" + 1, response => {
      this.setState({deli: response.categories, isLoading: false})
    }, error => {
      console.log(error);
    });
  }
  componentDidMount(){
    this.retrieveRestaurant()
    this.retrieveDeli()
  }
  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Meals from our kitchen</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
          { this.state.restaurant != null &&
                this.state.restaurant.map((data, idx) => {
                  return <TouchableOpacity style={[{ marginTop: 15 }]} key={idx}>
                  <Text>{data.name}</Text>
                </TouchableOpacity>
                })
              }
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Meals from our kitchen</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
          { this.state.deli != null &&
                this.state.deli.map((data, idx) => {
                  return <TouchableOpacity style={[{ marginTop: 15 }]} key={idx}>
                  <Text>{data.name}</Text>
                </TouchableOpacity>
                })
              }
          </View>
        </ScrollView>
        {this.state.isLoading ? <Spinner mode="overlay"/> : null }
      </View>
    );
  }
}

export default Filter;
