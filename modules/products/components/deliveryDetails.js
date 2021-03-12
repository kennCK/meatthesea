import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { BasicStyles, Color, Routes } from 'common';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlus, faEdit, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Style from './style.js';
import {Picker} from '@react-native-community/picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Api from 'services/apiv2/index.js';
import AddressCard from './addressCard';
import moment from 'moment';
import ModalStyle from './modalStyle';
import { color } from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker'

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

class DeliveryDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedItem: 0,
      value3Index: 0,
      radio: [],
      radio_open: false,
      selectedTile: '',
      time: '',
      isEditingTime: false,
      date: ''
    }
  }

  componentDidMount() {
    console.log('TEsting: ',new Date().toLocaleString() )
    this.setState({date: new Date().toLocaleString()})
  }

  click(ndx){
    this.setState({value3Index: ndx})
    this.setState({radio: radio_props[ndx]})
    this.show();
  }
  show(){
    this.setState({radio_open: this.state.radio_open?false:true})
  }

  setDate = (data) => {
    console.log("DATE EVENT: ", new Date(data).toLocaleTimeString())
    this.setState({date: data})
  }

  render() {
    const {isEditingTime, date} = this.state;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.state}
          style={{
            height: height
          }}
          >
          <View style={ModalStyle.insideModalCenteredView}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={Color.lightGray}
              style={{
                borderWidth: 1,
                paddingTop: 0,
                borderColor: Color.white,
                borderRadius: 20,
                position: 'absolute',
                top: 30,
                left: 20,
                backgroundColor: Color.white
              }}
              onPress={this.props.click}
              >
              <Text
                style={[
                  {
                    color: 'rgba(0,100,177,.9)',
                    fontSize: BasicStyles.standardFontSize + 15,
                    lineHeight: 21,
                    marginBottom: -10,
                    paddingTop: 7.5,
                    paddingBottom: 7.5,
                    paddingRight: 6,
                    paddingLeft: 6
                  }
                ]}
                >&times;</Text>
            </TouchableHighlight>
            <View style={Style.modalBox}>
            <Text>Delivery time:</Text>
            {/* <Picker selectedValue={this.state.selectedItem} style={{height: 50, width: 100}} onValueChange={(itemValue, itemIndex) => this.setState({selectedItem: itemValue})} style={[{width: '100%'}]}>
              <Picker.Item label="10:00" value={0} />
              <Picker.Item label="10:15" value={1} />
              <Picker.Item label="10:30" value={2} />
              <Picker.Item label="11:00" value={3} />
            </Picker> */}
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text>{moment().format('HH : mm')}</Text>
              <TouchableOpacity
                onPress={() => { 
                  this.props.click(true); 
                  setTimeout(() => {
                    this.setState({isEditingTime: true})
                  }, 300)
                }}
              >
                <FontAwesomeIcon
                  icon={faSortDown}
                />
              </TouchableOpacity>
            </View>
            <Text>Address:</Text>
            <TouchableOpacity style={[{marginLeft: 'auto'}]} onPress={() => this.show()} >
              <FontAwesomeIcon icon={ faEdit } style={{color: Color.darkGray}} size={BasicStyles.iconSize}/>
            </TouchableOpacity>
            {
              !this.state.radio_open &&
              <View style={[{width:'100%', padding: 10}]}>
                {/* <View style={[{flexDirection:'row'}]} >
                  <RadioButton labelHorizontal={true}>
                    <RadioButtonInput
                      obj={this.props.addresses}
                      index={this.props.defaultIndex}
                      isSelected={true}
                      buttonSize={10}
                      buttonInnerColor={Color.primary}
                      buttonOuterColor={Color.primary}
                    />
                    <RadioButtonLabel
                      obj={this.props.addresses}
                      index={0}
                      labelWrapStyle={{marginLeft: 10}}
                    />
                  </RadioButton>
                  <TouchableOpacity style={[{marginLeft: 'auto'}]} onPress={() => this.show()} >
                    <FontAwesomeIcon icon={ faEdit } style={{color: Color.darkGray}} size={BasicStyles.iconSize}/>
                  </TouchableOpacity>
                </View>
                <Text>{this.props.addresses[this.props.defaultIndex].address1}</Text> */}
                {

                  this.props.addresses.map((obj, index) => {
                    return this.props.defaultIndex === index && <AddressCard
                      key={index}
                      id={index}
                      selectedTile={true}
                      addressType={obj.address_name}
                      address={(obj.address1 === '' || obj.address1 === null) ? obj.address2 : obj.address1}
                      onSelect={() => {
                          this.props.selectHandler(index)
                        }
                      }
                    />
                  })
                }
              </View>
            }
            {
              this.state.radio_open &&
              <View style={[{marginTop: 10, width: '100%'}]}>
                <Text style={[{alignSelf: 'center'}]}>Choose Address</Text>
                {/* <RadioForm animation={true} style={[{alignItems: 'center', marginTop: 10}]}>
                  {
                    this.props.addresses.map((obj, i) => (
                      <View style={[{width:'100%', padding: 10}]}key={i}>
                        <View style={[{flexDirection:'row'}]} >
                          <RadioButton labelHorizontal={true}>
                            <RadioButtonInput
                              obj={this.props.addresses}
                              index={i}
                              isSelected={this.props.defaultIndex === i}
                              onPress={() => this.click(i)}
                              buttonSize={10}
                              buttonInnerColor={Color.primary}
                              buttonOuterColor={Color.primary}
                            />
                            <RadioButtonLabel
                              obj={this.props.addresses}
                              index={i}
                              onPress={() => this.click(i)}
                              labelWrapStyle={{marginLeft: 10}}
                            />
                          </RadioButton>
                        </View>
                        <Text>{obj.address1}</Text>
                      </View>
                    ))
                  }  
                  </RadioForm> */}
                  {
                    this.props.addresses.map((obj, index) => {
                      return <AddressCard
                        key={index}
                        id={index}
                        selectedTile={index === this.props.defaultIndex ? true : false}
                        addressType={obj.address_name}
                        address={(obj.address1 === '' || obj.address1 === null) ? obj.address2 : obj.address1}
                        onSelect={() => {
                            this.props.selectHandler(index)
                          }
                        }
                      />
                    })
                  }
                  <TouchableOpacity
                    onPress={() => this.props.click('redirecting')}
                  >
                    <View style={[{flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10}]}>
                      <FontAwesomeIcon icon={ faPlus } style={{ color: Color.primary }} />
                      <Text style={[{marginLeft: 10, color: Color.primary}]}>add new address</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            }
          </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isEditingTime}
          style={{
            height: height
          }}
          >
          <View style={ModalStyle.insideModalCenteredView}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={Color.lightGray}
              style={{
                borderWidth: 1,
                paddingTop: 0,
                borderColor: Color.white,
                borderRadius: 20,
                position: 'absolute',
                top: 30,
                left: 20,
                backgroundColor: Color.white
              }}
              onPress={() => {
                this.setState({isEditingTime: false})
              }}
              >
              <Text
                style={[
                  {
                    color: 'rgba(0,100,177,.9)',
                    fontSize: BasicStyles.standardFontSize + 15,
                    lineHeight: 21,
                    marginBottom: -10,
                    paddingTop: 7.5,
                    paddingBottom: 7.5,
                    paddingRight: 6,
                    paddingLeft: 6
                  }
                ]}
                >&times;</Text>
            </TouchableHighlight>
            <View style={ModalStyle.modalView}>
              <DatePicker
                date={new Date(date)}
                mode="time"
                androidVariant="nativeAndroid"
                onDateChange={this.setDate.bind(this)}
                minuteInterval={15}
              />
              <TouchableHighlight
                style={{
                  backgroundColor: Color.lightYellow,
                  color: Color.darkGray,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 5
                }}
              >
                <Text
                  style={[
                    BasicStyles.headerTitleStyle
                  ]}
                >GO</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


export default DeliveryDetails;
