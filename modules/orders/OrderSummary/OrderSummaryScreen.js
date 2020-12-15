import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import OrderItems from './OrderItems';
import Separator from '../components/Separator';
import DeliveryDetails from '../components/DeliveryDetails';
import { OrderDetails, dummyData, deliveryDetails } from "../DummyData";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker'
import {connect} from 'react-redux';

class OrderSummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selectedTime: '',
      hour: '',
      mins: ''
    };
  }

  componentDidMount(){
    this.updateTotal()
  }

  updateTotal(){
    const { cart } = this.props.state;
    let total = 0
    for (var i = 0; i < cart && cart.length; i++) {
      let item = cart[i]
      total += (parseInt(item.quantity) * parseFloat(item.product.price))
      if(i == cart.length - 1){
        const { setOrderDetails } = this.props;
        setOrderDetails({
          total: total,
          subtotal: total,
          tip: 0
        })
      }
    }
  }
  
  redirect = (route) => {
    this.props.navigation.push(route);
  }
  toggleModal = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible })
  }
  render() {
    const { cart, orderDetails } = this.props.state;
    return (
      <View style={{ flex: 1 }} >
        <Modal visible={this.state.isVisible} >
          <View style={{ flex: 1, backgroundColor: Color.primary }}>
          <TouchableOpacity
              style={[{ marginTop: 40, marginLeft: 20 }]} onPress={this.toggleModal}>
              <FontAwesomeIcon icon={faTimesCircle} style={{
                  color: Color.gray
              }} size={BasicStyles.iconSize} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: Color.primary,
                alignItems: "center",
            }}>

              <View style={{
                  backgroundColor: Color.white,
                  borderRadius: 10,
                  padding: 35,
                  width: Style.getWidth() - 100,
                  alignItems: "center",
              }}>
                <Text style={[Style.fontSize(BasicStyles.standardFontSize), { textAlign: 'center', color: Color.darkGray }]}>Available delivery slots from :</Text>
                <DatePicker
                    mode='time'
                    date={new Date()}
                    is24hourSource="locale"
                    minuteInterval={15}
                    onDateChange={(e) => {
                        this.setState({ hour: e.getHours() })
                        this.setState({ mins: e.getMinutes() })
                    }}
                />
                <View style={{ marginTop: 40 }}>
                  <TouchableOpacity style={{
                    backgroundColor: Color.secondary,
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    borderRadius: 10
                  }}
                    onPress={() => {
                        const { hour, mins } = this.state
                        this.setState({ selectedTime: `${hour}:${mins}` })
                        this.toggleModal()
                    }}
                  >
                    <Text style={[Style.fontSize(BasicStyles.standardFontSize), Style.fontWeight('bold')]}>GO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.HeaderContainer}>
          {/* */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={[Style.fontSize(BasicStyles.standardFontSize)]}>Delivery time : </Text>
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={[Style.fontSize(BasicStyles.standardFontSize), Style.fontWeight('bold'), { color: Color.primary, borderBottomColor: Color.darkGray }]}>As soon as possible
                <TouchableOpacity style={[{ flex: 0 }]} onPress={this.toggleModal} >
                    <FontAwesomeIcon icon={faEdit} style={{ color: Color.darkGray, marginRight: 10, marginLeft: 10 }} size={BasicStyles.standardFontSize} />
                </TouchableOpacity>
              </Text>
              <View
                style={{
                    height: 1,
                    width: Style.getWidth() - 190,
                    backgroundColor: Color.black,
                }}
              />
            </View>
          </View>
          <View style={[{ marginTop: 15 },]}>
            <Text style={[{ color: Color.darkGray }, Style.fontSize(BasicStyles.standardFontSize)]}>Current wait time: around 30 mins
            <View style={{ marginTop: 10 }}>
                    <FontAwesomeIcon style={{ marginLeft: 10 }} color={Color.darkGray} icon={faInfoCircle} size={BasicStyles.standardFontSize} />
                </View>
            </Text>
          </View>
        </View>
        <Separator />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.OrderHistoryListContainer]}>
          <View >
            {
              cart && cart.map((cartItem, idx) => {
                  return <OrderItems key={idx} data={cartItem} editable={true} updateOrder={() => this.updateTotal()}/>
              })
            }
          </View>
          {
            (
              <DeliveryDetails {...{ OrderDetails, deliveryDetails, redirect: this.redirect, isSummary: true }} />
            )
          }

        </ScrollView>
        <Separator />
        <View style={styles.MainContainer}>
          <TouchableHighlight
            onPress={() => { this.redirect('requestPickupStack') }}
            style={[BasicStyles.btn, Style.btnPrimary, { borderRadius: 0, width: Style.getWidth() - 30 }]}
            underlayColor={Color.gray}>
            <Text style={[{ color: Color.tertiary }, Style.fontWeight('bold'), Style.fontSize(BasicStyles.standardFontSize)]}>
                PLACE ORDER
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {
    setCart: (cart) => dispatch(actions.setCart(cart)),
    setOrderDetails: (details) => dispatch(actions.setOrderDetails(details)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryScreen);
