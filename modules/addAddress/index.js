import React, { Component } from 'react';
import { View, Dimensions, TextInput, Text, TouchableHighlight, ScrollView } from 'react-native';
import GooglePlacesAutoCompleteWithMap from 'components/Location/GooglePlacesAutoCompleteWithMap.js';
import Location from 'components/Location';
import Style from './Styles';
import LocationWithIcon from 'modules/accounts/components/LocationInput.js';
import {Picker} from '@react-native-community/picker';
import {Helper, Color, Routes, BasicStyles} from 'common';
import Api from 'services/apiv2/index.js';
import { connect } from 'react-redux';
import Alert from 'modules/generic/alert';

let width = Math.round(Dimensions.get('window').width);
let height = Math.round(Dimensions.get('window').height);

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      fullName: '',
      email: 'example@email.com',
      password: '',
      location: '',
      phoneNumber: '123456789',
      stores: [],
      c_password: '',
      isShowingCity: false,
      selectedCity: '',
      countries: [],
      countryId: null,
      buildingId: null,
      streetAddress: '',
      townDistrict: '',
      postalOrZip: '',
      isAgree: false,
      addressName: '',
      errorMessage: '',
      alert: false,
      alertText: '',
      isError: false
    };
  }

  componentDidMount() {
    this.retrieveAllBuildings();
    this.retrieveCountries();
  }

  retrieveAllBuildings = () => {
    Api.getRequest(Routes.allBuildings(), response => {
      console.log('ALL BUILDINGS: ', response)
      this.setState({ isLoading: false, stores: response.buildings })
    }, error => {
      console.log('Error: ', error)
    })
  }

  retrieveCountries = () => {
    this.setState({ isLoading: true})
    Api.getRequest(Routes.getCountries, response => {
      this.setState({ isLoading: false, countries: response.countries}, () => {
        this.state.countries.forEach(el => {
          if(el == Helper.Country) {
            this.setState({countryId: el.id})
          }
        })
      })
    }, error => {
      this.setState({ isLoading: false})
    })
  }

  selectCity = (itemValue, itemIndex) => {
    this.setState({selectedCity: itemValue})
  }

  validate() {
    const {
      fullName,
      email,
      location,
      phoneNumber,
      selectedCity,
      streetAddress,
      townDistrict,
      postalOrZip,
      addressName
    } = this.state;
    if (
      fullName === '' &&
      location === '' &&
      phoneNumber === '' &&
      email === '' &&
      password === '' &&
      password.length < 6 &&
      !Helper.validateEmail(email)) {
        console.log('all')
        this.setState({ errorMessage: 'Please fill in all required fields.' })
        return false
    } else if(addressName == '') {
      this.setState({ errorMessage: 'Please specify address type.' })
      return false
    } else if(!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(fullName)){
      this.setState({errorMessage: 'Full name should be valid.'});
      return false;
    }else if (!Helper.validateEmail(email)) {
      this.setState({ errorMessage: 'You have entered an invalid email address.' })
      return false
    } else if (!/^[0-9]{7,11}$/.test(phoneNumber)) {
      this.setState({ errorMessage: 'Invalid phone number.' })
      return false
    } else if(location == '') {
      this.setState({ errorMessage: 'Please choose your location.' })
      return false
    } else if(location == 'Other'){
      if(streetAddress == '') {
        this.setState({ errorMessage: 'Please add your street address.' })
        return false
      }else if(townDistrict == ''){
        this.setState({ errorMessage: 'Please add your town or district.' })
        return false
      }else if(selectedCity == '') {
        this.setState({ errorMessage: 'Please choose your city.' })
        return false
      }else if(postalOrZip == '') {
        this.setState({ errorMessage: 'Please add your postal or zip code.' })
        return false
      }
    }
    return true;
  }

  addAddress = () => {
    const { user } = this.props.state;
    let {
      fullName,
      buildingId,
      selectedCity,
      postalOrZip,
      townDistrict, //address 1
      streetAddress, //address 2
      addressName
    } = this.state
    console.log(
      user.id, 
      fullName, 
      buildingId,  
      selectedCity, 
      postalOrZip, 
      townDistrict, 
      streetAddress, 
      addressName
    )
    if(this.validate()){
      Api.postRequest(
        Routes.customerAddAddress(
          user.id, 
          fullName, 
          buildingId,  
          selectedCity, 
          postalOrZip, 
          townDistrict,
          streetAddress, 
          addressName
        ),
        {}, response => {
          console.log("Adding address response: ", response);
          this.setState({
            fullName: '', 
            buildingId: null,  
            selectedCity: '', 
            postalOrZip: '', 
            townDistrict: '', 
            streetAddress: '', 
            addressName: '',
            streetAddress: '',
            townDistrict: '',
            postalOrZip: '',
            alertText: '',
            errorMessage: ''
          }, () => {
            this.setState({alert: true, alertText: 'Added Succesfully!', isError: false})
          });
        }, error => {
          console.log("Adding address error: ", error);
          this.setState({alert: true, alertText: 'Adding address error', isError: true})
        });
      }
  }

  render() {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={[
          Style.AddAddressContainer,
          {
            paddingTop: 30,
            paddingBottom: 30,
            minHeight: height,
            alignItems: 'center'
          }
        ]}>
          {/* <Location
          // setLocation={location => {
          //   console.log('location', location);
          //   this.setState({location: location});
          // }}
          /> */}
          { this.state.errorMessage !== '' &&
            <Text style={{
              color: Color.danger,
              marginBottom: 20
            }}>{this.state.errorMessage}</Text>
          }
          <TextInput
            style={Style.textInput}
            {...Style.textPlaceHolder}
            onChangeText={(addressName) => this.setState({ addressName })}
            value={this.state.addressName}
            placeholder={'Address name'}
          />
          <TextInput
            style={Style.textInput}
            {...Style.textPlaceHolder}
            onChangeText={(fullName) => this.setState({ fullName })}
            value={this.state.fullName}
            placeholder={'Full name'}
          />
          {/* <TextInput
            style={Style.textInput}
            {...Style.textPlaceHolder}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            placeholder={'Email'}
          /> */}

          {/* <TextInput
            style={Style.textInput}
            {...Style.textPlaceHolder}
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
            value={this.state.phoneNumber}
            placeholder={'Phone number'}
          /> */}
          <LocationWithIcon {...{
            style: [
              Style.textInput,
              {
                backgroundColor: Color.white,
                color: Color.primary
              },
              Style.textPlaceHolder
            ],
            selected: this.state.location,
            placeholder: "Select location",
            placeholderColor: Color.primary,
            iconHeight: 20,
            stores: this.state.stores,
            onSelect: (selectedItem) => {
              // this.props.setLocation(selectedItem)
              // this.props.setStoreLocation(selectedItem);
              this.setState({ location: selectedItem.building_name, buildingId: selectedItem.id })
              if (selectedItem.building_name === 'Other') {
                this.setState({ isShowingCity: true })
              } else {
                this.setState({ isShowingCity: false })
              }
            }
          }} />
          { this.state.isShowingCity &&
            <View>
              <TextInput
                style={Style.textInput}
                {...Style.textPlaceHolder}
                onChangeText={(streetAddress) => this.setState({ streetAddress: streetAddress })}
                value={this.state.streetAddress}
                placeholder={'Street address'}
              />
              <TextInput
                style={Style.textInput}
                {...Style.textPlaceHolder}
                onChangeText={(townDistrict) => this.setState({ townDistrict: townDistrict })}
                value={this.state.townDistrict}
                placeholder={'Town / District'}
              />
              <View style={Style.textInput}>
                <Picker
                  selectedValue={this.state.selectedCity}
                  style={[
                    Style.textInput,
                    {
                      color: Color.primary
                    }
                  ]}
                  onValueChange={this.selectCity}
                >
                  {
                    Helper.locations.map((el, ndx) => {
                      return (
                        <Picker.Item label={el} value={el} key={'city' + ndx} />
                      )
                    })
                  }
                </Picker>
              </View>
              <TextInput
                style={Style.textInput}
                {...Style.textPlaceHolder}
                onChangeText={(postalOrZip) => this.setState({ postalOrZip: postalOrZip })}
                value={this.state.postalOrZip}
                placeholder={'Postal / Zip'}
              />
            </View>
          }
          <TouchableHighlight
            style={[
              BasicStyles.btn,
              Style.btnWhite,
              {
                backgroundColor: Color.primary
              }
            ]}
            onPress={() => this.addAddress()}
            underlayColor={Color.gray}>
            <Text style={[
              Style.textPrimary,
              Style.fontWeight('bold'),
              Style.fontSize(18),
              {
                color: Color.white
              }
            ]}>
              ADD
            </Text>
          </TouchableHighlight>
          <Alert
            show={this.state.alert}
            text={this.state.alertText}
            onClick={()=> this.setState({ alert: false}) }
            alertType={this.state.isError == true ? 'error' : 'primary'}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddress);
