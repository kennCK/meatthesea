import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Style from './Style';
import { Helper, BasicStyles, Color } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  render() {
    const mode = this.props.params
    return (
      <View>
        {
          mode !== 'Register' &&
          <View style={Style.LogoContainer}>
            <Image source={require('assets/logo.png')} style={Style.LogoSize} />
          </View>
        }
        {mode !== 'JoinWaitList' ?
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <FontAwesomeIcon icon={faUserCircle} size={mode !== 'Register' ? 45 : 90} style={[Style.headerIconStyle, {
              color: Color.white
            }]} />
          </View>
          :
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20


          }}>
            <Text style={[{
              paddingTop: 20,
              paddingBottom: 20,
              paddingHorizontal: 11,
              textAlign: 'center',
              color: Color.white,
              width: Style.getWidth() - 120
            }, Style.fontSize(16)]}>
              We are working on expanding our delivery services. Join our waitlist and be the first to know!</Text>
          </View>
        }
      </View>
    );
  }
}