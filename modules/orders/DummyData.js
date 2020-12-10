
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faClock } from '@fortawesome/free-regular-svg-icons';
const dummyData = [
    {
        id: 1,
        store: "RESTAURANT MENU ITEMS",
        items: [
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,
                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            },
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,
                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            }
        ],
    },
    {
        id: 2,
        store: "DELI-SHOP ITEMS",
        items: [
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,

                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            },
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,

                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            }
        ],
    },
    {
        id: 3,
        store: "DELI-SHOP ITEMS",
        items: [
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,
                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            },
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,
                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            }
        ],
    },
    {
        id: 4,
        store: "DELI-SHOP ITEMS",
        items: [
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,
                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            },
            {
                item: 'Item name',
                price: 'HK$ XX',
                quantity: 1,
                addOns: [
                    {
                        item: 'Side Dish',
                        price: 'HK$ XX'
                    },
                    {
                        item: 'Less Salt'
                    }
                ]
            }
        ],
    },
]

const OrderDetails = [
    {
        key: 'Subtotal',
        value: 'HK$ XX'
    },
    {
        key: 'Delivery Fee',
        value: 'HK$ XX'
    },
    {
        key: 'Total',
        value: 'HK$ XX',
    },
]

const deliveryDetails = [
    {
        icon: faMapMarkerAlt,
        title: '1A, 1 Main Street, Hong Kong'
    },
    {
        icon: faCreditCard,
        title: 'Payment Method: Credit Card ending 1234'
    },
    {
        icon: faClock,
        title: 'Delivery time: ASAP'
    },
]
export { dummyData, OrderDetails, deliveryDetails };