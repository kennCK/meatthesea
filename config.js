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
    appId: '1079335',
    key: 'fcc878c9ae95355398a8',
    secret: 'd5e212f122e005bd91ef',
    cluster: 'ap1',
    encrypted: true,
  },
  versionChecker: 'manual',
};
