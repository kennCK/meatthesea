
import { createStackNavigator } from 'react-navigation-stack';
import Login from 'modules/accounts/Login';
import ForgotPassword from 'modules/accounts/ForgotPassword';
import JoinWaitList from 'modules/accounts/JoinWaitList';
import Register from 'modules/accounts/Register';
import Drawer from './Drawer';
import { createAppContainer } from 'react-navigation';

// login stack
const LoginStack = createStackNavigator({
  loginScreen: { screen: Login }
}, {
    headerMode: 'none',
    navigationOptions: {
    }
  })

// Forgot Password stack
const ForgotPasswordStack = createStackNavigator({
  forgotPasswordScreen: { screen: ForgotPassword }
}, {
    headerMode: 'none',
    navigationOptions: {
    }
  })

// Register stack
const RegisterStack = createStackNavigator({
  registerScreen: { screen: Register }
}, {
    headerMode: 'none',
    navigationOptions: {
    }
  })

// JpinWaitList stack
const JoinWaitListStack = createStackNavigator({
  JoinWaitListScreen: { screen: JoinWaitList }
}, {
    headerMode: 'none',
    navigationOptions: {
    }
  })



// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  forgotPasswordStack: { screen: ForgotPasswordStack },
  registerStack: { screen: RegisterStack },
  joinWaitListStack: { screen: JoinWaitListStack },
  drawerStack: { screen: Drawer },

}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
  })

export default PrimaryNav;



