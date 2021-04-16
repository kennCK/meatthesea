import React, {Component} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import styles from './Style';

let dayOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursdsay',
  'Friday',
  'Saturday',
  'Sunday',
];

class ReturnInPerson extends Component {
  convertTo12Hour = time => {
    var ts = time;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? '0' + h : h;
    ts = h + ts.substr(2, 3);
    return ts;
  };

  componentDidMount() {
    const { returnInPerson } = this.props.state;
    console.log('testing, ', returnInPerson)
  }

  displaySchedule = () => {
    const schedule = this.props.state.storeLocation.store_schedules;
    return schedule.map(day => {
      let startTime = this.convertTo12Hour(day.start_time.substring(0, 5));
      let endTime = this.convertTo12Hour(day.end_time.substring(0, 5));
      return (
        <View style={styles.ScheduleContainer} key={day.id}>
          <Text style={styles.ScheduleText}>{dayOfWeek[day.day_of_week]}</Text>
          <Text style={styles.ScheduleText}>
            {startTime} - {endTime}
          </Text>
        </View>
      );
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.MainContainer}>
          <ScrollView>
            <View style={styles.TopContainer}>
              <View style={styles.TextContainer}>
                <Text style={styles.DescriptionContainer}>
                  You are welcome to return the crockery in person at your local
                  Meat the Sea outlet.
                </Text>
              </View>
              <View style={styles.TextContainer}>
                <Text style={styles.DescriptionContainer}>
                  Just quote the order number to our colleague and you're good
                  to go!
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReturnInPerson);
