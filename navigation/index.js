
import { createStackNavigator } from 'react-navigation-stack';
import Drawer from './Drawer';
import {
  Login,
  Register,
  ForgotPassword,
  JoinWaitList,
  AppOnBoarding
} from 'modules/accounts'

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
// JpinWaitList stack
const AppOnBoardingStack = createStackNavigator({
  AppOnBoardingScreen: { screen: AppOnBoarding }
}, {
    headerMode: 'none',
    navigationOptions: {
    }
  })


// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  appOnBoardingStack: { screen: AppOnBoardingStack },
  loginStack: { screen: LoginStack },
  forgotPasswordStack: { screen: ForgotPasswordStack },
  registerStack: { screen: RegisterStack },
  joinWaitListStack: { screen: JoinWaitListStack },
  drawerStack: { screen: Drawer },

}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'appOnBoardingStack'
  })

export default PrimaryNav;



