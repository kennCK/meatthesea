import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from 'modules/scheduledPickup/Style.js';
class Schedule extends Component {
  render() {
    return (
      <View style={styles.ScheduleContainer}>
        <View style={styles.PickupRequestContainer}>
          <Text style={styles.PickupStatusStyle}>Pick-up requested from:</Text>
          {/*props here */}
          <Text style={styles.LocationTypeStyle}>home</Text>
          {/*props here */}
          <Text style={styles.LocationStyle}>1a, Centre Stage Tower 1</Text>
        </View>
        <View style={styles.PickupConfirmedContainer}>
          <Text style={styles.PickupStatusStyle}>Pick-up confirmed</Text>
          <Text style={styles.PickupInstructionsStyle}>
            Place the crockery in the Meat the Sea delivery bag and leave it on
            your doorstep. Our colleagues will pick it up right away!
          </Text>
        </View>
        <View style={[styles.PickupCompleteContainer]}>
          <Text style={styles.PickupStatusStyle}>Pick-up completed</Text>
        </View>
      </View>
    );
  }
}

export default Schedule;
