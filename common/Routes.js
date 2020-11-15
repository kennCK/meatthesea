import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/api/';
export default {
  // Categories
  categoriesRetrieve: apiUrl + 'categories',
  categoriesAdd: apiUrl + 'categories',
<<<<<<< HEAD
  categoriesCount: apiUrl + 'categories​/count',
  categoriesRetrieveById: id => apiUrl + `categories​/${id}`,
  categoriesUpdateById: id => apiUrl + `categories​/${id}`,
  categoriesDeleteById: id => apiUrl + `categories​/${id}`,
=======
  categoriesCount: apiUrl + 'categories/count',
  categoriesRetrieveById: id => apiUrl + 'categories' + id,
  categoriesUpdateById: id => apiUrl + 'categories/' + id,
  categoriesDeleteById: id => apiUrl + 'categories/' + id,
  restaurantCategoriesRetrieve: apiUrl + 'get_restaurant_categories',
  deliCategoriesRetrieve: apiUrl + 'get_deli_shop_categories',
>>>>>>> 678e6246e1ec504f40ce546596ce8dd65bb36d8d

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
<<<<<<< HEAD
  newsLetterSubscriptionDeactivate: email =>
    apiUrl + `news_letter_subscriptions​/${email}​/deactivate`,

  // OrderItems

  orderItemsRetrieve: orderId => apiUrl + `orders​/${orderId}​/items`,
  orderItemsAdd: orderId => `orders​/${orderId}​/items`,
  orderItemsDeleteByOrderId: orderId => apiUrl + `orders​/${orderId}​/items`,
  orderItemsCount: orderId => `orders​/${orderId}​/items​/count`,
  orderItemsRetrieveWithDetails: (orderId, orderItemId) =>
    apiUrl + `orders​/${orderId}​/items​/${orderItemId}`,
  orderItemsUpdate: (orderId, orderItemId) =>
    apiUrl + `orders​/${orderId}​/items​/${orderItemId}`,
  orderItemsDeleteByOrderItemId: (orderId, orderItemId) =>
    `orders​/${orderId}​/items​/${orderItemId}`,

  // Orders
  ordersRetrieve: apiUrl + 'orders',
  ordersAdd: 'orders',
  ordersCount: 'orders​/count',
  ordersRetrieveById: id => apiUrl + `orders​/${id}`,
  ordersDeleteById: id => apiUrl + `orders​/${id}`,
  ordersUpdateById: id => apiUrl + `orders​/${id}`,
  ordersRetrieveByCustomer: customer_id =>
    apiUrl + `orders​/customer​/${customer_id}`,
=======
  newsLetterSubscriptionDeactivate: email => apiUrl + 'news_letter_subscriptions/' + email + '/deactivate',

  // OrderItems

  orderItemsRetrieve: orderId => apiUrl + 'orders/' + orderId + '/items',
  orderItemsAdd: orderId => 'orders/' + orderId + '/items',
  orderItemsDeleteByOrderId: orderId => apiUrl + 'orders/' + orderId + '/items',
  orderItemsCount: orderId => 'orders/' + orderId + '/items/count',
  orderItemsRetrieveWithDetails: (orderId, orderItemId) => apiUrl + 'orders/' + orderId + '/items/' + orderItemId,
  orderItemsUpdate: (orderId, orderItemId) => apiUrl + 'orders/' + orderId + '/items/' + orderItemId,
  orderItemsDeleteByOrderItemId: (orderId, orderItemId) => 'orders/' + orderId + '/items/' + orderItemId,

  // Orders
  ordersRetrieve: apiUrl + "orders",
  ordersAdd:  apiUrl +'orders',
  ordersCount: apiUrl + 'orders/count',
  ordersRetrieveById: id => apiUrl + 'orders/' + id,
  ordersDeleteById: id => apiUrl + 'orders/' + id,
  ordersUpdateById: id => apiUrl + 'orders/' + id,
  ordersRetrieveByCustomer: customer_id => apiUrl + 'orders/customer/' + customer_id,
>>>>>>> 678e6246e1ec504f40ce546596ce8dd65bb36d8d

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
<<<<<<< HEAD
  productManufacturerMappingsCount:
    apiUrl + 'product_manufacturer_mappings/count',
  productManufacturerMappingsRetrieveById: id =>
    `product_manufacturer_mappings/${id}`,
  productManufacturerMappingsUpdate: id =>
    `product_manufacturer_mappings/${id}`,
  productManufacturerMappingsDelete: id =>
    `product_manufacturer_mappings/${id}`,
=======
  productManufacturerMappingsCount: apiUrl + 'product_manufacturer_mappings/count',
  productManufacturerMappingsRetrieveById: id => 'product_manufacturer_mappings/' + id,
  productManufacturerMappingsUpdate: id =>  apiUrl +'product_manufacturer_mappings/' + id,
  productManufacturerMappingsDelete: id =>  apiUrl +'product_manufacturer_mappings/' + id,
>>>>>>> 678e6246e1ec504f40ce546596ce8dd65bb36d8d

  // Products
  productsRetrieve: apiUrl + 'products',
  productsAdd: apiUrl + 'products',
<<<<<<< HEAD
  productsCount: apiUrl + 'products​/count',
  productsRetrieveById: id => apiUrl + `products​/${id}`,
  productsUpdateById: id => apiUrl + `products​/${id}`,
  productsDeleteById: id => apiUrl + `products​/${id}`,
=======
  productsCount: apiUrl + 'products/count',
  productsRetrieveById: id => apiUrl + 'products/' + id,
  productsUpdateById: id => apiUrl + 'products/' + id,
  productsDeleteById: id => apiUrl + 'products/' + id,
>>>>>>> 678e6246e1ec504f40ce546596ce8dd65bb36d8d

  // ProductSpecificationAttributes
  productSpecificationAttributesRetrieve:
    apiUrl + 'productspecificationattributes',
  productSpecificationAttributesAdd: apiUrl + 'productspecificationattributes',
<<<<<<< HEAD
  productSpecificationAttributesCount:
    apiUrl + 'productspecificationattributes/count',
  productSpecificationAttributesRetrieveById: id =>
    `productspecificationattributes/${id}`,
  productSpecificationAttributesUpdate: id =>
    `productspecificationattributes/${id}`,
  productSpecificationAttributesDelete: id =>
    `productspecificationattributes/${id}`,

  // ShoppingCartItems
  shoppingCartItemsRetrieve: 'shopping_cart_items',
  shoppingCartItemsAdd: 'shopping_cart_items',
  shoppingCartItemsRetrieveByCustomer: customerId =>
    `shopping_cart_items/${customerId}`,
  shoppingCartItemsUpdate: id => apiUrl + `shopping_cart_items​/${id}`,
  shoppingCartItemsDelete: id => apiUrl + `shopping_cart_items​/${id}`,
=======
  productSpecificationAttributesCount: apiUrl + 'productspecificationattributes/count',
  productSpecificationAttributesRetrieveById: id => 'productspecificationattributes/' + id,
  productSpecificationAttributesUpdate: id => 'productspecificationattributes/' + id,
  productSpecificationAttributesDelete: id => 'productspecificationattributes/' + id,

  // ShoppingCartItems
  shoppingCartItemsRetrieve:  apiUrl +'shopping_cart_items',
  shoppingCartItemsAdd:  apiUrl +'shopping_cart_items',
  shoppingCartItemsRetrieveByCustomer: customerId => 'shopping_cart_items/' + customerId,
  shoppingCartItemsUpdate: id => apiUrl + 'shopping_cart_items/' + id,
  shoppingCartItemsDelete: id => apiUrl + 'shopping_cart_items/' + id,
>>>>>>> 678e6246e1ec504f40ce546596ce8dd65bb36d8d

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
<<<<<<< HEAD
  getAccessToken: apiUrl + 'getaccesstoken',
};
=======
  getAccessToken: apiUrl + 'getaccesstoken'
}

>>>>>>> 678e6246e1ec504f40ce546596ce8dd65bb36d8d
