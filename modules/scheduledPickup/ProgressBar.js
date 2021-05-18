import React, {Component} from 'react';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import Dash from '@skyscanner/react-native-dash';
import styles from 'modules/scheduledPickup/Style.js';

class ProgressBar extends Component {
  render() {
    const { status } = this.props
    return (
      <View style={styles.ProgressBarContainer}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          size={35}
          style={{color: '#7ABC87'}}
        />
        <Dash
          dashThickness={3}
          dashColor="#707070"
          style={{
            width: 1,
            height: '20%',
            flexDirection: 'column',
            alignSelf: 'center',
          }}
        />
        <FontAwesomeIcon icon={ status == 'Processing' || status == 'Complete' ? faCheckCircle : faCircle} size={35} style={{color: (status == 'Processing' || status == 'Complete' ? '#7ABC87' : '#CADFEF')}} />
        <Dash
          dashThickness={3}
          dashColor="#707070"
          style={{
            width: 1,
            height: '40%',
            flexDirection: 'column',
            alignSelf: 'center',
          }}
        />
        <FontAwesomeIcon icon={ status == 'Complete' ? faCheckCircle : faCircle} size={35} style={{color: (status == 'Complete' ? '#7ABC87' : '#CADFEF')}} />
      </View>
    );
  }
}

export default ProgressBar;
