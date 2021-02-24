import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Image, TouchableHighlight, Text, ScrollView } from 'react-native';
import Style from './Style.js';
import { Spinner } from 'components';
import Api from 'services/apiv2/index.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import CustomError from 'components/Modal/Error.js';
import Header from './Header';
import config from 'src/config';
import LocationWithIcon from './components/LocationInput.js';

class Register extends Component {
  //Screen1 Component
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
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
    Api.getRequest(Routes.storeRetrieveAll,
      response => {
            console.log('stores: ', response)
            this.setState({ isLoading: false })
            this.setState({ stores: response.stores })
        },
        error => {
            this.setState({ isLoading: false })
            alert("Something went wrong")
        })

  }

  redirect = (route) => {
    this.props.navigation.navigate(route);
  }

  submit() {
    const {
      fullName,
      username,
      email,
      password,
      location,
      phoneNumber
    } = this.state;
    const { login } = this.props;
    const { storeLocation } = this.props.state;
    console.log('------------------------- location --- ', storeLocation)
    if(this.validate() == true){
      console.log(true)
        Api.postRequest(
          Routes.customerRegister+"?Email="+email+"&Password="+password+"&Fullname"+fullName+"&PhoneNumber="+phoneNumber+"&StoreId=" + storeLocation.id,
          {},
          response => {
            console.log('Register response: ', response)
            let { customer, authorization } = response;
            this.setState({ isLoading: false })
            login(email, password, customer, authorization);
            this.props.navigation.navigate('homepageStack')
          },
          error => {
            console.log(error)
            login(null, null, null, null);
            this.setState({ isLoading: false })
            this.setState({ isResponseError: true })
          },
        );
    }


    // const { username, email, password } = this.state;
    // if (this.validate() == false) {
    //   return
    // }
    // let parameter = {
    //   username: username,
    //   email: email,
    //   password: password,
    //   config: null,
    //   account_type: 'USER',
    //   referral_code: null,
    //   status: 'ADMIN'
    // }
    // this.setState({ isLoading: true })
    // Api.request(Routes.accountCreate, parameter, response => {
    //   this.setState({ isLoading: false })
    //   if (response.error !== null) {
    //     if (response.error.status === 100) {
    //       let message = response.error.message
    //       if (typeof message.username !== undefined && typeof message.username !== 'undefined') {
    //         this.setState({ errorMessage: message.username[0] })
    //       } else if (typeof message.email !== undefined && typeof message.email !== 'undefined') {
    //         this.setState({ errorMessage: message.email[0] })
    //       }
    //     } else if (response.data !== null) {
    //       if (response.data > 0) {
    //         this.redirect('loginStack')
    //       }
    //     }
    //   }
    // }, error => {
    //   this.setState({ isResponseError: true })
    // })
  }

  validate() {
    const {
      fullName,
      username,
      email,
      password,
      location,
      phoneNumber,
    } = this.state;
    if (username.length >= 6 &&
      fullName != '' &&
      username != '' &&
      location != '' &&
      phoneNumber != '' &&
      email !== '' &&
      password !== '' &&
      password.length >= 6 &&
      Helper.validateEmail(email) === true) {
      return true
    } else if (email !== '' && Helper.validateEmail(email) === false) {
      this.setState({ errorMessage: 'You have entered an invalid email address.' })
      return false
    } else if (password !== '' && password.length < 6) {
      this.setState({ errorMessage: 'Password must be atleast 6 characters.' })
      return false
    } else if (username !== '' && username.length < 6) {
      this.setState({ errorMessage: 'Username must be atleast 6 characters.' })
      return false
    } else if (phoneNumber !== '' && phoneNumber.length < 6) {
      this.setState({ errorMessage: 'Phone number must be atleast 6 characters.' })
      return false
    } else {
      console.log(fullName)
      console.log(username)
      console.log(email)
      console.log(password)
      console.log(location)
      console.log(phoneNumber)
      this.setState({ errorMessage: 'Please fill in all required fields.' })
      return false
    }
  }

  render() {
    const { isLoading, errorMessage, isResponseError } = this.state;
    const { theme } = this.props.state;
    return (
      <ScrollView style={Style.ScrollView}>
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
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              placeholder={'Username'}
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
                this.props.setStoreLocation(selectedItem);
                this.setState({ location: selectedItem.name })
              }
            }} />
            {/* <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(floor) => this.setState({ floor })}
              value={this.state.floor}
              placeholder={'Floor and unit number'}
            /> */}
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
                  onPress={() => this.redirect('loginStack')}
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
