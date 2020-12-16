import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import {Spinner} from 'components';

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
          apiRequest: this.setNewsletterSubscription,
          deactivate: this.deactivateNewsletterSubscription,
        },
      ],

      isLoading: false,
    };
  }

  selectHandler = index => {
    let newData = this.state.data;
    newData[index].isSelected = !newData[index].isSelected;
    this.setState({data: newData});
  };

  setNewsletterSubscription = () => {
    this.setState({isLoading: true});
    Api.getRequest(
      Routes.newsLetterSubscriptionRetrieve,
      response => {
        console.log('News letter response', response);
        this.setState({isLoading: false});
      },
      error => {
        console.log('News letter response error', error);
        this.setState({isLoading: false});
      },
    );
  };

  deactivateNewsletterSubscription = () => {
    const {user} = this.props.state;
    Api.postRequest(
      Routes.newsLetterSubscriptionDeactivate(user.email),
      response => {
        console.log('News letter deactivate response', response);
        this.setState({isLoading: false});
      },
      error => {
        console.log('News letter deactivate response error', error);
        this.setState({isLoading: false});
      },
    );
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
          subscribe={setting.apiRequest}
          deactivate={setting.deactivate}
        />
      );
    });
  };

  render() {
    return (
      <View>
        {this.displaySettings()}
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
      </View>
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
)(Settings);
