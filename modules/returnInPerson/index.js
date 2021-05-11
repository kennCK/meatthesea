import React, {Component} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';
import styles from './Style';
import {Routes} from 'common';
import {Spinner} from 'components';
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
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      store_schedules: []
    }
  }
  convertTo12Hour = time => {
    var ts = time;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? '0' + h : h;
    ts = h + ts.substr(2, 3);
    return ts;
  };

  async componentDidMount() {
    await this.retrieveStores();
    const { returnInPerson } = this.props.state;
    await this.collectCrockery();
  }

  retrieveStores = () => {
    this.setState({isLoading: true});
    Api.getRequest(Routes.storeRetrieveAll, response => {
      console.log(response)
      const {storeLocation} = this.props.state
      if(response != null) {
        if(response.stores.length > 0) {
          response.stores.forEach(el => {
            if(storeLocation.id == el.id){
              this.setState({store_schedules: el.store_schedules})
            } 
          })
        }
      }
      this.setState({isLoading: false});
    }, error => {
      console.log('retrieve stores error: ', error)
    })
  }

  displaySchedule = () => {
    const schedule = this.state.store_schedules;
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

  collectCrockery = () => {
    const { requestPickUpCrockery } = this.props.state;
    this.setState({isLoading: true});
    Api.putRequest(Routes.crockeryUpdate(requestPickUpCrockery.id, requestPickUpCrockery.address_id, 30), {}, response => {
      console.log('RETURN CROCKERY RESPONSE: ', response)
      this.setState({isLoading: false});
    }, error => {
      console.log('RETURN CROCKERY ERROR: ', error)
    })
  }

  render() {
    const {isLoading} = this.state
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
        {isLoading ? <Spinner mode="overlay"/> : null }
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
