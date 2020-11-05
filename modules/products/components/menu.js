import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BasicStyles, Color } from 'common';
import Style from './style.js';

class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1,padding: 10, borderColor: Color.gray }} >
          <TouchableOpacity onPress={() => this.props.press(null)} style={{position: 'absolute', left: 0}}>
            <FontAwesomeIcon icon={faArrowLeft} size={BasicStyles.iconSize} style={[{paddingLeft: 20, paddingRight: 20}]}/>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold'}}>RESTAURANT MENU</Text>
        </View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={Style.menuButton} onPress={() => this.props.press('bites')}>
                <Text style={this.props.menu == 'bites'?{color: Color.primary}:{color: Color.black}}>Bites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton} onPress={() => this.props.press('snacks')}>
                <Text style={this.props.menu == 'snacks'?{color: Color.primary}:{color: Color.black}}>Snacks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton} onPress={() => this.props.press('fried')}>
                <Text style={this.props.menu == 'fried'?{color: Color.primary}:{color: Color.black}}>Deep fried snacks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton}>
                <Text style={{color: Color.black}}>Salads / soups</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton}>
                <Text style={{color: Color.black}}>Main Courses</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton}>
                <Text style={{color: Color.black}}>Pastas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton}>
                <Text style={{color: Color.black}}>Sides</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton}>
                <Text style={{color: Color.black}}>Steaks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.menuButton}>
                <Text style={{color: Color.black}}>Desserts</Text>
              </TouchableOpacity>
            </ScrollView>
            {this.props.menu == 'bites' &&
              <View style={{alignItems: 'center'}}>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/bites/1.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 80</Text>
                    <Text>Homemade bitterballen with mu....</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/bites/2.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 120</Text>
                    <Text>Cold cut platter with Parma ham, cheese, ...</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/bites/3.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 60</Text>
                    <Text>Warm crispy pesto bread served with...</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/bites/4.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 90</Text>
                    <Text>Homemade seafood croquette (4 pieces)</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/bites/5.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 130</Text>
                    <Text>Tuna tataki with soy sauce, seaweed, ...</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/bites/6.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 150</Text>
                    <Text>Sizling shrimp with garlic and toast</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            }
            {this.props.menu == 'snacks' &&
              <View style={{alignItems: 'center'}}>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/1.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 90</Text>
                    <Text>Olives, Italia mix</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/2.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 98</Text>
                    <Text>Hummus with garlic toast</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/3.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 118</Text>
                    <Text>Jalapenos filled with herb cheese</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/4.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 88</Text>
                    <Text>Dates filled with goat cheese</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/5.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 188</Text>
                    <Text>Raw beef sausage 'Ossenworst' with ...</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/6.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 128</Text>
                    <Text>Pesto and tomato tapenade with toast</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/7.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 128</Text>
                    <Text>Sweet pepper with cream sheese</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/snacks/8.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 188</Text>
                    <Text>Escargot with herd butter and toast</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            }
            {this.props.menu == 'fried' &&
              <View style={{alignItems: 'center'}}>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/fried/1.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 88</Text>
                    <Text>Cheese pockets 'Kaassouffle' (6 pieces)</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/fried/2.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 88</Text>
                    <Text>Small sausages 'Frikandellen' (12 pieces)</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/fried/3.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 88</Text>
                    <Text>Mexican herb sausages 'Mexicano' (6 pieces)</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/fried/4.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 80</Text>
                    <Text>Homemade beef dumpling 'Bitterballen' ...</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Style.imageRow}>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/fried/5.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 98</Text>
                    <Text>Homemade pork spring rolls (8 pieces)</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.menuContainer}>
                    <Image source={require('assets/products/fried/6.png')} style={Style.menuImage}/>
                    <Text style={{fontWeight: 'bold'}}>HK$ 118</Text>
                    <Text>Vegetarian nuggets 'good bite'</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            }
          </ScrollView>
      </View>
    );
  }
}

export default Menu;