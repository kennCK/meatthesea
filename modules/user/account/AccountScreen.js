import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles, Routes } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from 'modules/orders/components/Separator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Api from 'api';
import { connect } from 'react-redux'
import {
  faUserCircle,
  faShoppingBag,
  faMapMarkerAlt,
  faCog,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import AccountListItem from '../ListItemWithIcon';
class AccountScreen extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    console.log(this.props)
    let route = Routes.customerRetrieveById('1');
    Api.getRequest(route, response => {
      let customer = response.customers[0]
      this.setState({ user: customer })
    }, error => {
      console.warn('api err', error)
    });
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  redirect = route => {
    this.props.navigation.push(route, { user: this.state.user });
  };

  logoutAction = ()=> {
    //clear storage
    this.props.logout();
    this.props.navigation.navigate('loginStack');
  }

  render() {

    const { first_name, last_name, email } = this.state.user;
    const navigations = [
      {
        title: 'Order History',
        icon: faShoppingBag,
        route: 'orderHistoryStack',
      },
      {
        title: 'Profile',
        icon: faUser,
        route: 'profileStack',
      },
      {
        title: 'Payment details',
        icon: faCreditCard,
        route: 'paymentDetailsScreen',
      },
      {
        title: 'Saved addresses',
        icon: faMapMarkerAlt,
        route: 'savedAddressScreen',
      },
      {
        title: 'Settings',
        icon: faCog,
        route: 'settingsScreen',
      },
      {
        title: 'Terms & conditions/Privacy policy',
        icon: faInfoCircle,
        route: 'termsAndConditionScreen',
      },
    ];
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.MainContainer}>
          <FontAwesomeIcon
            icon={faUserCircle}
            size={70}
            style={styles.ListItemIcon}
          />
          <Text
            style={[
              { textTransform: 'uppercase' },
              Style.fontSize(BasicStyles.standardFontSize),
              Style.fontWeight('bold'),
            ]}>
            {`${first_name || ''} ${last_name || ''}`}
          </Text>
          <Text
            style={[
              Style.fontSize(BasicStyles.standardFontSize),
              Style.fontWeight('100'),
              { marginTop: 5 },
            ]}>
            {' '}
            {email}
          </Text>
        </View>
        <Separator />
        {navigations.map(({ title, icon, route }) => (
          <AccountListItem
            {...{
              title,
              icon,
              onPress: () => {
                route && this.redirect(route);
              },
            }}
            key={title}
          />
        ))}
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'flex-end',
            },
            styles.BottomContainer,
          ]}>
          <Separator />
          <View style={{ marginVertical: 10 }} />
          <TouchableHighlight
            onPress={this.logoutAction}
            style={[
              BasicStyles.btn,
              Style.btnPrimary,
              { borderRadius: 0, width: Style.getWidth() - 30 },
            ]}
            underlayColor={Color.gray}>
            <Text
              style={[
                { color: Color.tertiary },
                Style.fontWeight('bold'),
                Style.fontSize(BasicStyles.standardFontSize),
              ]}>
              Logout
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);