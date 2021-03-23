import React, { Component } from 'react';
import { View } from 'react-native';
import { Color, Routes } from 'common';
import { faPhoneAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import ProfileListItem from '../ListItemWithIcon'
import Api from 'services/apiv2/index.js';
import { connect } from 'react-redux';
class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      id: '',
      phone_number: ''
    }
  }
  redirect = (route) => {
    this.props.navigation.push(route);
  }

  retrieveInfo = () => {
    const { user } = this.props.state
    Api.getRequest(Routes.customerRetrieveById(user.id), response => {
      if (response.customers.length > 0) {
        let info = response.customers[0]
        this.setState({
          firstname: info.first_name,
          lastname: info.last_name == null ? '' : info.last_name,
          email: info.email,
          id: info.id,
          phone_number: user.phone_number
        })
      }
    }, error => {
      console.log('ERROR : ', error)
    })
  }

  componentDidMount() {
    this.retrieveInfo()
  }
  render() {
    const { firstname, lastname, email, phone_number } = this.state;
    const navigations = [
      {
        value: `${firstname} ${lastname}`,
        icon: faUser,
      },
      {
        value: email,
        icon: faEnvelope,
      },
      {
        value: phone_number,
        icon: faPhoneAlt,

      },
      {
        value: 'Change Password',
        icon: faLock,
        onPress: () => {
          this.redirect("changePasswordStack")
        }
      },
    ]
    return (
      <View style={{ flex: 1, backgroundColor: Color.white }} >
        {navigations.map(({ value, icon, onPress }, id) => (
          <ProfileListItem {...{
            title: value, icon, onPress
          }} key={id} />
        ))}
      </View>

    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
