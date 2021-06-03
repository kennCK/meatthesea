import AsyncStorage from '@react-native-community/async-storage';
import Data from 'services/Data';
import {Helper, Color} from 'common';

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  UPDATE_USER: 'UPDATE_USER',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
  SET_THEME: 'SET_THEME',
  nav: null,
  SET_LOCATION: 'SET_LOCATION',
  SET_STORES: 'SET_STORES',
  SET_FILTER: 'SET_FILTER',
  SET_DELI_CATEGORIES: 'SET_DELI_CATEGORIES',
  SET_RESTAURANT_CATEGORIES: 'SET_RESTAURANT_CATEGORIES',
  SET_HOMEPAGE_SETTINGS: 'SET_HOMEPAGE_SETTINGS',
  SET_SEARCH: 'SET_SEARCH',
  SET_CART: 'SET_CART',
  SET_ORDER_DETAILS: 'SET_ORDER_DETAILS',
  SET_USER_LOCATION: 'SET_USER_LOCATION',
  SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
  SET_PICKUP_CROCKERIES: 'SET_PICKUP_CROCKERIES',
  SET_SELECTED_DELIVERY_TIME: 'SET_SELECTED_DELIVERY_TIME',
  SET_ORDER: 'SET_ORDER',
  SET_STORE_LOCATION: 'SET_STORE_LOCATION',
  SET_REQUEST_PICKUP_CROCKERY: 'SET_REQUEST_PICKUP_CROCKERY',
  SET_PAYPAL_SUCCESS_DATA: 'SET_PAYPAL_SUCCESS_DATA',
  SET_MENU_PRODUCTS: 'SET_MENU_PRODUCTS',
  SET_SHOW_RATING: 'SET_SHOW_RATING',
  SET_ISLOCATION_RETRIEVE: 'SET_ISLOCATION_RETRIEVE',
  SET_ISADDINGCUTLERY: 'SET_ISADDINGCUTLERY'
};

export const actions = {
  login: (email, password, user, token) => {
    return {type: types.LOGIN, user, token, email, password};
  },
  logout() {
    return {type: types.LOGOUT};
  },
  updateUser: (user) => {
    return {type: types.UPDATE_USER, user};
  },
  setNotifications(unread, notifications) {
    return {type: types.SET_NOTIFICATIONS, unread, notifications};
  },
  updateNotifications(unread, notification) {
    return {type: types.UPDATE_NOTIFICATIONS, unread, notification};
  },
  setTheme(theme) {
    return {type: types.SET_THEME, theme};
  },
  setLocation(location) {
    return {type: types.SET_LOCATION, location};
  },
  setStores(stores) {
    return {type: types.SET_STORES, stores};
  },
  setFilter(filter) {
    return {type: types.SET_FILTER, filter};
  },
  setDeliCategories(categories) {
    return {type: types.SET_DELI_CATEGORIES, categories};
  },
  setRestaurantCategories(categories) {
    return {type: types.SET_RESTAURANT_CATEGORIES, categories};
  },
  setHomepageSettings(settings){
    return { type: types.SET_HOMEPAGE_SETTINGS, settings};
  },
  setSearch(search){
    return { type: types.SET_SEARCH, search };
  },
  setCart(cart){
    return { type: types.SET_CART, cart };
  },
  setOrderDetails(details){
    return { type: types.SET_ORDER_DETAILS, details };
  },
  setUserLocation(location){
    return { type: types.SET_USER_LOCATION, location };
  },
  setPaymentMethod(payment){
    return { type: types.SET_PAYMENT_METHOD, payment };
  },
  setPickupCrockeries(crockeries){
    return { type: types.SET_PICKUP_CROCKERIES, crockeries };
  },
  setSelectedDeliveryTime(deliveryTime){
    return { type: types.SET_SELECTED_DELIVERY_TIME, deliveryTime };
  },
  setOrder(order){
    return { type: types.SET_ORDER, order };
  },
  setStoreLocation(storeLocation) {
    return { type: types.SET_STORE_LOCATION, storeLocation}
  },
  setRequestPickUpCrockery(requestPickUpCrockery) {
    return { type: types.SET_REQUEST_PICKUP_CROCKERY, requestPickUpCrockery}
  },
  setPaypalSuccessData(paypalSuccessData) {
    return { type: types.SET_PAYPAL_SUCCESS_DATA, paypalSuccessData}
  },
  setMenuProducts(menuProducts) {
    return { type: types.SET_MENU_PRODUCTS, menuProducts}
  },
  setShowRating(showRating) {
    return { type: types.SET_SHOW_RATING, showRating}
  },
  setIsLocationRetrieve(isLocationRetrieve) {
    return { type: types.SET_ISLOCATION_RETRIEVE, isLocationRetrieve}
  },
  setIsAddingCutlery(setIsAddingCutlery) {
    return { type: types.SET_ISADDINGCUTLERY, setIsAddingCutlery}
  }
};

const initialState = {
  token: null,
  user: null,
  notifications: null,
  theme: null,
  location: null,
  stores: [],
  filter: null,
  restaurant: null,
  deliStore: null,
  homepage: null,
  search: null,
  cart: null,
  orderDetails: null,
  userLocation: null,
  paymentMethod: {type: 'PayPal', last4: ''},
  crockeries: null,
  deliveryTime: 'ASAP',
  order: null,
  storeLocation: {
    id: 1
  },
  requestPickUpCrockery: null,
  paypalSuccessData: null,
  menuProducts: null,
  showRating: false, // set to false, for default
  isLocationRetrieve: true,
  setIsAddingCutlery: false
};

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${Helper.APP_NAME}${key}`, value);
  } catch (e) {
    // saving error
  }
};

const reducer = (state = initialState, action) => {
  const {type, user, token, email, password} = action;
  const {unread} = action;
  const {notification} = action;
  const {theme} = action;
  const {location, setIsAddingCutlery} = action;
  const {stores, showRating, isLocationRetrieve} = action;
  const { filter, categories, settings, search } = action;
  const { cart, details, payment } = action;
  const { crockeries, deliveryTime, order, storeLocation } = action;
  const { requestPickUpCrockery, paypalSuccessData, menuProducts } = action;

  switch (type) {
    case types.LOGOUT:
      AsyncStorage.clear();
      return Object.assign({}, initialState);
    case types.LOGIN:
      if(token !== null){
        let {access_token, expires_in} = token;
        storeData('token', access_token);
        storeData('token_expiration', expires_in.toString());
      }
      storeData('email', email);
      storeData('password', password);
      console.log('token', user)
      Data.setToken(token);
      return {...state, user, token};
    case types.UPDATE_USER:
      return {
        ...state,
        user,
      };
    case types.SET_NOTIFICATIONS:
      let notifications = {
        unread,
        notifications: action.notifications,
      };
      console.log('notifications', true);
      return {
        ...state,
        notifications,
      };
    case types.UPDATE_NOTIFICATIONS:
      let updatedNotifications = null;
      if (state.notifications == null) {
        let temp = [];
        temp.push(notification);
        updatedNotifications = {
          unread,
          notifications: temp,
        };
      } else {
        let oldNotif = state.notifications;
        if (oldNotif.notifications == null) {
          let temp = [];
          temp.push(notification);
          updatedNotifications = {
            unread,
            notifications: temp,
          };
        } else {
          if (
            parseInt(notification.id) !=
            parseInt(
              oldNotif.notifications[oldNotif.notifications.length - 1].id,
            )
          ) {
            oldNotif.notifications.unshift(notification);
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications,
            };
          } else {
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications,
            };
          }
        }
      }
      return {
        ...state,
        notifications: updatedNotifications,
      };
    case types.SET_THEME:
      console.log('theme', theme);
      storeData('primary', theme.primary);
      storeData('secondary', theme.secondary);
      storeData('tertiary', theme.tertiary);
      Color.setPrimary(theme.primary);
      Color.setSecondary(theme.secondary);
      Color.setTertiary(theme.tertiary);
      return {
        ...state,
        theme,
      };
    case types.SET_LOCATION:
      console.log('location', location)
      // storeData('store', String(location.id));
      return {
        ...state,
        location,
      };
    case types.SET_STORES:
      return {
        ...state,
        stores,
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter
      }
    case types.SET_DELI_CATEGORIES:
      return {
        ...state,
        deliStore: categories
      }

    case types.SET_RESTAURANT_CATEGORIES:
      return {
        ...state,
        restaurant: categories
      }
    case types.SET_HOMEPAGE_SETTINGS:
      return {
        ...state,
        homepage: settings
      }
    case types.SET_SEARCH:
      return {
        ...state,
        search
      }
    case types.SET_CART:
      return {
        ...state,
        cart
      }
    case types.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: details
      }
    case types.SET_USER_LOCATION:
      return {
        ...state,
        userLocation: location
      }
    case types.SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payment
      }
    case types.SET_PICKUP_CROCKERIES:
      return {
        ...state,
        crockeries
      }
    case types.SET_SELECTED_DELIVERY_TIME:
      return {
        ...state,
        deliveryTime
      }
    case types.SET_ORDER:
      return {
        ...state,
        order
      }
    case types.SET_STORE_LOCATION:
      // storeData('store', String(storeLocation.id));
      return {
        ...state,
        storeLocation
      }
    case types.SET_REQUEST_PICKUP_CROCKERY:
      return {
        ...state,
        requestPickUpCrockery
      }
    case types.SET_PAYPAL_SUCCESS_DATA:
      return {
        ...state,
        paypalSuccessData
      }
    case types.SET_MENU_PRODUCTS:
      return {
        ...state,
        menuProducts
      }
    case types.SET_SHOW_RATING:
      return {
        ...state,
        showRating
      }
    case types.SET_ISLOCATION_RETRIEVE:
      return {
        ...state,
        isLocationRetrieve
      }
    case types.SET_ISADDINGCUTLERY:
      return {
        ...state,
        setIsAddingCutlery
      }
    default:
      return {...state, nav: state.nav};
  }
};
export default reducer;
