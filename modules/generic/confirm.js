import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import { BasicStyles, Color } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const width = Math.round(Dimensions.get('window').width);

class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: {
        primary: 'rgba(0, 100, 177,.9)',
      },
      buttonColor: {
        primary: '#0785e6'
      },
      icon: {
        primary: faExclamationTriangle
      }
    }
  }

  render = () => {
    const { show, text, onCancel, onSuccess } = this.props;
    const alertType = 'primary'
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
            paddingBottom: 45,
            width: 250,
            minHeight: 160,
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
              style={{
                minHeight: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
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
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  paddingBottom: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopWidth: 1,
                  borderTopColor: this.state.background[alertType.toLowerCase()]
                }
              }
            >
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={Color.lightGray}
                style={
                  [
                    {
                      height: 45,
                      backgroundColor: 'white',
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomLeftRadius: 20,
                      borderColor: Color.lightGray,
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
                onPress={onCancel}
              >
                <Text style={{
                  color: this.state.background[alertType.toLowerCase()]
                }}>No</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={Color.lightGray}
                style={
                  [
                    {
                      height: 45,
                      backgroundColor: 'white',
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomRightRadius: 20,
                      borderColor: Color.lightGray,
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
                onPress={onSuccess}
              >
                <Text style={{
                  color: this.state.background[alertType.toLowerCase()]
                }}>Yes</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default Alert;