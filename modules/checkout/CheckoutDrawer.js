import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import {connect} from 'react-redux';
import Checkout from 'modules/checkout';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    return (
      <View style={{flexDirection: 'row', marginLeft: '2%'}}>
        <TouchableOpacity onPress={this.back.bind(this)}>
          {/*Donute Button Image */}
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={BasicStyles.iconSize}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

class CustomHeader extends Component {
  render() {
    return (
      <View
        style={{
          height: 70,
          width: '100%',
          elevation: 1,
          borderBottomWidth: 0.25,
          borderBottomColor: '#F5F5F5',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <HeaderOptions navigationProps={this.props.navigationProps} />
        {/*Replace dummy data here*/}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '19%',
          }}>
          <Text
            style={{
              fontSize: BasicStyles.titleText.fontSize,
              fontWeight: 'bold',
            }}>
            Your Cart
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: BasicStyles.standardFontSize,
              color: Color.primary,
            }}>
            Dulce Village, Tabok, Mandaue City, Block 7 Lot 42
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const CheckoutStack = createStackNavigator({
  CheckoutScreen: {
    screen: Checkout,
    navigationOptions: ({navigation}) => ({
      title: 'Your Cart',
      headerLeft: <HeaderOptions navigationProps={navigation} />,
      header: <CustomHeader navigationProps={navigation} />,
    }),
  },
});

const styles = StyleSheet.create({
  iconStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutStack);
