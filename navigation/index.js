import { createStackNavigator } from 'react-navigation-stack';
// import {
//   Login,
//   AppOnBoarding,
//   Register,
//   ForgotPassword,
//   JoinWaitList
// } from 'modules/accounts';
import Login from 'modules/accounts/Login';
import ForgotPassword from 'modules/accounts/ForgotPassword';
import JoinWaitList from 'modules/accounts/JoinWaitList';
import Register from 'modules/accounts/Register';
import AppOnBoarding from 'modules/accounts/AppOnBoarding';
import Drawer from './Drawer';
import ReturnInPersonStack from 'modules/returnInPerson/ReturnInPersonDrawer';
import PickupCrockeryStack from 'modules/pickupCrockery/PickupCrockeryDrawer';
// login stack
const LoginStack = createStackNavigator(
  {
    loginScreen: { screen: Login },
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Forgot Password stack
const ForgotPasswordStack = createStackNavigator(
  {
    forgotPasswordScreen: { screen: ForgotPassword },
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Register stack
const RegisterStack = createStackNavigator(
  {
    registerScreen: { screen: Register },
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// JpinWaitList stack
const JoinWaitListStack = createStackNavigator(
  {
    JoinWaitListScreen: { screen: JoinWaitList },
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);
const AppOnBoardingStack = createStackNavigator(
  {
    AppOnBoardingScreen: { screen: AppOnBoarding },
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    loginStack: { screen: LoginStack },
    forgotPasswordStack: { screen: ForgotPasswordStack },
    registerStack: { screen: RegisterStack },
    joinWaitListStack: { screen: JoinWaitListStack },
    appOnBoardingStack: { screen: AppOnBoardingStack },
    returnInPersonStack: { screen: ReturnInPersonStack },
    pickupCrockeryStack: { screen: PickupCrockeryStack },
    drawerStack: { screen: Drawer },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'appOnBoardingStack',
  },
);

export default PrimaryNav;
