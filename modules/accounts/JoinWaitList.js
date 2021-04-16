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
class JoinWaitList extends Component {
  //Screen1 Component
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      phoneNumber: '',
      isLoading: false,
      token: null,
      error: 0,
      errorMessage: null,
      isResponseError: false
    };
  }

  componentDidMount() {
  }

  redirect = (route) => {
    this.props.navigation.navigate(route);
  }

  submit() {
    const { fullname, email, phoneNumber } = this.state;
    if (this.validate() == false) {
      return
    }
    // this.setState({ isLoading: true })
    // Api.postRequest(Routes.waitListAdd(fullname, email, phoneNumber), {}, response => {
    //   this.setState({ isLoading: false })
    //   if (response.toLowerCase().replace(/ /g, '') === 'waitlistaddedsuccessfully') {
    //     this.redirect('appOnBoardingStack')
    //   }
    // }, error => {
    //   this.setState({ isResponseError: true })
    // })
  }

  validate() {
    const { fullname, email, phoneNumber } = this.state;
    if (
      (email == '' || email == null)&&
      (fullname == '' || fullname == null)&&
      phoneNumber  == '' || phoneNumber == null &&
      !Helper.validateEmail(email)) {
      this.setState({ errorMessage: 'Please fill in all required fields.' })
      return false
    } else if (email != '' && Helper.validateEmail(email) == false) {
      this.setState({ errorMessage: 'You have entered an invalid email address.' })
      return false
    } else if (!/^[0-9]{7,11}$/.test(phoneNumber)) {
      this.setState({ errorMessage: 'Invalid phone number.' })
      return false
    } else {
      return true
    }
  }
  render() {
    const { isLoading, errorMessage, isResponseError } = this.state;
    const { theme } = this.props.state;
    return (
      <ScrollView style={Style.ScrollView}>
        <View style={Style.MainContainer}>
          <Header params={"JoinWaitList"} ></Header>
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
          <View style={[Style.TextContainer]}>
            <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(fullname) => this.setState({ fullname })}
              value={this.state.fullname}
              placeholder={'Fullname'}
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
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              value={this.state.phoneNumber}
              placeholder={'Phone number'}
            />
            {/* <TextInput
              style={Style.textInput}
              {...Style.textPlaceHolder}
              onChangeText={(location) => this.setState({ location })}
              value={this.state.location}
              placeholder={'Find my location'}
            /> */}
            <TouchableHighlight
              style={[BasicStyles.btn, Style.btnWhite, { marginTop: 20 }]}
              onPress={() => this.submit()}
              underlayColor={Color.gray}>
              <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                JOIN WAITLIST
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
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinWaitList);