import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Image, TouchableHighlight, Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Style from './Style.js';
import { Spinner } from 'components';
import PasswordWithIcon from './components/Password.js';
import CustomError from 'components/Modal/Error.js';
import Api from 'services/apiv2/index.js';
import CommonRequest from 'services/CommonRequest.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import Header from './Header';
import config from 'src/config';
import Pusher from 'services/Pusher.js';
import SystemVersion from 'services/System.js';
import { Player } from '@react-native-community/audio-toolkit';
import OtpModal from 'components/Modal/Otp.js';
import { Notifications, NotificationAction, NotificationCategory } from 'react-native-notifications';
class Login extends Component {
  //Screen1 Component
  constructor(props) {
    super(props);
    this.state = {
      email: "elia.virtucio@gukodigital.com",
      password: null,
      isLoading: false,
      token: null,
      error: 0,
      isResponseError: false,
      notifications: []
    };
  }

  async componentDidMount() {
    // console.log(this.props.state.token)
    // await this.getData()
  }

  test = () => {
    if (config.TEST == true) {
      this.props.navigation.navigate('homepageStack');
      return true;
    }
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

  redirect = (route) => {
    this.props.navigation.navigate(route);
  }
  submit() {
    // this.test();
    const { email, password } = this.state;
    console.log(email)
    const { login } = this.props;
    if ((email != null && email != '') && (password != null && password != '')) {
      this.setState({ isLoading: true, error: 0 });
      Api.getRequest(Routes.customerLogin + `?Email=${email}&Password=${password}`, response => {
        let { customer, authorization } = response;
        this.setState({ isLoading: false, token: authorization.access_token })
        login(customer, authorization);
        this.getData()
        return this.redirect("homepageStack")
      }, error => {
        this.setState({ isLoading: false, error: 2 })
      });
    } else {
      this.setState({ error: 1 });
    }
  }

  render() {
    const { isLoading, error, isResponseError } = this.state;
    return (
      <ScrollView contentContainerStyle={Style.container} style={Style.ScrollView}>
        <View style={Style.MainContainer}>
          <Header params={"Login"}></Header>
          {error > 0 ? <View style={Style.messageContainer}>
            {error == 1 ? (
              <Text style={Style.messageText}>Please fill up the required fields.</Text>
            ) : null}

            {error == 2 ? (
              <Text style={Style.messageText}>Email and password didn't match.</Text>
            ) : null}
          </View> : null}

          <View style={Style.TextContainer}>
            <TextInput
              {...Style.textPlaceHolder}
              style={[Style.textInput, BasicStyles.textWhite]}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              placeholder={'Email'}
            />

            <PasswordWithIcon {...Style.textPlaceHolder} placeholder={'Password'} style={[Style.textInput, BasicStyles.textWhite, { marginTop: 10 }]} value={this.state.password} onTyping={(input) => this.setState({
              password: input
            })} />

            <TouchableHighlight
              style={[BasicStyles.btn, Style.btnWhite, { marginTop: 15 }]}
              onPress={() => this.submit()}
              underlayColor={Color.gray}>
              <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                SIGN IN
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={Style.colRight}
              onPress={() => this.redirect('forgotPasswordStack')}
              underlayColor={Color.gray}>
              <Text style={[BasicStyles.textWhite, Style.fontWeight('700'), Style.fontSize(14)]}>
                Forgotten password
              </Text>
            </TouchableHighlight>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 70,
              marginBottom: 30

            }}>
              <Text style={{
                paddingTop: 10,
                color: Color.gray
              }}>Haven't registered yet?
              <Text
                  onPress={() => this.redirect('registerStack')}
                  style={[BasicStyles.textWhite, Style.fontWeight('700'), Style.fontSize(14)]}>
                  {' '} Sign up now
              </Text>
              </Text>
            </View>
          </View>
        </View>

        {isLoading ? <Spinner mode="overlay" /> : null}
        {
          isResponseError ? <CustomError visible={isResponseError} onCLose={() => {
            this.setState({ isResponseError: false, isLoading: false })
          }} /> : null
        }
      </ScrollView >

    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
