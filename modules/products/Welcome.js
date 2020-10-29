import React, { Component } from 'react';
import Style from './Style.js';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, TextInput} from 'react-native';
import { BasicStyles, Color } from 'common';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faEdit, faUserCircle, faSearch, faSlidersH, faShoppingBasket, faHandHolding } from '@fortawesome/free-solid-svg-icons';
import Products from './components/';
class Welcome extends Component{
  constructor(props){
    super(props);
    this.state = {
      visibleModal : true
    }
  }
  render() {
    return (
      <View style={Style.MainContainer}>
        <Modal isVisible={this.state.visibleModal} style={Style.modal} onRequestClose={() => { this.setState({visibleModal: false})} }>
        <View style={{
                  width: '30%',
                  marginRight: 200
                }}>
                  <TouchableOpacity
              style={[{ marginTop: 40 }]} onPress={() => {this.setState({visibleModal: false})}}>
            <FontAwesomeIcon icon={ faTimes } style={{
                      color: Color.white
                    }} size={BasicStyles.iconSize} />
          </TouchableOpacity>
                </View>
        <View style={Style.circle}>
          <View style={Style.LogoContainer}>
            <Image source={require('assets/logo.png')} style={Style.LogoSize}/>
          </View>
          <View style={Style.TextContainer}>
            <Text style={[Style.textSecondary]}>Products from our deli store right at your finger tips</Text>
          </View>
          <TouchableOpacity
              style={[BasicStyles.btn, Style.btnWhite, { marginTop: 70 }]}>
            <Text style={[Style.textPrimary]}>GO TO GROCERIES</Text>
          </TouchableOpacity>
        </View>
          
        <View style={Style.circle}>
          <View style={Style.LogoContainer}>
            <Image source={require('assets/logo.png')} style={Style.LogoSize}/>
          </View>
          <View style={Style.TextContainer}>
            <Text style={[Style.textSecondary]}>Meals from our kitchen straight to your dinner table</Text>
          </View>
          <TouchableHighlight
              style={[BasicStyles.btn, Style.btnWhite, { marginTop: 70 }]}>
            <Text style={[Style.textPrimary]}>GO TO RESTAURANTS</Text>
          </TouchableHighlight>  
        </View>
        </Modal>
        <View>
          <View style={Style.delivery}>
            <Text style={[{ fontSize: 18, flex: 1 }]}>Deliver to:  </Text>
            <Text style={[Style.textPrimary, { flex: 3, fontSize: 18 }]}>1a, Centre Stage Tower 1</Text>
            <TouchableOpacity style={[{flex: 0}]}>
              <FontAwesomeIcon icon={ faEdit } style={{color: Color.darkGray}} size={BasicStyles.iconSize} />
            </TouchableOpacity>
          </View>
          <View style={Style.delivery}>
            <View style={Style.searchBar}>
              <TouchableOpacity style={[{flex: 1}]}>
                <FontAwesomeIcon icon={ faSearch } style={{color: Color.darkGray, marginLeft: 10}} size={BasicStyles.iconSize} />
              </TouchableOpacity>
              <TextInput style={[{height: 37, flex: 7, width: "100%"}]} placeholder={'Email'}/>
              <TouchableOpacity style={[{flex: 0, borderLeftColor: Color.gray, borderLeftWidth: 1}]}>
                <FontAwesomeIcon icon={ faSlidersH } style={{color: Color.darkGray, marginRight: 10, marginLeft: 10}} size={BasicStyles.iconSize} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[{flex: 0}]}>
              <FontAwesomeIcon icon={ faUserCircle } style={{color: Color.primary}} size={BasicStyles.iconSize} />
            </TouchableOpacity>
          </View>
          <Products />
          <View style={[{width: "100%", flexDirection: 'row', alignItems: 'center'}]}>
            <TouchableOpacity style={Style.bottomMenu}>
            <View style={[{width: "100%", flexDirection: 'row', alignItems: 'center'}]}>
              <FontAwesomeIcon icon={ faHandHolding } style={{color: Color.darkGray}} size={30} />
              <Text style={Style.bottomMenuText}>Pick up crocery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Style.bottomMenu}>
            <View style={[{width: "100%", flexDirection: 'row', alignItems: 'center'}]}>
              <FontAwesomeIcon icon={ faShoppingBasket } style={{color: Color.darkGray}} size={30} />
              <Text style={Style.bottomMenuText}>Basket</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Welcome; 