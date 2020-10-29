import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import styles from './Style';

let daysSample = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

class ReturnInPerson extends Component {
  displaySchedule = () => {
    return daysSample.map(day => {
      return (
        <View style={styles.ScheduleContainer}>
          <Text style={styles.ScheduleText}>{day}</Text>
          <Text style={styles.ScheduleText}>07:00 - 00: 00</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.MainContainer}>
          <View style={styles.TopContainer}>
            <View style={styles.TextContainer}>
              <Text style={styles.DescriptionContainer}>
                You are welcome to return the crockery in person at your local
                Meat the Sea outlet.
              </Text>
            </View>
            <View style={styles.TextContainer}>
              <Text style={styles.DescriptionContainer}>
                Just quote the order number to our colleague and you're good to
                go!
              </Text>
            </View>
          </View>
          <View style={styles.BottomContainer}>
            <View style={styles.SubtitleContainer}>
              <Text style={styles.SubtitleTextStyle}>
                Meat the Sea - 88 Queen's Rd W opening hours
              </Text>
            </View>
            {this.displaySchedule()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ReturnInPerson;
