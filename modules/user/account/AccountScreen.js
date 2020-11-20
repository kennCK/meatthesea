import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles, Routes } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from 'modules/orders/components/Separator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Api from 'api';
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
    this.props.navigation.navigate(route, { user: this.state.user });
  };
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
              Style.fontSize(20),
              Style.fontWeight('bold'),
            ]}>
            {`${first_name || ''} ${last_name || ''}`}
          </Text>
          <Text
            style={[
              Style.fontSize(16),
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
                Style.fontSize(18),
              ]}>
              Logout
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default AccountScreen;
