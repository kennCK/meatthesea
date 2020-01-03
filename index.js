import { Routes } from 'common';
import Data from 'services/Data';
import axios from 'axios'
const Api = {
  authenticate: (username, password, callback) => {
    const body = {
      username: username,
      password: password,
      status: 'VERIFIED'
    };
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch(Routes.auth, fetchOptions).then((response) => response.json()).then((json) => {
      callback(json);
    }).catch((error) => console.log('error', error))
  },
  getAuthUser: (token, callback) => {
    const body = {
    };
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch(Routes.authUser + '?token=' + token, fetchOptions).then((response) => response.json()).then((json) => {
      callback(json);
    }).catch((error) => console.log('error', error))
  },
  request: (route, parameter, callback) => {
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(parameter)
    }
    fetch(apiRoute, fetchOptions).then(response => response.json()).then(json => {
      callback(json)
    }).catch(error => console.log('error', error))
  },
  upload: (route, parameter, callback) => {
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    axios.post(apiRoute, parameter)
    .then(response => {
      callback(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};

export default Api;