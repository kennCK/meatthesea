import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {BasicStyles, Color} from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import TearLines from 'react-native-tear-lines';
import Counter from 'modules/checkout/Counter.js';

const paymentMethods = [
  {
    method: 'Credit Card',
    icon: require('assets/credit-card.png'),
    onPress: () => {},
  },
  {
    method: 'Debit Card',
    icon: require('assets/debit-card.png'),
    onPress: () => {},
  },
  {
    method: 'Paypal',
    icon: require('assets/paypal.png'),
    onPress: () => {},
  },
];

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      orders: [
        {
          item: '6 - pc. Chickenjoy Bucket Meal',
          price: '450.0',
          count: 0,
          image: require('assets/products/deli-frozen.png'),
        },
        {
          item: 'Snack Time Bundle 4 Yumburgers, 4 Fries, 4 Coke',
          price: '720.0',
          count: 0,
          image: require('assets/products/deli-frozen.png'),
        },
        {
          item: '6 - pc. Chickenjoy Bucket Meal',
          price: '450.0',
          count: 0,
          image: require('assets/products/deli-frozen.png'),
        },
        {
          item: 'Snack Time Bundle 4 Yumburgers, 4 Fries, 4 Coke',
          price: '720.0',
          count: 0,
          image: require('assets/products/deli-frozen.png'),
        },
      ],
    };
  }

  handleIncrementAndDecrement = (index, operation) => {
    let orders = [...this.state.orders];
    switch (operation) {
      case 0:
        orders[index].count--;
        break;
      case 1:
        orders[index].count++;
        break;
      default:
        break;
    }
    this.setState({orders: orders});
  };

  renderOrders = () => {
    let orders = this.state.orders;
    let ordersDisplay = [];

    for (var i = 0; i < orders.length; i++) {
      if (i >= 2) {
        break;
      } else {
        ordersDisplay.push(
          <View style={styles.OrderContainer} key={i}>
            <View style={styles.Counter}>
              <Counter
                count={orders[i].count}
                index={i}
                onTap={this.handleIncrementAndDecrement}
              />
              <TouchableOpacity
                style={{alignSelf: 'flex-start', marginLeft: 13}}>
                <FontAwesomeIcon
                  color={Color.primary}
                  icon={faPencilAlt}
                  size={14}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.Order}>
              <Text numberOfLines={1} style={styles.OrderTextStyle}>
                {orders[i].item}
              </Text>
              <Text style={styles.OrderTextStyle}>P{orders[i].price}</Text>
            </View>
            <View style={styles.ItemImage}>
              <Image source={orders[i].image} style={{height: 50, width: 50}} />
            </View>
          </View>,
        );
      }
    }

    return ordersDisplay;
  };

  renderPaymentMethods = () => {
    return paymentMethods.map((method, index) => {
      return (
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          key={index}
          onPress={() => {}}>
          <View style={styles.IconContainer}>
            <Image source={method.icon} style={{height: 50, width: 50}} />
          </View>
          <View style={styles.MethodContainer}>
            <Text style={styles.MethodTextStyle}>{method.method}</Text>
          </View>
          {/**Update total here */}
          <View style={styles.AmountContainer}>
            <Text style={styles.AmountTextStyle}>P1423.67</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <ScrollView>
          <View style={styles.CheckoutContainer}>
            <View style={styles.DeliverToContainer}>
              <Text style={styles.DeliverToTextStyle}>Deliver To</Text>
            </View>
            <View style={styles.AddressContainer}>
              <View style={styles.AddressDetailsContainer}>
                {/*Replace dummy data here*/}
                <Text style={styles.AddressDetailsTextStyle}>
                  Dulce Village, Tabok, Mandaue City
                </Text>
                <Text style={styles.AddressDetailsTextStyle}>
                  Block 7 Lot 42
                </Text>
                <Text style={styles.AddressDetailsTextStyle}>
                  +63 9143058173
                </Text>
                <Text style={styles.AddressNoteTextStyle}>
                  "Among gate color purple"
                </Text>
              </View>
              <TouchableOpacity style={styles.EditContainer} onPres={() => {}}>
                <FontAwesomeIcon
                  color={Color.primary}
                  icon={faPencilAlt}
                  size={15}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{backgroundColor: '#FFFFFF', width: '100%'}}
              onLayout={e => {
                this.refs.bottom.onLayout(e);
              }}>
              <View style={styles.OrderHeader}>
                <View style={styles.YourOrderTextContainer}>
                  <Text style={styles.YourOrderTextStyle}>Your Order</Text>
                </View>
                <TouchableOpacity style={styles.AddMoreItemsContainer}>
                  <Text style={styles.AddMoreItemsTextStyle}>
                    Add more items
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.OrdersContainer}>{this.renderOrders()}</View>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.ShowMoreContainer}>
                <Text style={styles.ShowMoreTextStyle}>
                  Show more ({this.state.orders.length - 2} items)
                </Text>
              </TouchableOpacity>
            </View>
            <TearLines
              isUnder
              ref="bottom"
              color="#CCCCCC"
              backgroundColor="#FFFFFF"
              tearSize={15}
              style={{marginTop: 20}}
            />
            <View style={styles.PaymentDetailsContainer}>
              {/**Update total here */}
              <View style={styles.PaymentDetailContainer}>
                <Text style={styles.PaymentDetailTextStyle}>Subtotal</Text>
                <Text style={styles.PaymentDetailTextStyle}>P1473.42</Text>
              </View>
              {/**Update total here */}
              <View style={styles.PaymentDetailContainer}>
                <Text style={styles.PaymentDetailTextStyle}>Delivery Fee</Text>
                <Text style={styles.PaymentDetailTextStyle}>P49.75</Text>
              </View>
            </View>
            <View style={styles.PaymentDetailsContainer}>
              {/**Update total here */}
              <View style={styles.PaymentDetailContainer}>
                <Text style={styles.PaymentDetailTextStyle}>
                  Total (including VAT)
                </Text>
                <Text style={styles.PaymentDetailTextStyle}>P1423.67</Text>
              </View>
            </View>
            <View style={styles.PaymentMethodsContainer}>
              <View style={styles.PaymentMethodsHeaderContainer}>
                <Text style={styles.PaymentMethodTextStyle}>
                  Payment Methods
                </Text>
                <TouchableOpacity>
                  <Text style={styles.PaymentMethodEditTextStyle}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              {this.renderPaymentMethods()}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => {}} style={styles.ButtonContainer}>
          <View style={styles.ButtonTextContainer}>
            <Text style={styles.ButtonTextStyle}>Place Order</Text>
          </View>
          <View style={styles.ButtonAmountContainer}>
            <Text style={styles.ButtonAmountTextStyle}>P1423.67</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CheckoutContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  DeliverToContainer: {
    paddingLeft: 20,
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.25,
    borderBottomColor: '#F5F5F5',
  },
  DeliverToTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
  },
  AddressContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    borderBottomWidth: 0.25,
    borderBottomColor: '#EBEBEB',
  },
  AddressDetailsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    width: '50%',
    height: '100%',
  },
  AddressDetailsTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
  AddressNoteTextStyle: {
    fontSize: BasicStyles.standardFontSize,
  },
  EditContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '10%',
    height: '100%',
    paddingTop: '5%',
  },
  MapContainer: {
    height: '100%',
    width: '40%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  OrderHeader: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    elevation: 1,
    borderBottomWidth: 0.25,
    borderBottomColor: '#EBEBEB',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  YourOrderTextContainer: {
    paddingLeft: 20,
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  YourOrderTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
  },
  AddMoreItemsContainer: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  AddMoreItemsTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: Color.primary,
  },
  OrdersContainer: {
    height: 160,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  OrderContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  Counter: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Order: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  OrderTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
  ItemImage: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  ShowMoreContainer: {
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 0.25,
    borderTopColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  ShowMoreTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    color: Color.primary,
  },
  PaymentDetailsContainer: {
    width: '100%',
    marginTop: 30,
  },
  PaymentDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  PaymentDetailTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
  PaymentMethodsContainer: {
    width: '100%',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingTop: 20,
    justifyContent: 'center',
  },
  PaymentMethodsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  PaymentMethodTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
  PaymentMethodEditTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    color: Color.primary,
  },
  PaymentMethodContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  IconContainer: {
    width: '20%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  MethodContainer: {
    width: '40%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  MethodTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
  AmountContainer: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  AmountTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
  ButtonContainer: {
    ...BasicStyles.btn,
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: '4%',
    flexDirection: 'row',
  },
  ButtonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingLeft: '16%',
  },
  ButtonTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#FFFFFF',
  },
  ButtonAmountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonAmountTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#FFFFFF',
  },
});
export default Checkout;
