import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/';
export default {

  // Categories
  categoriesRetrieve: apiUrl + '​/api​/categories',
  categoriesAdd: apiUrl + '​/api​/categories',
  categoriesCount: apiUrl + '​/api​/categories​/count',
  categoriesRetrieveById: id => apiUrl + `/api​/categories​/${id}`,
  categoriesUpdateById: id => apiUrl + `/api​/categories​/${id}`,
  categoriesDeleteById: id => apiUrl + `/api​/categories​/${id}`,
  
  // CustomerRoles
  customerRolesRetrieve: apiUrl + '​/api​/customer_roles',

  // Customers
  customerRetrieve: apiUrl + '​/api​/customers',
  customerAdd: apiUrl + '​/api​/customers',
  customerRetrieveById: id => apiUrl + `/api​/customers​/${id}`,
  customerUpdateById: id => apiUrl + `/api​/customers​/${id}`,
  customerDeleteById: id => apiUrl + `/api​/customers​/${id}`,
  customerRetrieveCount: apiUrl + '​/api​/customers​/count',
  customerSearch: apiUrl + '​/api​/customers​/search',

  // Languages
  languageRetrieve: apiUrl + '​/api​/languages',

  // Manufacturers
  manufacturerRetrieve: apiUrl + '​/api​/manufacturers',
  manufacturerAdd: apiUrl + '​/api​/manufacturers',
  manufacturerCount: apiUrl + '​/api​/manufacturers/count',
  manufacturerRetrieveById: id => apiUrl + `/api​/manufacturers​/${id}`,
  manufacturerUpdateById: id => apiUrl + `/api​/manufacturers​/${id}`,
  manufacturerDeleteById: id => apiUrl + `/api​/manufacturers​/${id}`,
  // NewsLetterSubscription
  newsLetterSubscriptionRetrieve: apiUrl + '​/api​/news_letter_subscriptions',
  newsLetterSubscriptionDeactivate: email => apiUrl + `/api​/news_letter_subscriptions​/${email}​/deactivate`,

  // OrderItems

  orderItemsRetrieve: orderId => apiUrl + `/api​/orders​/${orderId}​/items`,
  orderItemsAdd: orderId => `/api​/orders​/${orderId}​/items`,
  orderItemsDeleteByOrderId: orderId => apiUrl + `/api​/orders​/${orderId}​/items`,
  orderItemsCount: orderId => `/api​/orders​/${orderId}​/items​/count`,
  orderItemsRetrieveWithDetails: (orderId, orderItemId) => apiUrl + `/api​/orders​/${orderId}​/items​/${orderItemId}`,
  orderItemsUpdate: (orderId, orderItemId) => apiUrl + `/api​/orders​/${orderId}​/items​/${orderItemId}`,
  orderItemsDeleteByOrderItemId: (orderId, orderItemId) => `/api​/orders​/${orderId}​/items​/${orderItemId}`,

  // Orders

  ordersRetrieve: apiUrl + '​/api​/orders',
  ordersAdd: '/api​/orders',
  ordersCount: '/api​/orders​/count',
  ordersRetrieveById: id => apiUrl + `/api​/orders​/${id}`,
  ordersDeleteById: id => apiUrl + `/api​/orders​/${id}`,
  ordersUpdateById: id => apiUrl + `/api​/orders​/${id}`,
  ordersRetrieveByCustomer: customer_id => apiUrl + `/api​/orders​/customer​/${customer_id}`,

  // ProductAttributes
  productAttribuesRetrieve: apiUrl + '​/api​/productattributes',
  productAttribuesAdd: apiUrl + '​/api​/productattributes',
  productAttribuesCount: apiUrl + '​/api​/productattributes/count',
  productAttribuesRetrieveById: id => `/api​/productattributes​/${id}`,
  productAttribuesUpdate: id => apiUrl + `/api​/productattributes​/${id}`,
  productAttribuesDelete: id => apiUrl + `/api​/productattributes​/${id}`,

  // ProductCategoryMappings


  productMappingRetrieve: apiUrl + '​/api​/product_category_mappings',
  productMappingCount: apiUrl + '​/api​/product_category_mappings​/count',
  productMappingRetrieveById: id => apiUrl + `/api​/product_category_mappings/${id}`,
  productMappingUpdate: id => apiUrl + `/api​/product_category_mappings/${id}`,
  productMappingDelete: id => apiUrl + `/api​/product_category_mappings/${id}`,

  // ProductManufacturerMappings
  productManufacturerMappingsRetrieve: apiUrl + '​/api​/product_manufacturer_mappings',
  productManufacturerMappingsAdd: apiUrl + '​/api​/product_manufacturer_mappings',
  productManufacturerMappingsCount: apiUrl + '​/api​/product_manufacturer_mappings/count',
  productManufacturerMappingsRetrieveById: id => `/api​/product_manufacturer_mappings/${id}`,
  productManufacturerMappingsUpdate: id => `/api​/product_manufacturer_mappings/${id}`,
  productManufacturerMappingsDelete: id => `/api​/product_manufacturer_mappings/${id}`,

  // Products
  productsRetrieve: apiUrl + '​/api​/products',
  productsAdd: apiUrl + '​/api​/products',
  productsCount: apiUrl + '​/api​/products​/count',
  productsRetrieveById: id => apiUrl + `/api​/products​/${id}`,
  productsUpdateById: id => apiUrl + `/api​/products​/${id}`,
  productsDeleteById: id => apiUrl + `/api​/products​/${id}`,
  
  // ProductSpecificationAttributes
  productSpecificationAttributesRetrieve: apiUrl + '​/api​/productspecificationattributes',
  productSpecificationAttributesAdd: apiUrl + '​/api​/productspecificationattributes',
  productSpecificationAttributesCount: apiUrl + '​/api​/productspecificationattributes/count',
  productSpecificationAttributesRetrieveById: id => `/api​/productspecificationattributes/${id}`,
  productSpecificationAttributesUpdate: id => `/api​/productspecificationattributes/${id}`,
  productSpecificationAttributesDelete: id => `/api​/productspecificationattributes/${id}`,

  // ShoppingCartItems
  shoppingCartItemsRetrieve: '/api​/shopping_cart_items',
  shoppingCartItemsAdd: '/api​/shopping_cart_items',
  shoppingCartItemsRetrieveByCustomer: customerId => `/api​/shopping_cart_items/${customerId}`,
  shoppingCartItemsUpdate: id => apiUrl + `/api​/shopping_cart_items​/${id}`,
  shoppingCartItemsDelete: id => apiUrl + `/api​/shopping_cart_items​/${id}`,

  // SpecificationAttributes
  specificationAttributesRetrieve: apiUrl + '​/api​/specificationattributes',
  specificationAttributesAdd: apiUrl + '​/api​/specificationattributes',
  specificationAttributesCount: apiUrl + '​/api​/specificationattributes/count',
  specificationAttributesRetrieveById: id => `/api​/specificationattributes/${id}`,
  specificationAttributesUpdate: id => `/api​/specificationattributes/${id}`,
  specificationAttributesDelete: id => `/api​/specificationattributes/${id}`,

  // Store
  storeRetrieveCurrent: apiUrl + '​/api​/current_store',
  storeRetrieveAll: apiUrl + '​/api​/stores',
  getAccessToken: apiUrl + '​/api​/getaccesstoken'
}