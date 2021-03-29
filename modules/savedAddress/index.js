import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Modal, TouchableHighlight, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {Color, BasicStyles, Routes} from 'common';
import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
import Style from './Styles';
import Api from 'services/apiv2/index.js';
import {Spinner} from 'components';
const width = Math.round(Dimensions.get('window').width);

class SavedAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: null,
      address: [],
      location: {},
      addingAddress: false,
      isAddingAddressName: false,
      value: '',
      postalCode: '',
      countries: [],
      isLoading: false
    };
  }

   onFocusFunction = () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component 
    */
    if(this.state.addingAddress && this.props.state.location !== null) {
      this.setState({postalCode: this.props.state.location.postal})
      this.setState({isAddingAddressName: true})
    }
    this.retrieveCountries();
    this.fetchAddress();
    // this.getCurrentLocation();
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    const { user } = this.props.state;
    console.log(user)
    if(user === null){
      return
    }
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    })
  }

  retrieveCountries = () => {
    Api.getRequest(Routes.getCountries, response => {
      this.setState({countries: response.countries})
    }, error => {
      console.log('RETRIEVE COUNTRIES ERROR: ', error)
    })
  }

  fetchAddress = () => {
    const { user } = this.props.state
    this.setState({isLoading: true});
    Api.getRequest(Routes.customerRetrieveAddresses(user.id), response => {
      this.setState({isLoading: false});
      const { address } = response
      if (address) {
        // console.log('address response: ', address)
        this.setState({address: address})
        // address.map((el, ndx) => {
        //   if(el.default_address) {
        //     this.setState({selectedTile: ndx})
        //   }
        // });
      }
    }, error => {
      console.log('Retrieve addresses error: ', error);
    });
  }

  componentWillUnmount () {
    /**
     * removing the event listener added in the componentDidMount()
     */
    this.focusListener.remove()
  }

  addAddress = async () => {
    const { user, location } = await this.props.state;
    const { countries } = await this.state
    let temp = location.address.replace(/ /g, '');
    
    let countryObject = countries.find(el => {
      return el.country_name.toLowerCase() === location.country.toLowerCase()
    })

    Api.postRequest(
      Routes.customerAddAddress(
        user.id, user.first_name + ' ' + user.last_name, 
        null, 
        location.address, 
        this.state.value, 
        location.latitude, 
        location.longtitude, 
        location.locality, 
        this.state.postalCode, 
        countryObject !== null && countryObject !== undefined ? countryObject.id : 131
      ),
      {}, response => {
        console.log("Adding address response: ", response);
        this.setState({ isAddingAddressName: false, address: response.address, value: '', postalCode: '', addingAddress: false });
        const {setLocation} = this.props
        setTimeout(() => {
          setLocation(null)
        }, 2000)
        // this.fetchAddress()
      }, error => {
        console.log("Adding address error: ", error);
      });
  }

  getCurrentLocation = () => {
    const {setLocation} = this.props;
    if (this.props.state.location === null) {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          //getting the Longitude from the location json
          const currentLongitude = JSON.stringify(position.coords.longitude);

          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          const currentLocation = {
            longitude: currentLongitude,
            latitude: currentLatitude,
          };
          setLocation(currentLocation);
        },
        error => alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    }
  };

  selectHandler = index => {
    this.setState({selectedTile: index});
    const{ setUserLocation } = this.props;
    setUserLocation(this.state.address[index])
    Api.postRequest(
      Routes.customerRetrieveDefaultAddress(this.props.state.user.id, this.state.address[index].id),
      {},
      response => {},
      error => {
        console.log('Default address error: ', error)
      }
    )
  };

  removeAddress = index => {
    const { user } = this.props.state;
    let array = [...this.state.address]
    Api.deleteRequest(Routes.customerRemoveAddress(user.id, this.state.address[index].id), {}, response => {
      // this.fetchAddress();
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({address: array, selectedTile: null});
      }
      // console.log("Removing address response: ", response)
    }, error => {
      console.log("Removing address error: ", error)
    })
  }

  redirect = route => {
    this.props.navigation.push(route, {
      data: {
        latitude: "10.3520921",
        longitude: "123.9133624",
      }
    });
  };

  render() {
    const { location } = this.props.state
    const products = [
      {
        id: 1,
        text: 'Home'
      },
      {
        id: 2,
        text: 'Office'
      }
    ];
    const {value, postalCode, isLoading} = this.state
    return (
      <View style={styles.SavedAddressContainer}>
        {isLoading ? <Spinner mode="overlay"/> : null }
        <View
          style={{
            height: '100%',
            paddingBottom: 72
          }}
        >
          <ScrollView>
            {this.state.address.map((data, index) => {
              return (
                <AddressCard
                  key={index}
                  id={index}
                  selectedTile={index === this.state.selectedTile ? true : false}
                  addressType={data.address_name}
                  address={(data.address1 === '' || data.address1 === null) ? data.address2 : data.address1}
                  onSelect={this.selectHandler}
                  toDeleteItem={this.removeAddress}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.ButtonContainer}>
          <CustomButton
            buttonColor="#0064B1"
            buttonText="+ ADD ADDRESS"
            onPress={() => {
              this.redirect('locationWithMapStack');
              this.setState({addingAddress: true})
            }}
          />
        </View>
        <View style={Style.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isAddingAddressName}
          >
            <View style={Style.insideModalCenteredView}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={Color.lightGray}
                style={{
                  borderWidth: 1,
                  paddingTop: 0,
                  borderColor: Color.lightGray,
                  borderRadius: 20,
                  position: 'absolute',
                  top: 20,
                  right: 10
                }}
                onPress={() => {
                  this.setState({isAddingAddressName: false, addingAddress: false});
                  const {setLocation} = this.props;
                  setLocation(null);
                }}
              >
                <Text
                  style={[
                    {
                      color: Color.white,
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
              <View style={Style.modalView}>
                <Text style={
                  [
                    Style.modalText,
                    {
                      fontWeight: 'bold',
                      marginTop: 0
                    }
                  ]
                }>Address Name: </Text> 
                <View style={{marginTop: 5, marginBottom: 5}}>
                  <TextInput
                    style={
                      [
                        {
                          height: 40,
                          borderColor: 'gray',
                          borderWidth: 1
                        },
                        Style.textInput
                      ]
                    }
                    onChangeText={value => this.setState({value})}
                    value={this.state.value}
                  />
                </View>
                <Text style={
                  [
                    Style.modalText,
                    {
                      fontWeight: 'bold',
                      marginTop: 0
                    }
                  ]
                }>Postal Code: </Text> 
                <View style={{marginTop: 5, marginBottom: 5}}>
                  <TextInput
                    style={
                      [
                        {
                          height: 40,
                          borderColor: 'gray',
                          borderWidth: 1
                        },
                        Style.textInput
                      ]
                    }
                    onChangeText={postalCode => this.setState({postalCode})}
                    value={postalCode}
                  />
                </View>
                <Text style={
                  [
                    {
                      fontWeight: 'bold',
                      textAlign: 'left'
                    },
                    Style.modalText
                  ]
                }> Address: </Text>
                <Text style={
                  [
                    Style.modalText,
                    {
                      color: Color.darkGray
                    }
                  ]
                }>{ location != null ? location.address : '' }</Text>
                <View 
                  style={
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }
                >
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={Color.lightGray}
                    disabled={value === '' || postalCode === ''}
                    // style={{ 
                    //   ...Style.openButton, backgroundColor: Color.primaryDark }}
                    style={
                      [
                        BasicStyles.btn,
                        Style.btnWhite,
                        {
                          marginTop: 20
                        }
                      ]
                    }
                    onPress={() => {
                      this.addAddress()
                    }}
                  >
                    <Text style={Style.textStyle}>Add</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SavedAddressContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  ButtonContainer: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: '3%',
    width: width,
    borderTopWidth: 1,
    borderColor: '#F3F3F3',
    paddingTop: '3%',
  }
});


const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setLocation: location => dispatch(actions.setLocation(location)),
    setUserLocation: location => dispatch(actions.setUserLocation(location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedAddress);
