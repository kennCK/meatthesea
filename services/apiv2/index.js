import { Routes } from 'common';
import Data from 'services/Data';
import axios from 'axios'
import config from 'src/config.js';
const Api = {
  authenticate: (username, password, callback, errorCallback = null) => {
    const body = {
      username: username,
      password: password,
      status: 'VERIFIED'
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + config.authorization
      },
      body: JSON.stringify(body)
    };
    fetch(Routes.auth, fetchOptions).then((response) => response.json()).then((json) => {
      callback(json);
    }).catch((error) => {
      if (errorCallback) {
        errorCallback(error)
      }
    })
  },
  getAuthUser: (token, callback, errorCallback = null) => {
    const body = {
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + config.authorization
      },
      body: JSON.stringify(body)
    };
    fetch(Routes.authUser + '?token=' + token, fetchOptions).then((response) => response.json()).then((json) => {
      callback(json);
    }).catch((error) => {
      if (errorCallback) {
        errorCallback(error)
      }
    })
  },
  postRequest: (route, parameter, callback, errorCallback = null) => {
    // const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + config.authorization
      },
      body: JSON.stringify(parameter)
    }
    fetch(route, fetchOptions).then(response => response.json()).then(json => {
      callback(json)
    }).catch(error => {
      if (errorCallback) {
        errorCallback(error)
      }
    })
  },

  getRequest: (route, callback, errorCallback = null) => {
    console.log(route )

    // const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': '*/*',
        'Authorization': 'bearer ' + config.authorization,
        'Accept': '*/*'
      }
    }
    fetch(route, fetchOptions).then(response => response.json()).then(json => {
      callback(json)
    }).catch(error => {
      if (errorCallback) {
        errorCallback(error)
      }
    })
  },
  upload: (route, parameter, callback, errorCallback = null) => {
    console.log('route', Data.token ? route + '?token=' + Data.token : route)
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    console.log({ apiRoute, parameter })
    axios({
      url: apiRoute,
      method: 'POST',
      data: parameter,
      headers: {
        Accept: 'application/json', 'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        callback(response)
      })
      .catch(function (error) {
        console.info(error.config)
        if (errorCallback) {
          errorCallback(error)
        }
      });
  },
  uploadByFetch: (route, parameter, callback, errorCallback = null) => {
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    fetch(apiRoute, {
      method: "POST",
      body: parameter,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log('success upload')
        callback(response)
      })
      .catch(error => {
        console.log('error upload')
        if (errorCallback) {
          errorCallback(error)
        }
      });
  }
};

export default Api;