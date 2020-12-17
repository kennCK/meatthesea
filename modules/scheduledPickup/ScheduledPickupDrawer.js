import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles} from 'common';
import {connect} from 'react-redux';
import ScheduledPickup from 'modules/scheduledPickup';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    this.props.navigationProps.pop();
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
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

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const ScheduledPickupStack = createStackNavigator({
  scheduledPickupScreen: {
    screen: ScheduledPickup,
    navigationOptions: ({navigation}) => ({
      title: 'SCHEDULED PICK-UP',
      headerLeft: <HeaderOptions navigationProps={navigation} />,

      headerTintColor: BasicStyles.headerTintColor,
      headerTitleContainerStyle: BasicStyles.headerTitleContainerStyle,
      headerTitleStyle: BasicStyles.headerTitleStyle,
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
)(ScheduledPickupStack);
