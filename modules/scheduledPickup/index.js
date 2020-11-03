import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Schedule from 'modules/scheduledPickup/Schedule.js';
import ProgressBar from 'modules/scheduledPickup/ProgressBar.js';
import styles from 'modules/scheduledPickup/Style.js';

class ScheduledPickup extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.OrderNumberContainer}>
          <Text style={styles.OrderNumberStyle}>Order Number 1234</Text>
        </View>

        <View style={styles.ScheduleDetailsContainer}>
          <ProgressBar />
          <Schedule />
        </View>
      </View>
    );
  }
}

export default ScheduledPickup;
