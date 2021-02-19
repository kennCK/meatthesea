import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../Style';
import {connect} from 'react-redux';

class PendingPickupScreen extends Component {
    redirect = (route) => {
        this.props.navigation.push(route);
        console.log(route)
    }
    render() {
      const { requestPickUpCrockery } = this.props.state;
        return (
          <ScrollView>
            <View style={styles.MainContainer}>
              <View style={styles.TopContainer}>
                  <Text style={[styles.DescriptionContainer]}>Order number {requestPickUpCrockery.order_id}</Text>
              </View>
              <View style={styles.BottomContainer}>
                <View style={styles.SubtitleContainer}>
                  <TouchableOpacity onPress={() => {
                      this.redirect("returnInPersonStack")
                  }}>
                  
                      <View style={[styles.LogoContainer]}>
                          <Image resizeMode={'cover'} source={require('assets/logo1.png')} style={styles.LogoStyle} />
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                      this.redirect("requestPickupStack")
                  }}>
                    <View style={styles.LogoContainer}>
                        <Image source={require('assets/logo2.png')} style={styles.LogoStyle} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        );
    }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setFilter: filter => dispatch(actions.setFilter(filter)),
    setCart: cart => dispatch(actions.setCart(cart)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingPickupScreen);