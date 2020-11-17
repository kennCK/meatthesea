import React, { Component } from 'react';
import { View, Image, Text} from 'react-native';
import Style from './style.js';
import {BasicStyles} from 'common';
class ProductItems extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { name, imageURL } = this.props
    let Image_Http_URL ={ uri: imageURL}; 
    return (
      <View style={Style.productContainer}>
        <Image source={Image_Http_URL} style={Style.productImage}/>
        <Text style={Style.productName}>{name}</Text>
      </View>
    );
  }
}

export default ProductItems;