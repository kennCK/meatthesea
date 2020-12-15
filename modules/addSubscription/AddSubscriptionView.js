import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
/**
 * The class renders a view with PaymentFormView
 */
export default class AddSubscriptionView extends Component {
  render() {
    return (
      <View style={styles.MainContainer}>
        <ScrollView
          style={styles.container}
          ref={ref => (this.scrollViewRef = ref)}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <PaymentFormView {...this.props} />
          </View>
        </ScrollView>
        {/* Scrolls to the payment form */}
        <KeyboardSpacer
          onToggle={() => {
            setTimeout(
              () => this.scrollViewRef.scrollToEnd({animated: true}),
              0,
            );
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    width: '95%',
    alignItems: 'center',
    marginTop: 35,
  },
  container: {
    height: '100%',
  },
  textWrapper: {
    margin: 10,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10,
  },
});
