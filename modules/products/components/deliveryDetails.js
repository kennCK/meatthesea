import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BasicStyles, Color } from 'common';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import Style from './style.js';
import {Picker} from '@react-native-community/picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'home', value: 0, address: '1a, 1 Main Street, Hong.....' },
  {label: 'office', value: 1, address: '2b, 2 Main Street, Hong.....' },
];

class DeliveryDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedItem: 0,
      value3Index: 0,
      radio: radio_props[0],
      radio_open: false
    }
  }
  click(ndx){
    this.setState({value3Index: ndx})
    this.setState({radio: radio_props[ndx]})
    this.show();
  }
  show(){
    this.setState({radio_open: this.state.radio_open?false:true})
  }
  render() {
    return (
      <View>
        <Modal isVisible={this.props.state} style={Style.modal}>
          <View style={{ width: '30%', marginRight: 200 , marginBottom: 15}}>
            <TouchableOpacity style={[{ marginTop: 40 }]} onPress={this.props.click}>
              <FontAwesomeIcon icon={ faTimes } style={{ color: Color.gray }} size={BasicStyles.iconSize} />
            </TouchableOpacity>
          </View>
          <View style={Style.modalBox}>
            <Text>Delivery time:</Text>
            <Picker selectedValue={this.state.selectedItem} style={{height: 50, width: 100}} onValueChange={(itemValue, itemIndex) => this.setState({selectedItem: itemValue})} style={[{width: '100%'}]}>
              <Picker.Item label="10:00" value={0} />
              <Picker.Item label="10:15" value={1} />
              <Picker.Item label="10:30" value={2} />
              <Picker.Item label="11:00" value={3} />
            </Picker>
            <Text>Address:</Text>
            {
              !this.state.radio_open &&
              <View style={[{width:'100%', padding: 10}]}>
                <View style={[{flexDirection:'row'}]} >
                  <RadioButton labelHorizontal={true}>
                    <RadioButtonInput
                      obj={this.state.radio}
                      index={0}
                      isSelected={true}
                      buttonSize={10}
                      buttonInnerColor={Color.primary}
                      buttonOuterColor={Color.primary}
                    />
                    <RadioButtonLabel
                      obj={this.state.radio}
                      index={0}
                      labelWrapStyle={{marginLeft: 10}}
                    />
                  </RadioButton>
                  <TouchableOpacity style={[{marginLeft: 'auto'}]} onPress={() => this.show()} >
                    <FontAwesomeIcon icon={ faEdit } style={{color: Color.darkGray}} size={BasicStyles.iconSize}/>
                  </TouchableOpacity>
                </View>
                <Text>{this.state.radio.address}</Text>
              </View>
            }
            {
              this.state.radio_open &&
              <View style={[{marginTop: 10, width: '100%'}]}>
                <Text style={[{alignSelf: 'center'}]}>Choose Address</Text>
                <RadioForm animation={true} style={[{alignItems: 'center', marginTop: 10}]}>
                  {
                    radio_props.map((obj, i) => (
                      <View style={[{width:'100%', padding: 10}]}key={i}>
                        <View style={[{flexDirection:'row'}]} >
                          <RadioButton labelHorizontal={true}>
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={this.state.value3Index === i}
                              onPress={() => this.click(i)}
                              buttonSize={10}
                              buttonInnerColor={Color.primary}
                              buttonOuterColor={Color.primary}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              onPress={() => this.click(i)}
                              labelWrapStyle={{marginLeft: 10}}
                            />
                          </RadioButton>
                        </View>
                        <Text>{obj.address}</Text>
                      </View>
                    ))
                  }  
                  </RadioForm>
                  <TouchableOpacity>
                    <View style={[{flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10}]}>
                      <FontAwesomeIcon icon={ faPlus } style={{ color: Color.primary }} />
                      <Text style={[{marginLeft: 10, color: Color.primary}]}>add new address</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </Modal>
      </View>
    );
  }
}
export default DeliveryDetails; 