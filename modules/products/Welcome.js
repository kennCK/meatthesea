import React, { Component } from 'react';
import Style from './Style.js';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native';
import { BasicStyles, Color } from 'common';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faEdit, faUserCircle, faSearch, faSlidersH, faShoppingBasket, faHandHolding } from '@fortawesome/free-solid-svg-icons';
import Products from './components/';
import Menu from './components/menu.js';
const width = Math.round(Dimensions.get('window').width);
class Welcome extends Component{
  constructor(props){
    super(props);
    this.state = {
      visibleModal : true,
      redirects: ['accountStack', 'filterStack', 'orderSummaryStack', 'pickupCrockeryStack', 'deliveryDetailsStack']
    }
  }
  redirect(index){
    this.props.navigation.navigate(this.state.redirects[index]);
  }
  changeMenu(index){
    this.setState({visibleModal: false})
    if(index == 2){
      this.props.navigation.navigate('appOnBoardingStack');
    }else{
      this.refs.prods.changeMenu(index)
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
              style={[{ marginTop: 40 }]} onPress={() => this.changeMenu(2)}>
            <FontAwesomeIcon icon={ faTimes } style={{
                      color: Color.gray
                    }} size={BasicStyles.iconSize} />
          </TouchableOpacity>
                </View>
        <View style={Style.circle}>
          <View style={Style.LogoContainer}>
            <Image source={require('assets/groceries.png')} style={Style.LogoSize}/>
          </View>
          <View style={Style.TextContainer}>
            <Text style={[Style.textSecondary]}>Products from our deli store right at your finger tips</Text>
          </View>
          <TouchableOpacity
              style={[BasicStyles.btn, Style.btnWhite, { marginTop: 70 }]} onPress={() => this.changeMenu(1)}>
            <Text style={[Style.textPrimary]}>GO TO GROCERIES</Text>
          </TouchableOpacity>
        </View>
          
        <View style={Style.circle}>
          <View style={Style.LogoContainer}>
            <Image source={require('assets/restaurants.png')} style={Style.LogoSize}/>
          </View>
          <View style={Style.TextContainer}>
            <Text style={[Style.textSecondary]}>Meals from our kitchen straight to your dinner table</Text>
          </View>
          <TouchableHighlight
              style={[BasicStyles.btn, Style.btnWhite, { marginTop: 70 }]} onPress={() => this.changeMenu(0)}>
            <Text style={[Style.textPrimary]}>GO TO RESTAURANTS</Text>
          </TouchableHighlight>  
        </View>
        </Modal>
        <View>
          <View style={Style.delivery}>
            <Text style={[{ fontSize: 18, flex: 1 }]}>Deliver to:  </Text>
            <Text style={[Style.textPrimary, { flex: 3, fontSize: 18 }]}>1a, Centre Stage Tower 1</Text>
            <TouchableOpacity style={[{flex: 0}]} onPress={() => this.redirect(4)}>
              <FontAwesomeIcon icon={ faEdit } style={{color: Color.darkGray}} size={BasicStyles.iconSize} />
            </TouchableOpacity>
          </View>
          <View style={Style.delivery}>
            <View style={Style.searchBar}>
              <TouchableOpacity style={[{flex: 1}]}>
                <FontAwesomeIcon icon={ faSearch } style={{color: Color.darkGray, marginLeft: 10}} size={BasicStyles.iconSize} />
              </TouchableOpacity>
              <TextInput style={[{height: 37, flex: 7, width: "100%"}]} placeholder={'Email'}/>
              <TouchableOpacity style={[{flex: 0, borderLeftColor: Color.gray, borderLeftWidth: 1}]} onPress={() => this.redirect(1)}>
                <FontAwesomeIcon icon={ faSlidersH } style={{color: Color.darkGray, marginRight: 10, marginLeft: 10}} size={BasicStyles.iconSize} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[{flex: 0}]} onPress={() => this.redirect(0)}>
              <FontAwesomeIcon icon={ faUserCircle } style={{color: Color.primary}} size={BasicStyles.iconSize} />
            </TouchableOpacity>
          </View>
          <Products ref="prods"/>
          {/* <Menu /> */}
          <View style={{ height: 50, flexDirection: 'row', }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={{width: width / 2, borderWidth: 1, borderColor: Color.primary, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.redirect(3)}>
              <View style={[{width: "100%", flexDirection: 'row', alignItems: 'center'}]}>
                <FontAwesomeIcon icon={ faHandHolding } style={{color: Color.darkGray}} size={30} />
                <Text style={Style.bottomMenuText}>Pick up crockeries</Text>
              </View>
              </TouchableOpacity>
            </ScrollView>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={{width: width / 2, borderWidth: 1, borderColor: Color.primary, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.redirect(2)}>
              <View style={[{width: "100%", flexDirection: 'row', alignItems: 'center'}]}>
                <FontAwesomeIcon icon={ faShoppingBasket } style={{color: Color.darkGray}} size={30} />
                <Text style={Style.bottomMenuText}>Basket</Text>
              </View>
              </TouchableOpacity>
            </ScrollView>
        </View>
        </View>
      </View>
    );
  }
}
export default Welcome; 