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
import {connect} from 'react-redux';

const paymentMethods = [
  {
    method: 'Credit Card',
    icon: require('assets/credit-card.png'),
    onPress: '',
  },
  {
    method: 'Debit Card',
    icon: require('assets/debit-card.png'),
    onPress: '',
  },
  {
    method: 'Paypal',
    icon: require('assets/paypal.png'),
    onPress: 'papalPaymentStack',
  },
];

class AddPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  navigate = (route) => {
    console.log('======== i n i t i a l i z i n g n a v i g a t i o n ==========')
    this.props.navigation.navigate(route)
  }

  renderCards = () => {
    return paymentMethods.map((method, index) => {
      return (
        <TouchableOpacity
          style={styles.PaymentMethodContainer}
          key={index}
          onPress={() => this.navigate(method.onPress)}>
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

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentMethod);

// export default AddPaymentMethod;
