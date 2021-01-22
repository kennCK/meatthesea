import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { BasicStyles, Color } from 'common';
import Api from 'services/apiv2/index.js';
import { Routes } from 'common';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import {NavigationActions, StackActions} from 'react-navigation';

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
      const { setRestaurantCategories } = this.props;
      setRestaurantCategories(response.categories)
      this.setState({isLoading: false})
    }, error => {
      console.log(error);
    });
  }
  retrieveDeli = (storeId) => {
    this.setState({isLoading: true})
    Api.getRequest(Routes.deliCategoriesRetrieve + "?storeId=" + storeId, response => {
      const { setDeliCategories } = this.props;
      setDeliCategories(response.categories)
      this.setState({isLoading: false})
    }, error => {
      console.log(error);
    });
  }
  
  componentDidMount(){
    const { storeLocation } = this.props.state;
    if(storeLocation === null){
      this.props.navigation.navigate('homepageStack')
      return
    }
    this.retrieveRestaurant(storeLocation.id)
    this.retrieveDeli(storeLocation.id)
    console.log('store', this.props.state.storeLocation.id)
  }

  setSelectedFilter(item, category){
    const{ setFilter } = this.props;
    setFilter({...item,
      category: category
    })
    const { setHomepageSettings } = this.props;
    setHomepageSettings({
      type: category == 'restaurant' ? 0 : 1,
      selectedMenu: category == 'restaurant' ? 0 : 1
    })
    this.props.navigation.navigate('homepageStack')
  }

  render() {
    const { restaurant, deliStore,filter } = this.props.state;
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Meals from our kitchen</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
          { restaurant != null &&
            restaurant.map((item, idx) => {
              return (<TouchableOpacity
                style={[{ marginTop: 15 }]}
                key={idx}
                onPress={() => this.setSelectedFilter(item, 'restaurant')}
                >
                <Text style={{
                  color: filter !== null && filter.id === item.id ? Color.primary : Color.black,
                  fontWeight: filter !== null && filter.id === item.id ? 'bold' : 'normal'
                }}>{item.name}</Text>
              </TouchableOpacity>)
            })
          }
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Grocery Items</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
          { deliStore != null &&
                deliStore.map((item, idx) => {
                  return <TouchableOpacity
                    style={[{ marginTop: 15 }]}
                    key={idx}
                    onPress={() => this.setSelectedFilter(item, 'deli')}
                    >
                    <Text style={{
                      color: filter !== null && filter.id === item.id ? Color.primary : Color.black,
                      fontWeight: filter !== null && filter.id === item.id ? 'bold' : 'normal'
                    }}>{item.name}</Text>
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
    setDeliCategories: (categories) => dispatch(actions.setDeliCategories(categories)),
    setRestaurantCategories: (categories) => dispatch(actions.setRestaurantCategories(categories)),
    setHomepageSettings: (settings) => dispatch(actions.setHomepageSettings(settings)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
