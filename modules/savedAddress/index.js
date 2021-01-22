import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Modal, TouchableHighlight, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {Color, BasicStyles, Routes} from 'common';
import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
import Style from './Styles';
import Api from 'services/apiv2/index.js';
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
      value: ''
    };
  }

  onFocusFunction = () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component 
    */
    if(this.state.addingAddress) {
      this.setState({isAddingAddressName: true})
    }
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    const { user } = this.props.state;
    if(user === null){
      return
    }
    this.fetchAddress();
    this.getCurrentLocation();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  fetchAddress = () => {
    const { user } = this.props.state
    Api.getRequest(Routes.customerRetrieveAddresses(user.id), response => {
      const { address } = response
      if (address) {
        console.log('address response: ', address)
        this.setState({address: address})
        address.map((el, ndx) => {
          if(el.default_address) {
            this.setState({selectedTile: ndx})
          }
        });
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

  addAddress = () => {
    const { user } = this.props.state;
    Api.postRequest(Routes.customerAddAddress(user.id, user.first_name + ' ' + user.last_name, null, this.props.state.location.address, this.state.value), {}, response => {
      console.log("Adding address response: ", response);
      this.setState({ isAddingAddressName: false, address: response.address });
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
      console.log("Removing address response: ", response)
    }, error => {
      console.log("Removing address error: ", error)
    })
  }

  redirect = route => {
    this.props.navigation.push(route);
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
    return (
      <View style={styles.SavedAddressContainer}>
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
            animationType="slide"
            transparent={true}
            visible={this.state.isAddingAddressName}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={Style.insideModalCenteredView}>
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
