let LIVE_BACKEND_URL = 'https://api.runwayexpress.co.uk/public/increment/v1';
let DEV_BACKEND_URL = 'http://localhost/project123/api/public/increment/v1';
let isDev = false;
let BACKEND_URL = isDev ? DEV_BACKEND_URL : LIVE_BACKEND_URL;
export default {
  IS_DEV: BACKEND_URL,
  BACKEND_URL: BACKEND_URL,
  TEST: true,
  GOOGLE: {
    API_KEY: 'AIzaSyAxT8ShiwiI7AUlmRdmDp5Wg_QtaGMpTjg',
  },
  PUSHER: {
    appId: '1019305',
    key: '92d03f6cdbc9b3e7467b',
    secret: 'cc2d5c85ccbc23847c45',
    cluster: 'ap1',
    encrypted: true,
  },
  versionChecker: 'manual',
};
