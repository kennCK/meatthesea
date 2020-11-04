import {createStackNavigator} from 'react-navigation-stack';
import {
  Login,
  AppOnBoarding,
  Register,
  ForgotPassword,
  JoinWaitList,
} from 'modules/accounts';
import Drawer from './Drawer';
import ReturnInPersonStack from 'modules/returnInPerson/ReturnInPersonDrawer';
import PickupCrockeryStack from 'modules/pickupCrockery/PickupCrockeryDrawer';
import ScheduledPickupStack from 'modules/scheduledPickup/ScheduledPickupDrawer';
import PendingPickUpStack from 'modules/orders/PendingPickup';
import OrderHistoryStack from 'modules/orders/OrderHistory';
import Homepage from 'modules/products/Welcome.js';
import SavedAddressStack from 'modules/savedAddress/SavedAddressDrawer.js';
import SettingsStack from 'modules/settings/SettingsDrawer.js';
import AddAddressStack from 'modules/addAddress/AddAddressDrawer.js';
// login stack
const LoginStack = createStackNavigator(
  {
    loginScreen: {screen: Login},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Forgot Password stack
const ForgotPasswordStack = createStackNavigator(
  {
    forgotPasswordScreen: {screen: ForgotPassword},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Register stack
const RegisterStack = createStackNavigator(
  {
    registerScreen: {screen: Register},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// JpinWaitList stack
const JoinWaitListStack = createStackNavigator(
  {
    JoinWaitListScreen: {screen: JoinWaitList},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);
const AppOnBoardingStack = createStackNavigator(
  {
    AppOnBoardingScreen: {screen: AppOnBoarding},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    loginStack: {screen: LoginStack},
    forgotPasswordStack: {screen: ForgotPasswordStack},
    registerStack: {screen: RegisterStack},
    joinWaitListStack: {screen: JoinWaitListStack},
    appOnBoardingStack: {screen: AppOnBoardingStack},
    returnInPersonStack: {screen: ReturnInPersonStack},
    pickupCrockeryStack: {screen: PickupCrockeryStack},
    pendingPickUpStack: {screen: PendingPickUpStack},
    orderHistoryStack: {screen: OrderHistoryStack},
    homepageStack: {screen: Homepage},
    drawerStack: {screen: Drawer},
    scheduledPickupStack: {screen: ScheduledPickupStack},
    savedAddressStack: {screen: SavedAddressStack},
    settingsStack: {screen: SettingsStack},
    addAddressStack: {screen: AddAddressStack},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'appOnBoardingStack',
  },
);

export default PrimaryNav;
