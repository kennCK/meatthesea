import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {BasicStyles, Color} from 'common';
class Counter extends Component {
  render() {
    return (
      <View style={styles.CounterContainer}>
        <TouchableOpacity
          style={styles.IncrementContainer}
          onPress={() => {
            this.props.onTap(this.props.index, 0);
          }}>
          <FontAwesomeIcon color={Color.primary} icon={faMinus} size={14} />
        </TouchableOpacity>
        <View style={styles.CountContainer}>
          <Text style={styles.CountTextStyle}>{this.props.count}</Text>
        </View>
        <TouchableOpacity
          style={styles.DecrementContainer}
          onPress={() => {
            this.props.onTap(this.props.index, 1);
          }}>
          <FontAwesomeIcon color={Color.primary} icon={faPlus} size={14} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CounterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: '15%',
  },
  IncrementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  DecrementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CountTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    fontWeight: 'bold',
  },
});

export default Counter;
