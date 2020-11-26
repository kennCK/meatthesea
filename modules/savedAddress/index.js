import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import AddressCard from './AddressCard';
import CustomButton from './CustomButton';
const width = Math.round(Dimensions.get('window').width);

class SavedAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: 0,
      addresses: [],
      location: {},
    };
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    if (params.user) {
      let {addresses} = params.user;
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
    }
    this.getCurrentLocation();
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
  };

  redirect = route => {
    this.props.navigation.push(route);
  };

  render() {
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
            }}
          />
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
  },
});

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setLocation: location => dispatch(actions.setLocation(location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedAddress);
