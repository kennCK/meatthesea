import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Text, View, Modal, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import {Color, BasicStyles} from 'common';
const width = Math.round(Dimensions.get('window').width);
class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const{isVisible, onAdd, onClose, addressName, postalCode, handleCode, handleName, address} = this.props
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={Color.lightGray}
            style={{
              borderWidth: 1,
              paddingTop: 0,
              borderColor: Color.lightGray,
              borderRadius: 20,
              position: 'absolute',
              top: 20,
              right: 10
            }}
            onPress={onClose}
          >
            <Text
              style={[
                {
                  color: Color.white,
                  fontSize: BasicStyles.standardFontSize + 15,
                  lineHeight: 21,
                  marginBottom: -10,
                  paddingTop: 7.5,
                  paddingBottom: 7.5,
                  paddingRight: 6,
                  paddingLeft: 6
                }
              ]}
            >&times;</Text>
          </TouchableHighlight>
          <View style={{
            margin: 20,
            backgroundColor: Color.white,
            borderRadius: 20,
            padding: 20,
            width: width - 20,
            minHeight: 260,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <Text style={
              [
                {
                  textAlign: "left",
                  alignItems: 'center',
                  marginTop: 5,
                  color: Color.primaryDark
                },
                {
                  fontWeight: 'bold',
                  marginTop: 0
                }
              ]
            }>Address Name: </Text>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <TextInput
                style={
                  [
                    {
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1
                    },
                    {
                      height: 40,
                      borderColor: Color.gray,
                      borderWidth: 1,
                      paddingLeft: 10,
                      marginBottom: 5,
                      borderRadius: 5,
                      color: Color.darkGray
                    }
                  ]
                }
                onChangeText={handleName}
                value={addressName}
              />
            </View>
            <Text style={
              [
                {
                  textAlign: "left",
                  alignItems: 'center',
                  marginTop: 5,
                  color: Color.primaryDark
                },
                {
                  fontWeight: 'bold',
                  marginTop: 0
                }
              ]
            }>Postal Code: </Text>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <TextInput
                style={
                  [
                    {
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1
                    },
                    {
                      height: 40,
                      borderColor: Color.gray,
                      borderWidth: 1,
                      paddingLeft: 10,
                      marginBottom: 5,
                      borderRadius: 5,
                      color: Color.darkGray
                    }
                  ]
                }
                onChangeText={handleCode}
                value={postalCode}
              />
            </View>
            <Text style={
              [
                {
                  fontWeight: 'bold',
                  textAlign: 'left'
                },
                {
                  textAlign: "left",
                  alignItems: 'center',
                  marginTop: 5,
                  color: Color.primaryDark
                }
              ]
            }> Address: </Text>
            <Text style={
              [
                {
                  textAlign: "left",
                  alignItems: 'center',
                  marginTop: 5,
                  color: Color.primaryDark
                },
                {
                  color: Color.darkGray
                }
              ]
            }>{address}</Text>
            <View
              style={
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            >
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={Color.lightGray}
                disabled={addressName === '' || postalCode === ''}
                // style={{ 
                //   ...Style.openButton, backgroundColor: Color.primaryDark }}
                style={
                  [
                    BasicStyles.btn,
                    {
                      height: 50,
                      backgroundColor: Color.white,
                      width: width - 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 25,
                      borderColor: Color.primaryDark,
                      borderWidth: 2
                    },
                    {
                      marginTop: 20
                    }
                  ]
                }
                onPress={onAdd}
              >
                <Text style={{
                  color: Color.primaryDark,
                  fontWeight: "bold",
                  textAlign: "center"
                }}>Add</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    )
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
)(AddressModal);
