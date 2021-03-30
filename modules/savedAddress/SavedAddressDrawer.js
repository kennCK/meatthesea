import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import {connect} from 'react-redux';
import SavedAddress from 'modules/savedAddress';

class HeaderOptions extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    const {setLocation} = this.props;
    // setLocation(null);
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
    setLocation: location => dispatch(actions.setLocation(location)),
  };
};

let HeaderOptionsConnect = connect(mapStateToProps, mapDispatchToProps)(HeaderOptions);

const SavedAddressStack = createStackNavigator({
  savedAddressScreen: {
    screen: SavedAddress,
    navigationOptions: ({navigation}) => ({
      title: 'SAVED ADDRESSES',
      headerLeft: <HeaderOptionsConnect navigationProps={navigation} />,

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
)(SavedAddressStack);
