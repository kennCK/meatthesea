import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/';
export default {
  // Customers
  customerRetrieve: apiUrl + '/api/customers'
}