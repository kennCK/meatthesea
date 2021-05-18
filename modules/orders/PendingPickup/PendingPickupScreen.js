import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../Style';
import {connect} from 'react-redux';
const height = Math.round(Dimensions.get('window').height);
class PendingPickupScreen extends Component {
    redirect = (route) => {
        this.props.navigation.push(route);
        console.log(route)
    }
    render() {
      const { requestPickUpCrockery } = this.props.state;
        return (
          <ScrollView 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            {
              height: '100%'
            }
          ]}>
            <View style={[styles.MainContainer, { 
              height: height - (styles.TopContainer.height + 30),
              flexDirection: 'column',
              alignItems: 'center'
            }]}>
              <View style={styles.TopContainer}>
                  <Text style={[styles.DescriptionContainer]}>Order number {requestPickUpCrockery.order_id}</Text>
              </View>
              <View style={[styles.BottomContainer, {
                height: '100%'
              }]}>
                <View style={[
                  styles.SubtitleContainer,
                  {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: "center",
                    height: height - (styles.TopContainer.height + 30),
                    paddingBottom: 60
                  }
                ]}>
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