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
  SET_FILTER: 'SET_FILTER'
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
};

const initialState = {
  token: null,
  user: null,
  notifications: null,
  theme: null,
  location: null,
  stores: [],
  filter: null
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
  const {location} = action;
  const {stores} = action;
  const { filter } = action;

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
      console.log('token', token)
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
      storeData('store', location.id);
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
    default:
      return {...state, nav: state.nav};
  }
};
export default reducer;
