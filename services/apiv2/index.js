import {Routes} from 'common';
import Data from 'services/Data';
import axios from 'axios';
import config from 'src/config.js';
const Api = {
  authenticate: (username, password, callback, errorCallback = null) => {
    const body = {
      username: username,
      password: password,
      status: 'VERIFIED',
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + config.authorization,
      },
      body: JSON.stringify(body),
    };
    fetch(Routes.auth, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  getAuthUser: (token, callback, errorCallback = null) => {
    const body = {};
    const fetchOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + config.authorization,
      },
      body: JSON.stringify(body),
    };
    fetch(Routes.authUser + '?token=' + token, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  postRequest: async (route, parameter, callback, errorCallback = null) => {
    // const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    let token = config.authorization;
    try {
      const savedToken = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      if (savedToken) {
        token = Data.token;
      }
    } catch (error) {
      token = config.authorization;
    }
    const fetchOptions = {
      // url: route,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify(parameter),
    };
    fetch(route, fetchOptions)
      .then((response) => {
        console.log(response.status);
        if (response.ok || response.status == 200) {
          return response.json();
        }
        if (response.status >= 400 && response.status < 500) {
          // console.log('error status :', response);
          errorCallback({
            response,
            message: 'Request failed',
          });
        }
      })
      .then((json) => {
        console.log('json->', json);
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  getRequest: async (route, callback, errorCallback = null) => {
    // const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    let token = config.authorization;
    try {
      const savedToken = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      if (savedToken) {
        token = Data.token;
      }
    } catch (error) {
      token = config.authorization;
    }
    const fetchOptions = {
      // url: route,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'bearer ' + token,
      },
    };
    fetch(route, fetchOptions)
      .then((response) => {
        console.log(response.status);
        if (response.ok || response.status == 200) {
          return response.json();
        }
        if (response.status >= 400 && response.status < 500) {
          console.warn(JSON.stringify(response))
          errorCallback({
            response,
            message: 'Request failed',
          });
        }
      })
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log(error.message)
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  putRequest: async (route, parameter, callback, errorCallback = null) => {
    // const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    let token = config.authorization;
    try {
      const savedToken = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      if (savedToken) {
        token = Data.token;
      }
    } catch (error) {
      token = config.authorization;
    }
    const fetchOptions = {
      // url: route,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify(parameter),
    };
    fetch(route, fetchOptions)
      .then((response) => {
        console.log(response.status);
        if (response.ok || response.status == 200) {
          return response.json();
        }
        if (response.status >= 400 && response.status < 500) {
          console.log('error status :', response.error);
          errorCallback({
            response,
            message: 'Request failed',
          });
        }
      })
      .then((json) => {
        console.log('json->', json);
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  deleteRequest: async (route, parameter, callback, errorCallback = null) => {
    // const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    let token = config.authorization;
    try {
      const savedToken = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
      if (savedToken) {
        token = Data.token;
      }
    } catch (error) {
      token = config.authorization;
    }
    const fetchOptions = {
      // url: route,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify(parameter),
    };
    fetch(route, fetchOptions)
      .then((response) => {
        console.log(response.status);
        if (response.ok || response.status == 200) {
          return response.json();
        }
        if (response.status >= 400 && response.status < 500) {
          console.log('error status :', response.error);
          errorCallback({
            response,
            message: 'Request failed',
          });
        }
      })
      .then((json) => {
        console.log('json->', json);
        callback(json);
      })
      .catch((error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  upload: (route, parameter, callback, errorCallback = null) => {
    console.log('route', Data.token ? route + '?token=' + Data.token : route);
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    console.log({apiRoute, parameter});
    axios({
      url: apiRoute,
      method: 'POST',
      data: parameter,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        callback(response);
      })
      .catch(function (error) {
        console.info(error.config);
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
  uploadByFetch: (route, parameter, callback, errorCallback = null) => {
    const apiRoute = Data.token ? route + '?token=' + Data.token : route;
    fetch(apiRoute, {
      method: 'POST',
      body: parameter,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('success upload');
        callback(response);
      })
      .catch((error) => {
        console.log('error upload');
        if (errorCallback) {
          errorCallback(error);
        }
      });
  },
};

export default Api;
