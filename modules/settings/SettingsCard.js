import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
// import styles from './Styles';

class SettingsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.SettingsCardContainer}
        onPress={() => {
          this.props.onSelect(this.props.id);
          if (this.props.selectedTile === false) {
            this.props.subscribe();
          } else {
            this.props.deactivate();
          }
        }}>
        <View
          style={[
            {
              height: 18,
              width: 18,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#2C80BF',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          {this.props.selectedTile && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#2C80BF',
              }}
            />
          )}
        </View>
        <View style={styles.SettingTextContainer}>
          <Text style={styles.SettingTextStyle}>{this.props.setting}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  SettingsCardContainer: {
    paddingHorizontal: '5%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0FAFF',
    borderWidth: 0.75,
    borderColor: '#F3F3F3',
  },
  SettingTextContainer: {
    justifyContent: 'center',
    paddingLeft: '3%',
  },
  SettingTextStyle: {
    fontSize: 15,
  },
});

export default SettingsCard;
