import React, { Component } from 'react'
import { Tooltip, Text } from 'react-native-elements';
import { View, TouchableOpacity, Linking } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { Color, BasicStyles } from 'common';
import Config from 'src/config'
import Alert from 'modules/generic/alert';

class Whatsapp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hide: false,
      isError: false,
      alertText: ''
    }
  }
  openWhatsApp = () => {
    let link = `whatsapp://send?text=&phone=${Config.whats_app_number}`
    if(link) {
      Linking.canOpenURL(link)
       .then(supported => {
         if (!supported) {
          this.setState({alertText: 'Please install whats app to send direct message via whatsapp', isError: true})
        } else {
          return Linking.openURL(link);
        }
      })
      .catch(err => console.error('An error occurred', err));
    } else {
      console.log('sendWhatsAppMessage -----> ', 'message link is undefined');
    }
  }
  Tooltip = () => {
    return (
      <View
        style={{
          height: 200,
          width: 330,
          position: 'relative'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: Color.primary,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 20
          }}
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            size={20}
            style={{
              color: Color.white
            }}
          />
          <Text
            style={{
              color: Color.white
            }}
          >WhatsApp</Text>
        </View>
        <View
          style={{
            padding: 20,
            borderWidth: 1,
            borderColor: Color.lightGray,
            width: '90%',
            marginLeft: 10,
            marginTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 20
          }}
        >
          <Text>Hello, how can we help you?</Text>
        </View>
        <TouchableOpacity
          onPress={this.openWhatsApp}
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 15,
              borderRadius: 50,
              backgroundColor: Color.primary
            }}
          >
            <Text
              style={{
                color: Color.white
              }}
            >Open chat</Text>
            <FontAwesomeIcon
              icon={faWhatsapp}
              size={20}
              style={{
                color: Color.white,
                marginLeft: 20
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 80,
          right: 10,
          flex: 1
        }}
      >
        <Tooltip
          height={200}
          width={330}
          closeOnlyOnBackdropPress={true}
          withOverlay={false}
          pointerColor={Color.white}
          popover={
            this.Tooltip()
          }
          onOpen={() => {
            this.setState({ hide: true })
          }}
          onClose={() => {
            this.setState({ hide: false })
          }}
          containerStyle={{
            backgroundColor: Color.white,
            position: 'absolute',
            bottom: this.state.hide ? 50 : 80,
            right: this.state.hide ? 0 : 10,
          }}
        >
          <View>
            {!this.state.hide &&
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: Color.primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50
                }}
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size={35}
                  style={{
                    color: Color.white,
                  }} />
              </View>
            }
          </View>
        </Tooltip>
        {this.state.hide &&
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Color.primary,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              position: 'absolute',
              bottom: 30,
              right: 3
            }}
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              size={35}
              style={{
                color: Color.white
              }} />
          </View>
        }
        <Alert
          show={this.state.isError}
          text={this.state.alertText}
          onClick={() => this.setState({ isError: false })}
          alertType={'error'}
        />
      </View>
    )
  }
}

export default Whatsapp;