import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import SettingsCard from 'modules/settings/SettingsCard.js';

const dummyData = [
  'Allow app push notification',
  'Send me newsletters and offers',
];

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: 0,
    };
  }

  selectHandler = index => {
    this.setState({selectedTile: index});
  };
  render() {
    return (
      <View>
        {dummyData.map((data, index) => {
          return (
            <SettingsCard
              key={index}
              setting={data}
              id={index}
              selectedTile={index === this.state.selectedTile ? true : false}
              onSelect={this.selectHandler}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Settings;
