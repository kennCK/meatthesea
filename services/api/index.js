import { Routes } from 'common';
import Data from 'services/Data';
import config from 'src/config'
import axios from 'axios'
const Api = {
  // authenticate: (username, password, callback, errorCallback = null) => {
  //   const body = {
  //     username: username,
  //     password: password,
  //     status: 'VERIFIED'
  //   };
  //   const fetchOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(body)
  //   };
  //   fetch(Routes.auth, fetchOptions).then((response) => response.json()).then((json) => {
  //     callback(json);
  //   }).catch((error) => {
  //     if (errorCallback) {
  //       errorCallback(error)
  //     }
  //   })
  // },
  // getAuthUser: (token, callback, errorCallback = null) => {
  //   const body = {
  //   };
  //   const fetchOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(body)
  //   };
  //   fetch(Routes.authUser + '?token=' + token, fetchOptions).then((response) => response.json()).then((json) => {
  //     callback(json);
  //   }).catch((error) => {
  //     if (errorCallback) {
  //       errorCallback(error)
  //     }
  //   })
  // },
  post: (route, parameter, callback, errorCallback = null) => {
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${authorization}`
      },
      body: JSON.stringify(parameter)
    }
    fetch(apiRoute, fetchOptions).then(response => response.json()).then(json => {
      callback(json)
    }).catch(error => {
      if (errorCallback) {
        errorCallback(error)
      }
    })
  },
  

  get: (route, callback, errorCallback = null) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${authorization}`
      },
    };
    fetch(route, fetchOptions).then((response) => response.json()).then((json) => {
      callback(json);
    }).catch((error) => {
      if (errorCallback) {
        errorCallback(error)
      }
    })
  },
};

export default Api;