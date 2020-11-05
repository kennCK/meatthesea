import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { BasicStyles, Color } from 'common';

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Meals from our kitchen</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Bites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Snacks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Deep fried snacks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Salads / soups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Main Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Pastas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Sides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Steaks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Desserts</Text>
            </TouchableOpacity>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20}]}>
            <Text style={[BasicStyles.headerTitleStyle, {fontSize:20}]}>Meals from our kitchen</Text>
          </View>
          <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, padding: 20, paddingTop: 0}]}>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Alcoholic drinks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Beef / Steak</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Bread</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Candy & Cookies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Cheese</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Cold Cuts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Deli / Antipasti / Tapas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Desserts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Dry Goods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Dutch food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Fish & Seafood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Frozen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Fruits and vegetables</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Lamb</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Non alcoholic drinks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Pork</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Sauces</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Sausage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Turkey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ marginTop: 15 }]}>
              <Text>Vegetarian "meats"</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Filter;
