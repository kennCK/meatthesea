import React, { Component } from 'react';
import { View, Image, Text} from 'react-native';
import Style from './style.js';
class ProductItems extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { name, imageURL } = this.props
    return (
      <View style={Style.productContainer}>
        <Image source={imageURL} style={Style.productImage}/>
        <Text style={Style.productName}>{name}</Text>
      </View>
    );
  }
}

export default ProductItems;