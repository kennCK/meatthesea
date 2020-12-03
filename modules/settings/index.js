import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import SettingsCard from 'modules/settings/SettingsCard.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTile: 0,
      data: [
        {
          setting: 'Send me newsletters and offers',
          isSelected: false,
        },
      ],
    };
  }

  selectHandler = index => {
    let newData = this.state.data;
    newData[index].isSelected = !newData[index].isSelected;
    this.setState({data: newData});
  };

  displaySettings = () => {
    const settingsList = this.state.data;
    return settingsList.map((setting, index) => {
      return (
        <SettingsCard
          key={index}
          setting={setting.setting}
          id={index}
          selectedTile={setting.isSelected}
          onSelect={this.selectHandler}
        />
      );
    });
  };

  render() {
    return <View>{this.displaySettings()}</View>;
  }
}

const styles = StyleSheet.create({});

export default Settings;
