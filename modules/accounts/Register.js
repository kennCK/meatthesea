import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Image, TouchableHighlight, Text, ScrollView, Dimensions } from 'react-native';
import Style from './Style.js';
import { Spinner } from 'components';
import Api from 'services/apiv2/index.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import CustomError from 'components/Modal/Error.js';
import Header from './Header';
import config from 'src/config';
import LocationWithIcon from './components/LocationInput.js';
import {Picker} from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';

let width = Math.round(Dimensions.get('window').width);

class Register extends Component {
  //Screen1 Component
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      location: '',
      phoneNumber: '',
      isLoading: false,
      token: null,
      error: 0,
      errorMessage: null,
      isResponseError: false,
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
      isAgree: false
      // floor: null
    };
  }

  getData = async () => {
    let checkToken = (_expiry) => {
      if (_expiry < new Date().getTime() / 1000) {
        this.props.logout();
      } else {
        this.props.navigation.navigate('homepageStack');
      }
    }

    try {
      const token = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      const token_expiration = await AsyncStorage.getItem(Helper.APP_NAME + 'token_expiration');
      if (token != null) {
        this.setState({ token });
        setInterval(() => {
          checkToken(token_expiration)
        }, 1000)
      }
    } catch (e) {
        // error reading value
    }
}

  componentDidMount() {
    this.setState({ isLoading: true })
    this.getData();
    this.retrieveAllBuildings();
    this.retrieveCountries();
  }

  redirect = (route) => {
    this.props.navigation.navigate(route);
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

  submit() {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      countryId,
      selectedCity,
      buildingId,
      postalOrZip,
      townDistrict,
      streetAddress
    } = this.state;
    const { login } = this.props;
    const { storeLocation } = this.props.state;
    // "Email": "string",
    // "Password": "string",
    // "Fullname": "string",
    // "PhoneNumber": "string",
    // "CountryId": 0,
    // "City": "string",
    // "PostalCode": "string",
    // "Address1": "string",
    // "Address2": "string",
    // "BuildingId": 0,
    // "latitude": "string",
    // "Longitude": "string",
    // "TermsAndCondition": true
    if(this.validate()){
      Api.postRequest(
        Routes.customerRegister+"?Email="+email+"&Password="+password+"&Fullname="+fullName+"&PhoneNumber="+phoneNumber + '&CountryId='+countryId+'&City='+selectedCity+"&PostalCode="+ postalOrZip + "&Address1="+ townDistrict + "&Address2="+streetAddress+"&BuildingId=" + buildingId + "&TermsAndCondition="+true,
        {},
        response => {
          let { customer, authorization } = response;
          this.setState({ isLoading: false })
          login(email, password, customer, authorization);
          this.props.navigation.navigate('appOnBoardingStack')
        },
        error => {
          console.log(error)
          login(null, null, null, null);
          this.setState({ isLoading: false })
          this.setState({ isResponseError: true })
        },
      );
    }
  }

  validate() {
    const {
      fullName,
      email,
      password,
      c_password,
      location,
      phoneNumber,
      selectedCity,
      streetAddress,
      townDistrict,
      postalOrZip,
      isAgree
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
    } else if(!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(fullName)){
      this.setState({errorMessage: 'Full name should be valid.'});
      return false;
    }else if (!Helper.validateEmail(email)) {
      this.setState({ errorMessage: 'You have entered an invalid email address.' })
      return false
    } else if (password.length < 6) {
      this.setState({ errorMessage: 'Password must be atleast 6 characters.' })
      return false
    } else if(password !== c_password) {
      this.setState({ errorMessage: 'Password did not match.' })
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
    }else if(isAgree == false) {
      this.setState({ errorMessage: 'Please check agreement.' })
      return false
    }
    return true;
  }

  retrieveAllBuildings = () => {
    Api.getRequest(Routes.allBuildings(), response => {
      console.log('ALL BUILDINGS: ', response)
      this.setState({ isLoading: false, stores: response.buildings })
    }, error => {
      console.log('Error: ', error)
    })
  }

  render() {
    const { isLoading, errorMessage, isResponseError } = this.state;
    const { theme } = this.props.state;
    return (
      <ScrollView style={Style.ScrollView} showsVerticalScrollIndicator={false}>
        <View style={Style.MainContainer}>
          <Header params={"Register"}></Header>
          {
            errorMessage != null && (
              <View style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
                <Text style={[Style.messageText, {
                  fontWeight: 'bold'
                }]}>Oops! </Text>
                <Text style={Style.messageText}>{errorMessage}</Text>
              </View>
            )
          }
          <View style={Style.TextContainer}>
            <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(fullName) => this.setState({ fullName })}
              value={this.state.fullName}
              placeholder={'Full name'}
            />
            <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              placeholder={'Email'}
            />
            <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder={'Password'}
              secureTextEntry={true}
            />
            <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(c_password) => this.setState({ c_password })}
              value={this.state.c_password}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
            />

            <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              value={this.state.phoneNumber}
              placeholder={'Phone number'}
            />
            <LocationWithIcon {...{
              style: Style.textInput,
              selected: this.state.location,
              placeholder: "Select location",
              iconHeight: 20,
              stores: this.state.stores,
              onSelect: (selectedItem) => {
                // this.props.setLocation(selectedItem)
                // this.props.setStoreLocation(selectedItem);
                this.setState({ location: selectedItem.building_name, buildingId: selectedItem.id })
                if(selectedItem.building_name === 'Other') {
                  this.setState({isShowingCity: true})
                }else{
                  this.setState({isShowingCity: false})
                }
              }
            }} />
            { this.state.isShowingCity && 
              <View>
                <TextInput
                  style={Style.textInput}
                  {...Style.textPlaceHolder}
                  onChangeText={(streetAddress) => this.setState({streetAddress: streetAddress })}
                  value={this.state.streetAddress}
                  placeholder={'Street address'}
                />
                <TextInput
                  style={Style.textInput}
                  {...Style.textPlaceHolder}
                  onChangeText={(townDistrict) => this.setState({townDistrict: townDistrict })}
                  value={this.state.townDistrict}
                  placeholder={'Town / District'}
                />
                <View style={Style.textInput}>
                  <Picker
                      selectedValue={this.state.selectedCity}
                      style={[
                        Style.textInput,
                        {
                          color: Color.gray
                        }
                      ]}
                      onValueChange={this.selectCity}
                    >
                      {
                        Helper.locations.map((el, ndx) => {
                          return (
                            <Picker.Item label={el} value={el} key={'city'+ndx} />
                          )
                        })
                      }
                  </Picker>
                </View>
                <TextInput
                  style={Style.textInput}
                  {...Style.textPlaceHolder}
                  onChangeText={(postalOrZip) => this.setState({postalOrZip: postalOrZip })}
                  value={this.state.postalOrZip}
                  placeholder={'Postal / Zip'}
                />
              </View>
            }
            <View style={{
              flex: 1,
              alignItems: "center",
              flexDirection: 'row',
              width: width - 100,
              marginBottom: 20
            }}>
              <CheckBox
                value={this.state.isAgree}
                onValueChange={(val) => {
                  this.setState({isAgree: val})
                }}
                style={{
                  alignSelf: "center",
                  true: '#F15927',
                  false: 'black' 
                }}
                true={Color.gray}
              />
              <Text style={{
                color: Color.gray
              }}>Terms and Condition</Text>
            </View>
            <View style={[Style.bottomTextContainer, { paddingHorizontal: 3 }]}>
              <Text style={[{
                textAlign: 'justify',
                color: Color.gray
              }, Style.fontSize(16)]}>Can't find your location? Our service is expanding soon.
              <Text
                  onPress={() => this.redirect('joinWaitListStack')}
                  style={[BasicStyles.textWhite, Style.fontWeight('700'), Style.fontSize(16)]}>
                  {' '} Get on our waitlist!
              </Text>
              </Text>
            </View>
            <TouchableHighlight
              style={[BasicStyles.btn, Style.btnWhite]}
              onPress={() => this.submit()}
              underlayColor={Color.gray}>
              <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                SIGN UP
              </Text>
            </TouchableHighlight>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30
            }}>
              <Text style={{
                color: Color.gray
              }}>Already have an account?
              <Text
                  onPress={() => this.redirect('appOnBoardingStack')}
                  style={[BasicStyles.textWhite, Style.fontWeight('700'), Style.fontSize(14)]}>
                  {' '} Log in
              </Text>
              </Text>
            </View>
          </View>
        </View>

        {isLoading ? <Spinner mode="overlay" /> : null}
        {isResponseError ? <CustomError visible={isResponseError} onCLose={() => {
          this.setState({ isResponseError: false, isLoading: false })
        }} /> : null}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    // setLocation: location => dispatch(actions.setLocation(location)),
    setStoreLocation: (storeLocation) => dispatch(actions.setStoreLocation(storeLocation)),
    login: (email, password, user, token) => dispatch(actions.login(email, password, user, token)),
    logout: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
