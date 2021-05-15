import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TextInput,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking
} from 'react-native';
import Style from './Style.js';
import { Spinner } from 'components';
import Api from 'services/apiv2/index.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import CustomError from 'components/Modal/Error.js';
import Header from './Header';
import config from 'src/config';
import LocationWithIcon from './components/LocationInput.js';
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

  onFocusFunction = async () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component 
    */
   this.setState({location: ''})
    Linking.getInitialURL().then(url => {
      console.log(`from initial url ${url}, call navigate`)
      this.navigate(url);
    });
    Linking.addEventListener('url', this.handleOpenURL);

    await this.getData();
    await this.retrieveAllBuildings();
    // await Api.getRequest(
    //   Routes.storeRetrieveAll,
    //   (response) => {
    //     this.setState({ isLoading: false });
    //     this.setState({ stores: response.stores });
    //     this.props.setStores(response.stores);
    //     if (this.state.locationId != null) {
    //       let selectedItem = response.stores.map((item) => {
    //         if (parseInt(item.id) == this.state.locationId) {
    //           return item
    //         }
    //       })
    //       this.props.setStoreLocation(selectedItem)
    //     }
    //   },
    //   (error) => {
    //     this.setState({ isLoading: false });
    //     alert('Something went wrong');
    //   },
    // );
  }

  retrieveAllBuildings = () => {
    this.setState({ isLoading: true });
    Api.getRequest(Routes.allBuildings(), response => {
      this.setState({ isLoading: false, stores: response.buildings })
    }, error => {
      console.log('Error: ', error)
    })
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount () {
    /**
     * removing the event listener added in the componentDidMount()
     */
    this.focusListener.remove()
  }

  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }
  navigate = (url) => { // E
    const { navigate } = this.props.navigation;
    if(url !== null){
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[0];
      console.log(routeName)
      if (routeName === 'mts.meatthesea.com' && route.split('/')[2] === 'paypalSuccess') {
        navigate('orderPlacedStack')
      };
    }
  }

  getData = async () => {
    try {
      const token = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      const token_expiration = await AsyncStorage.getItem(Helper.APP_NAME + 'token_expiration');
      const email = await AsyncStorage.getItem(Helper.APP_NAME + 'email');
      const password = await AsyncStorage.getItem(Helper.APP_NAME + 'password');
      const locationId = await AsyncStorage.getItem(Helper.APP_NAME + 'location');
      if (token != null) {
        this.setState({ email, password, locationId });
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

  submit() {
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
    // if (this.state.location == '') {
    //   return;
    // }
    const { email, password } = this.state;
    const { login } = this.props;
    if ((email != null && email != '') && (password != null && password != '')) {
      this.setState({ isLoading: true, error: 0 });
      Api.getRequest(Routes.customerLogin + `?Email=${email}&Password=${password}`, response => {
        let { customer, authorization } = response;
        this.setState({ isLoading: false })
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
    /**
     * validation on browse-as-guest is removed
     */
    return true
    // const { locationId, location } = this.state;
    // if (!locationId && !location) {
    //   this.setState({ errorMessage: 'Please select your location.' });
    //   return false;
    // }
  }

  retrieveNearestStore() {
    const {location} = this.props.state;
    const {setIsLocationRetrieve} = this.props;
    setIsLocationRetrieve(false);
    Api.getRequest(Routes.nearestStore(location.latitude, location.longitude), response => {
      console.log('NEAREST STORE: ', response)
      console.log('LOCATION: ', this.props.state.location)
      if(response.stores.length > 0) {
        this.props.setStoreLocation(response.stores[0]);
        this.setState({ location: response.stores[0].name });
      }else{
        this.setState({ errorMessage: 'There is no nearest store available.' });
      }
    }, error => {
      console.log('RETRIEVING NEAREST STORE ERROR: ', error);
    })
    
    return null
  }

  componentDidUpdate() {
    const { isLocationRetrieve, location } = this.props.state
    if(isLocationRetrieve && location !== null) {
      this.retrieveNearestStore()
    }
  }

  render() {
    const { isLoading, errorMessage, isResponseError } = this.state;
    const { isLocationRetrieve } = this.props.state
    return (
      <ScrollView style={Style.ScrollView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {isLoading ? <Spinner mode="overlay" /> : null}
          <Header params={'AppOnBoarding'} lg></Header>
          <View style={Style.MainContainer}>
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
              { marginTop: errorMessage != null ? 20 : 50 },
            ]}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.gray,
                  marginBottom: 20
                }}>
                Deliver To:
              </Text>
            </View>
            {/* <LocationWithIcon
              {...{
                style: { height: 50, marginTop: 15 },
                selected: this.state.location,
                placeholder: 'Current location',
                iconHeight: 20,
                stores: this.state.stores,
                disabled: false,
                onSelect: (selectedItem) => {
                  this.props.setStoreLocation(selectedItem);
                  this.setState({ location: selectedItem.name });
                },
              }}
            /> */}
            <LocationWithIcon {...{
              style: Style.textInput,
              selected: this.state.location,
              placeholder: "Select location",
              iconHeight: 20,
              stores: this.state.stores.filter(el => {
                return el.building_name !== 'Other'
              }),
              onSelect: (selectedItem) => {
                // this.props.setLocation(selectedItem)
                // this.props.setStoreLocation(selectedItem);
                this.setState({location: selectedItem.building_name})
                this.props.setUserLocation(selectedItem)
                console.log('SELECTED ITEM: ', selectedItem)
              }
            }} />
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.gray,
                }}>
                Current Location
              </Text>
            </View>
            <View style={[
              BasicStyles.btn,
              Style.textInput,
              {
                borderWidth: 1,
                borderColor: Color.gray,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                height: 50,
                marginTop: 15
              },
            ]}>
              { this.props.state.location === null &&
                <Text style={{color: Color.gray}}>Current Location...</Text>
              }
              { this.props.state.location !== null && this.props.state.location !== undefined &&
                <Text style={{color: Color.gray}}>{this.props.state.location.address.substring(0, 40)}...</Text>
              }
            </View> */}
            <TouchableHighlight
              style={[
                BasicStyles.btn, 
                Style.btnWhite, 
                {
                  marginTop: 5
                }
              ]}
              onPress={() => this.submit()}
              underlayColor={Color.gray}>
              <Text
                style={[
                  Style.textPrimary,
                  Style.fontWeight('bold'),
                  Style.fontSize(18)
                ]}>
                BROWSE AS GUEST
              </Text>
            </TouchableHighlight>

            <Text style={{
              color: Color.white,
              marginTop: 20,
              marginBottom: 45
            }}>OR</Text>

            <View>
              <TouchableHighlight
                style={[BasicStyles.btn, Style.btnWhite]}
                onPress={() => {
                  this.redirect('loginStack')
                  // if(this.state.location !== '') {
                  //   this.redirect('loginStack')
                  // }else {
                  //   this.setState({errorMessage: 'Choose your location'})
                  // }
                }}
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
              this.setState({ isResponseError: false, isLoading: false });
            }}
          />
        ) : null}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux');
  return {
    setStoreLocation: (storeLocation) => dispatch(actions.setStoreLocation(storeLocation)),
    setStores: (stores) => dispatch(actions.setStores(stores)),
    logout: () => dispatch(actions.logout()),
    login: (email, password, user, token) => dispatch(actions.login(email, password, user, token)),
    setIsLocationRetrieve: (isLocationRetrieve) => dispatch(actions.setIsLocationRetrieve(isLocationRetrieve)),
    setUserLocation: location => dispatch(actions.setUserLocation(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppOnBoarding);
