import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import InputContainer from 'modules/addPaymentMethod/InputContainer';
import {BasicStyles} from 'common';
import styles from 'modules/addPaymentMethod/Styles.js';
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

class AddPaymentMethod extends Component {
  renderCards = () => {
    return paymentMethods.map((method, index) => {
      return (
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          key={index}
          onPress={method.onPress}>
          <Image source={method.icon} style={{height: 50, width: 50}} />
          <Text>{method.method}</Text>
        </TouchableOpacity>
      );
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.MainContainer}>
          <View style={styles.AddPaymentMethodContainer}>
            <View style={styles.PaymentMethodsContainer}>
              {this.renderCards()}
            </View>

            <View style={styles.FormContainer}>
              <InputContainer
                inputName="Card Number"
                style={{width: '90%'}}
                defaultValue="0000 0000 0000 000"
              />
              <View style={styles.RowContainer}>
                <View style={{width: '50%'}}>
                  <InputContainer
                    inputName="Expiration Date"
                    style={{width: '80%'}}
                    defaultValue="06/23"
                  />
                </View>
                <View style={{width: '50%'}}>
                  <InputContainer
                    inputName="CVV"
                    style={{width: '80%'}}
                    defaultValue="000"
                  />
                </View>
              </View>
              <InputContainer
                inputName="Card Holder Name"
                style={{width: '90%'}}
                defaultValue="XXXXXXXXXXXX"
              />
              <InputContainer
                inputName="Address"
                style={{width: '90%'}}
                defaultValue="XXXXXXXXX"
              />
            </View>
            <TouchableOpacity
              style={[BasicStyles.btn, {marginTop: 20, width: '100%'}]}
              onPress={() => {}}>
              <Text style={styles.AddPaymentButtonTextStyle}>Add Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AddPaymentMethod;
