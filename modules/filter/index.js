import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { BasicStyles, Color } from 'common';
import Api from 'services/apiv2/index.js';
import { Routes } from 'common';
import { Spinner } from 'components';
import { connect } from 'react-redux';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      deli: null,
      isLoading: false
    }
  }
  retrieveRestaurant = (storeId) => {
    this.setState({isLoading: true})
    Api.getRequest(Routes.restaurantCategoriesRetrieve + "?storeId=" + storeId, response => {
      this.setState({restaurant: response.categories, isLoading: false})
    }, error => {
      console.log(error);
    });
  }
  retrieveDeli = (storeId) => {
    this.setState({isLoading: true})
    Api.getRequest(Routes.deliCategoriesRetrieve + "?storeId=" + storeId, response => {
      this.setState({deli: response.categories, isLoading: false})
    }, error => {
      console.log(error);
    });
  }
  
  componentDidMount(){
    const { location } = this.props.state;
    if(location === null){
      this.props.navigation.navigate('homepageStack')
      return
    }
    this.retrieveRestaurant(location.id)
    this.retrieveDeli(location.id)
    console.log('store', this.props.state.location.id)
  }

  setSelectedFilter(item, category){
    const{ setFilter } = this.props;
    setFilter({...item,
      category: category
    })
    this.props.navigation.navigate('homepageStack')
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
            this.state.restaurant.map((item, idx) => {
              return (<TouchableOpacity
                style={[{ marginTop: 15 }]}
                key={idx}
                onPress={() => this.setSelectedFilter(item, 'restaurant')}
                >
                <Text>{item.name}</Text>
              </TouchableOpacity>)
            })
          }
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Grocery Items</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
          { this.state.deli != null &&
                this.state.deli.map((item, idx) => {
                  return <TouchableOpacity
                    style={[{ marginTop: 15 }]}
                    key={idx}
                    onPress={() => this.setSelectedFilter(item, 'deli')}
                    >
                    <Text>{item.name}</Text>
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

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setFilter: (filter) => dispatch(actions.setFilter(filter)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
