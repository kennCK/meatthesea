import {createStackNavigator} from 'react-navigation-stack';
import {
  Login,
  AppOnBoarding,
  Register,
  ForgotPassword,
  JoinWaitList,
  ChangePassword,
} from 'modules/accounts';
import Drawer from './Drawer';
import ReturnInPersonStack from 'modules/returnInPerson/ReturnInPersonDrawer';
import PickupCrockeryStack from 'modules/pickupCrockery/PickupCrockeryDrawer';
import ScheduledPickupStack from 'modules/scheduledPickup/ScheduledPickupDrawer';
import PendingPickUpStack from 'modules/orders/PendingPickup';
import OrderHistoryStack from 'modules/orders/OrderHistory';
import Homepage from 'modules/products/Welcome.js';
import TermsAndConditionStack from 'modules/termsAndCondition/termsAndConditionDrawer';
import FilterStack from 'modules/filter/filterDrawer';
import PaymentStack from 'modules/payment/paymentDrawer';
import AccountStack from 'modules/user/account';
import ProfileStack from 'modules/user/profile';
import OrderSummaryStack from 'modules/orders/OrderSummary';
import OrderPlacedStack from 'modules/orders/OrderPlaced';
import RequestPickupStack from 'modules/orders/RequestPickup';
import SavedAddressStack from 'modules/savedAddress/SavedAddressDrawer.js';
import SettingsStack from 'modules/settings/SettingsDrawer.js';
import AddAddressStack from 'modules/addAddress/AddAddressDrawer.js';
import LocationStack from 'components/Location/Drawer.js';
import LocationWithMap from 'components/Location/LocationWithMap';
import AddPaymentMethodStack from 'modules/addPaymentMethod/AddPaymentMethodDrawer.js';
import CheckoutStack from 'modules/checkout/CheckoutDrawer.js';
import AddSubscriptionStack from 'modules/addSubscription/AddSubscriptionDrawer.js';
import PapalPaymentStack from 'modules/Paypal';
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
const ChangePasswordStack = createStackNavigator(
  {
    changePasswordScreen: {screen: ChangePassword},
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

const LocationWithMapStack = createStackNavigator(
  {
    LocationWithMapScreen: {screen: LocationWithMap},
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
    filterStack: {screen: OrderHistoryStack},
    orderSummaryStack: {screen: OrderSummaryStack},
    homepageStack: {screen: Homepage},
    drawerStack: {screen: Drawer},
    scheduledPickupStack: {screen: ScheduledPickupStack},
    termsAndConditionStack: {screen: TermsAndConditionStack},
    filterStack: {screen: FilterStack},
    paymentStack: {screen: PaymentStack},
    accountStack: {screen: AccountStack},
    profileStack: {screen: ProfileStack},
    savedAddressStack: {screen: SavedAddressStack},
    settingsStack: {screen: SettingsStack},
    addAddressStack: {screen: AddAddressStack},
    requestPickupStack: {screen: RequestPickupStack},
    locationWithMapStack: {screen: LocationWithMapStack},
    addPaymentMethodStack: {screen: AddPaymentMethodStack},
    checkoutStack: {screen: CheckoutStack},
    changePasswordStack: {screen: ChangePasswordStack},
    addSubscriptionStack: {screen: AddSubscriptionStack},
    orderPlacedStack: {screen: OrderPlacedStack},
    papalPaymentStack: {screen: PapalPaymentStack},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'appOnBoardingStack',
  },
);

export default PrimaryNav;
