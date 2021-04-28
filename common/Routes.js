import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/api/';
export default {
  // Categories
  categoriesRetrieve: apiUrl + 'categories',
  categoriesAdd: apiUrl + 'categories',
  categoriesCount: apiUrl + 'categories/count',
  categoriesRetrieveById: id => apiUrl + 'categories' + id,
  categoriesUpdateById: id => apiUrl + 'categories/' + id,
  categoriesDeleteById: id => apiUrl + 'categories/' + id,
  restaurantCategoriesRetrieve: apiUrl + 'get_restaurant_categories',
  deliCategoriesRetrieve: apiUrl + 'get_deli_shop_categories',

  // CustomerRoles
  customerRolesRetrieve: apiUrl + 'customer_roles',

  // Customers
  customerRetrieve: apiUrl + 'customers',
  customerAdd: apiUrl + 'customers',
  customerRetrieveById: id => apiUrl + 'customers/' + id,
  customerUpdateById: id => apiUrl + 'customers/' + id,
  customerDeleteById: id => apiUrl + 'customers/' + id,
  customerRetrieveCount: apiUrl + 'customers/count',
  customerSearch: apiUrl + 'customers/search',
  customerLogin:apiUrl+'customerlogin',
  customerRegister:apiUrl + 'customer_register/',
  customerForgotPassword:apiUrl + 'customer_forgot_password/',
  customerRetrieveAddresses: id => apiUrl + 'customer_get_addresses?customerId=' + id,
  customerRetrieveDefaultAddress: (customerId, AddressId) => apiUrl + `customer_default_address?CustomerId=${customerId}&AddressId=${AddressId}`,
  customerAddAddress: (CustomerId, FullName, PhoneNumber, Address, AddressName, Latitude, Longitude, City, PostalCode, CountryId) => apiUrl + `customer_add_address?CustomerId=${CustomerId}&Address1=${Address}&AddressName=${AddressName}&FullName=${FullName}&PhoneNumber=${PhoneNumber}&Latitude=${Latitude}&Longitude=${Longitude}&City=${City}&PostalCode=${PostalCode}&CountryId=${CountryId}`,
  customerRemoveAddress: (customerId, addressId) => apiUrl + `customer_delete_address?CustomerId=${customerId}&AddressId=${addressId}`,
  // Languages
  languageRetrieve: apiUrl + 'languages',

  // Manufacturers
  manufacturerRetrieve: apiUrl + 'manufacturers',
  manufacturerAdd: apiUrl + 'manufacturers',
  manufacturerCount: apiUrl + 'manufacturers/count',
  manufacturerRetrieveById: id => apiUrl + 'manufacturers/' + id,
  manufacturerUpdateById: id => apiUrl + 'manufacturers/' + id,
  manufacturerDeleteById: id => apiUrl + 'manufacturers/' + id,
  // NewsLetterSubscription
  newsLetterSubscriptionRetrieve: apiUrl + 'news_letter_subscriptions',
  newsLetterSubscriptionDeactivate: email =>
    apiUrl + 'news_letter_subscriptions/' + email + '/deactivate',

  // OrderItems

  orderItemsRetrieve: orderId => apiUrl + 'orders/' + orderId + '/items',
  orderItemsAdd: orderId => 'orders/' + orderId + '/items',
  orderItemsDeleteByOrderId: orderId => apiUrl + 'orders/' + orderId + '/items',
  orderItemsCount: orderId => 'orders/' + orderId + '/items/count',
  orderItemsRetrieveWithDetails: (orderId, orderItemId) =>
    apiUrl + 'orders/' + orderId + '/items/' + orderItemId,
  orderItemsUpdate: (orderId, orderItemId) =>
    apiUrl + 'orders/' + orderId + '/items/' + orderItemId,
  orderItemsDeleteByOrderItemId: (orderId, orderItemId) =>
    'orders/' + orderId + '/items/' + orderItemId,

  // Orders
  ordersRetrieve: apiUrl + 'orders',
  ordersAdd: apiUrl + 'orders',
  ordersCount: apiUrl + 'orders/count',
  ordersRetrieveById: id => apiUrl + 'orders/' + id,
  ordersDeleteById: id => apiUrl + 'orders/' + id,
  ordersUpdateById: id => apiUrl + 'orders/' + id,
  ordersRetrieveByCustomer: customer_id =>
    apiUrl + 'orders/customer/' + customer_id + '?customerId=' + customer_id,
  ordersConfirm: (CustomerId, StoreId, AddressId) => apiUrl + 'confirm_order?' + 'CustomerId=' + CustomerId + '&StoreId=' + StoreId + '&AddressId=' + AddressId,
  
  paypalAccountRetrieve: apiUrl + 'get_paypal_details',
  paypalCreateOrder: (ClientId, ClientSecret, paymentType, Sandbox, CustomerId, AddressId, StoreId) => apiUrl + `paypal_create_order?ClientId=${ClientId}&ClientSecret=${ClientSecret}&PaymentType=${paymentType}&Sandbox=${Sandbox}&CustomerId=${CustomerId}&AddressId=${AddressId}&StoreId=${StoreId}`,

  paypalConfirmOrder: (CustomerId, StoreId, AddressId, OrderGuid, PayPalOrderId, DeliveryTimeRequested, LocalTimeCreated) => apiUrl + `confirm_order_paypal?CustomerId=${CustomerId}&StoreId=${StoreId}&AddressId=${AddressId}&OrderGuid=${OrderGuid}&PayPalOrderId=${PayPalOrderId}&DeliveryTimeRequested=${DeliveryTimeRequested}&LocalTimeCreated=${LocalTimeCreated}`,

  crockeryRetrieve: apiUrl + `get_crockery?`,

  crockeryUpdate: (CrockeryID, AddressID, CrockeryStatusID) => apiUrl + `update_crockery?CrockeryId=${CrockeryID}&AddressId=${AddressID}&CrockeryStatusId=${CrockeryStatusID}`,

  // ProductAttributes
  productAttribuesRetrieve: apiUrl + 'productattributes',
  productAttribuesAdd: apiUrl + 'productattributes',
  productAttribuesCount: apiUrl + 'productattributes/count',
  productAttribuesRetrieveById: id => 'productattributes/' + id,
  productAttribuesUpdate: id => apiUrl + 'productattributes/' + id,
  productAttribuesDelete: id => apiUrl + 'productattributes/' + id,

  // ProductCategoryMappings
  productMappingRetrieve: apiUrl + 'product_category_mappings',
  productMappingCount: apiUrl + 'product_category_mappings/count',
  productMappingRetrieveById: id => apiUrl + 'product_category_mappings/' + id,
  productMappingUpdate: id => apiUrl + 'product_category_mappings/' + id,
  productMappingDelete: id => apiUrl + 'product_category_mappings/' + id,

  // ProductManufacturerMappings
  productManufacturerMappingsRetrieve: apiUrl + 'product_manufacturer_mappings',
  productManufacturerMappingsAdd: apiUrl + 'product_manufacturer_mappings',
  productManufacturerMappingsCount:
    apiUrl + 'product_manufacturer_mappings/count',
  productManufacturerMappingsRetrieveById: id =>
    'product_manufacturer_mappings/' + id,
  productManufacturerMappingsUpdate: id =>
    apiUrl + 'product_manufacturer_mappings/' + id,
  productManufacturerMappingsDelete: id =>
    apiUrl + 'product_manufacturer_mappings/' + id,

  // Products
  productsRetrieve: apiUrl + 'products',
  productsAdd: apiUrl + 'products',
  productsCount: apiUrl + 'products/count',
  productSearch: apiUrl + 'product_search',
  productsRetrieveById: id => apiUrl + 'products/' + id,
  productsUpdateById: id => apiUrl + 'products/' + id,
  productsDeleteById: id => apiUrl + 'products/' + id,

  // ProductSpecificationAttributes
  productSpecificationAttributesRetrieve:
    apiUrl + 'productspecificationattributes',
  productSpecificationAttributesAdd: apiUrl + 'productspecificationattributes',
  productSpecificationAttributesCount:
    apiUrl + 'productspecificationattributes/count',
  productSpecificationAttributesRetrieveById: id =>
    'productspecificationattributes/' + id,
  productSpecificationAttributesUpdate: id =>
    'productspecificationattributes/' + id,
  productSpecificationAttributesDelete: id =>
    'productspecificationattributes/' + id,

    //Ratings
  addRatings: (CustomerId, StoreId, Rating) => apiUrl + `customer_add_rating?CustomerId=${CustomerId}&StoreId=${StoreId}&Rating=${Rating}`,
  // FeedBack
  addFeedback: (CustomerId, StoreId, Comment) => apiUrl + `customer_add_feedback?CustomerId=${CustomerId}&StoreId=${StoreId}&Comment=${Comment}`, 

  // ShoppingCartItems
  shoppingCartItemsRetrieve: apiUrl + 'shopping_cart_items',
  shoppingCartItemsAdd: apiUrl + 'shopping_cart_items',
  shoppingCartItemsAddToCart: apiUrl + 'add_to_shopping_cart',
  shoppingCartItemsUpdateCart: apiUrl + 'update_shopping_cart',
  shoppingCartItemsRetrieveByCustomer: customerId =>
    'shopping_cart_items/' + customerId,
  shoppingCartItemsUpdate: id => apiUrl + 'shopping_cart_items/' + id,
  shoppingCartItemsDelete: id => apiUrl + 'shopping_cart_items/' + id,

  // SpecificationAttributes
  specificationAttributesRetrieve: apiUrl + 'specificationattributes',
  specificationAttributesAdd: apiUrl + 'specificationattributes',
  specificationAttributesCount: apiUrl + 'specificationattributes/count',
  specificationAttributesRetrieveById: id => 'specificationattributes/' + id,
  specificationAttributesUpdate: id => 'specificationattributes/' + id,
  specificationAttributesDelete: id => 'specificationattributes/' + id,

  // Store
  storeRetrieveCurrent: apiUrl + 'current_store',
  storeRetrieveAll: apiUrl + 'stores',
  getAccessToken: apiUrl + 'getaccesstoken',

  // countries
  getCountries: apiUrl + 'countries',

  //WaitList
  waitListAdd: (name, email, phone) => apiUrl + `add_waitlist?FullName=${name}&Email=${email}&PhoneNumber=${phone}`,

  // nearest store
  nearestStore: (lat, long) => apiUrl + `nearest_store?latitude=${lat}&longitude=${long}`
};
