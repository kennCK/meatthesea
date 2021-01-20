import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Modal, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
import Style from './Styles';
const width = Math.round(Dimensions.get('window').width);

class SavedAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: 0,
      addresses: [],
      location: {},
      addingAddress: false,
      isAddingAddressName: false
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
    let {addresses} = user;
    if (addresses) {
      addresses.map(address => {
        this.setState({
          addresses: [
            ...this.state.addresses,
            {
              addressType: address.company,
              address: address.address1 ? address.address1 : address.address2,
            },
          ],
        });
      });
    }
    this.getCurrentLocation();
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
    const{ setUserLocation } = this.props.state;
    setUserLocation(this.state.addresses[index])
  };

  redirect = route => {
    this.props.navigation.push(route);
  };

  render() {
    const { location } = this.props.state
    return (
      <View style={styles.SavedAddressContainer}>
        <View>
          {this.state.addresses.map((data, index) => {
            return (
              <AddressCard
                key={index}
                id={index}
                selectedTile={index === this.state.selectedTile ? true : false}
                addressType={data.addressType}
                address={data.address}
                onSelect={this.selectHandler}
              />
            );
          })}
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
            <View style={Style.centeredView}>
              <View style={Style.modalView}>
                <Text style={[{fontWeight: 'bold', textAlign: 'left'}, Style.modalText]}> Address: </Text>
                <Text style={Style.modalText}>{ location.address }</Text>

                {/* <TouchableHighlight
                  style={{ ...Style.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setState({ isAddingAddressName: false });
                  }}
                >
                  <Text style={Style.textStyle}>Hide Modal</Text>
                </TouchableHighlight> */}
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
