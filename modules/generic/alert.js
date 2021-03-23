import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import { BasicStyles, Color } from 'common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

const width = Math.round(Dimensions.get('window').width);

class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: {
        primary: 'rgba(0, 100, 177,.9)',
        error: 'rgba(252, 24, 8,.9)',
        success: 'rgba(52, 191, 69,.9)'
      },
      buttonColor: {
        error: '#f5392c',
        success: '#56d666',
        primary: '#0785e6'
      },
      icon: {
        error: faTimes,
        success: faCheck,
        primary: faCheck
      }
    }
  }

  render = () => {
    const {alertType, show, text, onClick} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        style={{
          padding: 0,
          width: '100%',
          margin: 0
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: "center",
          width: '100%'
        }}>
          <View style={{
            margin: 50,
            backgroundColor: Color.white,
            borderRadius: 20,
            paddingBottom: 80,
            paddingTop: 100,
            width: 250,
            minHeight: 200,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View
              style={
                {
                  position: 'absolute',
                  top: 0,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  height: 100,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }
            >
              <View
                style={{
                  backgroundColor: this.state.background[alertType.toLowerCase()],
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <FontAwesomeIcon
                  icon={this.state.icon[alertType.toLowerCase()]}
                  size={25}
                  style={{
                    color: 'white'
                  }}
                />
              </View>
            </View>
            <View
              style={{
                minHeight: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{
                textAlign: "center",
                alignItems: 'center',
                fontSize: 14,
                color: Color.darkGray
              }}>{text}</Text>
            </View>
            <View
              style={
                {
                  width: 100,
                  position: 'absolute',
                  bottom: 20,
                  paddingBottom: 0
                }
              }
            >
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={this.state.background[alertType.toLowerCase()]}
                style={
                  [
                    {
                      height: 35,
                      backgroundColor: this.state.buttonColor[alertType.toLowerCase()],
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      borderColor: 'white',
                      borderWidth: 1,
                      color: 'white',
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }
                  ]
                }
                onPress={onClick}
              >
                <Text style={{
                  color: 'white'
                }}>Ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default Alert;