import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles, Routes } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from '../components/Separator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import Api from 'services/apiv2/index.js';
import moment from 'moment';

class RequestPickup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addresses: [],
      valid: false
    }
  }

  componentDidMount() {
    this.retrieveAddresses();
  }

  retrieveAddresses = () => {
    const { user } = this.props.state
    Api.getRequest(Routes.customerRetrieveAddresses(user.id), response => {
      this.setState({addresses: response.address})
    }, error => {
      console.log("PICKUP CROCKERY RETRIEVE ADDRESS ERROR: ", error)
    })
  }

  redirect = (route) => {
    this.props.navigation.push(route);
  }

  toggleSelect = (id) => {
    this.setState({
      valid: true,
      addresses: this.state.addresses.filter((el, ndx) => {
        el['selected'] = ndx === id ? true : false
        return el
      })
    });
  }

  collectCrockery = () => {
    const { requestPickUpCrockery } = this.props.state;
    let time = moment().format('HH : mm')
    Api.putRequest(Routes.crockeryUpdate(requestPickUpCrockery.id, requestPickUpCrockery.address_id, 20, time), {}, response => {
      this.props.navigation.navigate('scheduledPickupStack', {id: requestPickUpCrockery.order_id})
    }, error => {
      console.log('UPDATING CROCKERY ERROR: ', error)
    })
  }
  render() {
    let { addresses } = this.state
    const { requestPickUpCrockery } = this.props.state;
    return (
      <View style={{ flex: 1 }} >
        <View style={styles.MainContainer}>
          <View style={styles.TopContainer}>
            <Text style={[styles.DescriptionContainer]}>Order number {requestPickUpCrockery.order_id}</Text>
          </View>
          <Separator />
        </View>
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.OrderHistoryListContainer, { flexGrow: 1 }]}>
            <View style={{ backgroundColor: Color.lightGray, height: 50, justifyContent: 'center' }}>
              <Text style={[
                BasicStyles.titleText,
                Style.fontWeight('bold'),
                Style.fontSize(18)
              ]}>Choose pickup address</Text>
            </View>
            <View style={{ marginVertical: 10}} >
              <RadioForm
                animation={true}
              >
                {/* To create radio buttons, loop through your array of options */}
                {
                  addresses.map((obj, i) => (
                    <RadioButton 
                      labelHorizontal={true} key={i}
                      style={
                        {
                          alignItems: 'center'
                        }
                      }
                    >
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={obj.selected}
                        onPress={() => {
                          this.toggleSelect(i)
                        }}
                        borderWidth={1}
                        buttonInnerColor={Color.primary}
                        buttonOuterColor={Color.primary}
                        buttonSize={10}
                        buttonOuterSize={15}
                        buttonStyle={{}}
                        buttonWrapStyle={{ marginLeft: 10, marginRight: 10, marginTop: 15, }}
                      />
                      <View
                        style={
                          {
                            width: '100%'
                          }
                        }
                      >
                        <TouchableHighlight 
                          underlayColor={Color.white}
                          style={
                            {
                              paddingLeft: 10,
                              paddingRight: 25,
                              marginTop: 7
                            }
                          }
                          onPress={() => {
                            this.toggleSelect(i)
                          }
                        }>
                          <>
                            <Text style={
                              [
                                Style.fontWeight('bold'),
                                {
                                  fontSize: BasicStyles.standardFontSize
                                }
                              ]
                            }>{obj.address_name}</Text>
                            <Text
                              style={
                                {
                                  fontSize: BasicStyles.standardFontSize
                                }
                              }
                            >{obj.address1}</Text>
                          </>
                        </TouchableHighlight>
                      </View>
                    </RadioButton>
                  ))
                }
              </RadioForm>
            </View>
            <Separator />
            <View style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              flexGrow: 1,
              width: Style.getWidth() - 100
            }}>
              <Text style={{
                color: Color.primary,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 18
              }}>
                Place the crockery in the Meat the Sea delivery bag and leave it on
                your doorstep. Our colleagues will pick it up right away!
              </Text>
            </View>
          </View>
          <Separator />
          <View style={styles.MainContainer}>
            <TouchableHighlight
              style={[BasicStyles.btn, Style.btnPrimary, { borderRadius: 0, width: Style.getWidth() - 30 }]}
              underlayColor={Color.gray}
              onPress={() => this.collectCrockery()}
              disabled={!this.state.valid}
            >
              <Text style={[{ color: Color.tertiary }, Style.fontWeight('bold'), Style.fontSize(18)]}>
                COLLECT CROCKERY
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestPickup);
