import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AddSubscriptionView from 'modules/addSubscription/AddSubscriptionView.js';
class AddSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
    };
  }

  subscribe = () => {};

  render() {
    return (
      <AddSubscriptionView
        error={this.state.error}
        submitted={this.state.submitted}
        onSubmit={this.subscribe}
      />
    );
  }
}

export default AddSubscription;
