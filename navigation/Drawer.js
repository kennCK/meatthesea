import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Slider from 'modules/slider';
import { Color, BasicStyles } from 'common';
import Dashboard from 'modules/basics/Welcome.js';


class MenuDrawerContentStructure extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginState: true
    };
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    const { theme } = this.props.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.state.loginState === true && 
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}
            <FontAwesomeIcon icon={ faBars } size={BasicStyles.iconSize} style={[BasicStyles.iconStyle, {
              color: theme ? theme.primary : Color.primary
            }]}/>
          </TouchableOpacity>
        }
        
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setActiveRoute: (route) => dispatch(actions.setActiveRoute(route))
  };
};

let MenuDrawerStructure = connect(mapStateToProps, mapDispatchToProps)(MenuDrawerContentStructure);

const StackNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboard',
      headerLeft: <MenuDrawerStructure navigationProps={navigation} />,
      headerRight: <OptionRight navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: Color.white,
      },
      headerTintColor: Color.primary,
    }),
  }
});

const Drawer = createDrawerNavigator({
  Dashboard: {
    screen: StackNavigator,
    navigationOptions: {
      drawerLabel: 'Dashboard',
    },
  }
}, {
  contentComponent: Slider
});

export default Drawer;