import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles, Color} from 'common';
class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.CounterContainer}>
        <TouchableOpacity
          style={styles.DecrementContainer}
          onPress={() => {
            this.props.decrement();
          }}>
          <FontAwesomeIcon
            icon={faMinus}
            style={{
              color: Color.primary,
            }}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles.CountContainer}>
          <Text style={styles.CountTextStyle}>{this.props.count}</Text>
        </View>
        <TouchableOpacity
          style={styles.IncrementContainer}
          onPress={() => {
            this.props.increment();
          }}>
          <FontAwesomeIcon
            icon={faPlus}
            style={{
              color: Color.primary,
            }}
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
  },
  DecrementContainer: {
    width: '33%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IncrementContainer: {
    width: '33%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CountContainer: {
    width: '33%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CountTextStyle: {
    textAlign: 'center',
    fontSize: 20,
  },
});
export default Counter;
