import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {Color, BasicStyles} from 'common';
import {TouchableOpacity} from 'react-native-gesture-handler';
const height = Math.round(Dimensions.get('window').height);
export default class PaymentFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {cardData: {valid: false}};
  }
  render() {
    const {onSubmit, submitted, error} = this.props;
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <View style={{height: '100%', width: '100%'}}>
          <View style={{width: '100%', justifyContent: 'center'}}>
            <CreditCardInput
              requiresName
              onChange={cardData => this.setState({cardData})}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              disabled={!this.state.cardData.valid || submitted}
              style={[BasicStyles.btn, {color: Color.primary}]}
              onPress={() => onSubmit(this.state.cardData)}>
              <Text
                style={{
                  fontSize: BasicStyles.titleText.fontSize,
                  color: '#FFFFFF',
                }}>
                Subscribe
              </Text>
            </TouchableOpacity>
            {/* Show errors */}
            {error && (
              <View style={styles.alertWrapper}>
                <View style={styles.alertIconWrapper}>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    size={20}
                    style={{color: '#c22'}}
                  />
                </View>
                <View style={styles.alertTextWrapper}>
                  <Text style={styles.alertText}>{error}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
    paddingLeft: '4.5%',
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400',
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
});
