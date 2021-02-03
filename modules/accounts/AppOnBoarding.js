import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TextInput,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
} from 'react-native';
import Style from './Style.js';
import {Spinner} from 'components';
import Api from 'services/apiv2/index.js';
import {Routes, Color, Helper, BasicStyles} from 'common';
import CustomError from 'components/Modal/Error.js';
import Header from './Header';
import config from 'src/config';
import LocationWithIcon from './components/LocationInput.js';
import { fcmService } from 'services/FCMService';
import { localNotificationService } from 'services/LocalNotificationService';
class AppOnBoarding extends Component {
  //Screen1 Component
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      error: 0,
      errorMessage: null,
      isResponseError: false,
      location: '',
      stores: [],
      email: null,
      password: null,
      locationId: null
    };
  }

  getLocations() {}

  componentDidMount() {
    this.setState({isLoading: true});
    this.getData();
    Api.getRequest(
      Routes.storeRetrieveAll,
      (response) => {
        this.setState({isLoading: false});
        this.setState({stores: response.stores});
        this.props.setStores(response.stores);
        if(this.state.locationId != null){
          let selectedItem = response.stores.map((item) => {
            if(parseInt(item.id) == this.state.locationId){
              return item
            }
          })
          this.props.setStoreLocation(selectedItem)
        }
      },
      (error) => {
        this.setState({isLoading: false});
        alert('Something went wrong');
      },
    );
    this.firebaseNotification()
  }

  firebaseNotification(){
    localNotificationService.createChannel()
    fcmService.registerAppWithFCM()
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
    localNotificationService.configure(this.onOpenNotification)
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unRegister()
    }
  }

  onRegister = (token) => {
    console.log("[App] onRegister", token)
  }

  onNotification = (notify) => {
    console.log("[App] onNotification", notify)
    const options = {
      soundName: 'default',
      playSound: true
    }

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
      "test"
    )
  }

  onOpenNotification = (notify) => {
    console.log("[App] onOpenNotification", notify )
  }

  getData = async () => {
    try {
      const token = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      const token_expiration = await AsyncStorage.getItem(Helper.APP_NAME + 'token_expiration');
      const email = await AsyncStorage.getItem(Helper.APP_NAME + 'email');
      const password = await AsyncStorage.getItem(Helper.APP_NAME + 'password');
      const locationId = await AsyncStorage.getItem(Helper.APP_NAME + 'location');
      if (token != null) {
        this.setState({ email, password, locationId});
        setTimeout(() => {
            this.directLogin()
        }, 1000)
      }
    } catch (e) {
      // error reading value
    }
  }

  redirect = (route) => {
    this.props.navigation.navigate(route);
  };

  submit(){
    // const { location } = this.state;
    const { login } = this.props;
    if (this.validate() == false) {
      return;
    }
    login(null, null, null, null)
    this.redirect("homepageStack")
  }

  directLogin() {
    // const { location } = this.state;
    if (this.validate() == false) {
      return;
    }
    const { email, password } = this.state;
    const { login } = this.props;
    if ((email != null && email != '') && (password != null && password != '')) {
      this.setState({ isLoading: true, error: 0 });
      Api.getRequest(Routes.customerLogin + `?Email=${email}&Password=${password}`, response => {
        let { customer, authorization } = response;
        this.setState({ isLoading: false})
        login(email, password, customer, authorization);
        this.redirect("homepageStack")
      }, error => {
        this.setState({ isLoading: false, error: 2 })
        login(null, null, null, null)
      });
    } else {
      this.setState({ error: 1 });
      login(null, null, null, null)
    }
  }

  validate() {
    const {locationId, location} = this.state;
    if (!locationId && !location) {
      this.setState({errorMessage: 'Please select your location.'});
      return false;
    }
  }

  render() {
    const {isLoading, errorMessage, isResponseError} = this.state;

    return (
      <ScrollView style={Style.ScrollView}>
        {isLoading ? <Spinner mode="overlay" /> : null}

        <View style={Style.MainContainer}>
          <Header params={'AppOnBoarding'} lg></Header>
          {errorMessage != null && (
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Text
                style={[
                  Style.messageText,
                  {
                    fontWeight: 'bold',
                  },
                ]}>
                Oops!{' '}
              </Text>
              <Text style={Style.messageText}>{errorMessage}</Text>
            </View>
          )}

          <View
            style={[
              Style.TextContainer,
              {marginTop: errorMessage != null ? 20 : 50},
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.gray,
                }}>
                Deliver to:
              </Text>
            </View>
            <LocationWithIcon
              {...{
                style: {height: 50, marginTop: 15},
                selected: this.state.location,
                placeholder: 'Current location',
                iconHeight: 20,
                stores: this.state.stores,
                onSelect: (selectedItem) => {
                  this.props.setStoreLocation(selectedItem);
                  this.setState({location: selectedItem.name});
                },
              }}
            />
            <TouchableHighlight
              style={[BasicStyles.btn, Style.btnWhite]}
              onPress={() => this.submit()}
              underlayColor={Color.gray}>
              <Text
                style={[
                  Style.textPrimary,
                  Style.fontWeight('bold'),
                  Style.fontSize(18),
                ]}>
                BROWSE AS GUEST
              </Text>
            </TouchableHighlight>

            <View style={{marginTop: 70}}>
              <TouchableHighlight
                style={[BasicStyles.btn, Style.btnWhite]}
                onPress={() => this.redirect('loginStack')}
                underlayColor={Color.gray}>
                <Text
                  style={[
                    Style.textPrimary,
                    Style.fontWeight('bold'),
                    Style.fontSize(18),
                  ]}>
                  LOGIN
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[Style.btnWhite, BasicStyles.btnSm]}
                onPress={() => this.redirect('registerStack')}
                underlayColor={Color.gray}>
                <Text
                  style={[
                    Style.textPrimary,
                    Style.fontWeight('bold'),
                    Style.fontSize(18),
                  ]}>
                  SIGNUP
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        {isResponseError ? (
          <CustomError
            visible={isResponseError}
            onCLose={() => {
              this.setState({isResponseError: false, isLoading: false});
            }}
          />
        ) : null}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({state: state});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setStoreLocation: (storeLocation) => dispatch(actions.setStoreLocation(storeLocation)),
    setStores: (stores) => dispatch(actions.setStores(stores)),
    logout: () => dispatch(actions.logout()),
    login: (email, password, user, token) => dispatch(actions.login(email, password, user, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOnBoarding);
