import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from 'modules/scheduledPickup/Style.js';
class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.ScheduleContainer}>
        <View style={styles.PickupRequestContainer}>
          <Text style={styles.PickupStatusStyle}>Pick-up requested from:</Text>
          {/*props here */}
          <Text style={styles.LocationTypeStyle}>home</Text>
          {/*props here */}
          <View style={styles.LocationContainer}>
            <Text
              style={styles.LocationStyle}
              numberOfLines={3}
              ellipsizeMode="tail">
              {this.props.address}
            </Text>
          </View>
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
