import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from './Separator'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default class DeliveryDetails extends Component {

    state = {
        tip: 0,
        value: 0,
        value2: 0
    }
    updateQuantity = (mode = 1) => {
        let { tip } = this.state;
        this.setState({ tip: mode == 1 ? ++tip : --tip })
    }
    render() {
        let { OrderDetails, deliveryDetails, isSummary = false } = this.props
        let { tip } = this.state
        return (
            <View>
                {
                    isSummary &&
                    <>
                        <View style={{ paddingTop: 20, marginBottom: 20 }}>
                            <View>
                                <Text
                                    style={[
                                        { marginVertical: 2, marginLeft: 5, color: Color.black },
                                        BasicStyles.titleText,
                                        Style.fontSize(18),
                                        Style.fontWeight('bold')
                                    ]}>Add cultery</Text>
                                <Text style={{
                                    position: 'absolute',
                                    right: 25,
                                    top: 5
                                }}>
                                    <RadioButton labelHorizontal={true} >
                                        <RadioButtonInput
                                            obj={{ value: 1 }}
                                            isSelected={this.state.value}
                                            onPress={() => {
                                                let { value } = this.state
                                                this.setState({ value: !value })
                                            }}
                                            buttonSize={10}
                                            buttonWrapStyle={{ marginRight: 10 }}
                                        />
                                    </RadioButton>
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        { marginVertical: 2, marginLeft: 5, color: Color.black },
                                        BasicStyles.titleText,
                                        Style.fontSize(18),
                                        Style.fontWeight('bold')
                                    ]}>Contactless delivery</Text>
                                <Text style={{
                                    position: 'absolute',
                                    right: 25,
                                    top: 5
                                }}>
                                    <RadioButton labelHorizontal={true} >
                                        <RadioButtonInput
                                            obj={{ value: 1 }}
                                            isSelected={this.state.value1}
                                            onPress={() => {
                                                let { value1 } = this.state
                                                this.setState({ value1: !value1 })
                                            }}
                                            buttonSize={10}
                                            buttonWrapStyle={{ marginRight: 10 }}
                                        />
                                    </RadioButton>
                                </Text>
                            </View>
                        </View>
                        <Separator />
                    </>
                }
                <View style={{ paddingTop: 20, marginBottom: 20 }}>
                    <View>
                        <Text
                            style={[
                                { marginVertical: 2, marginLeft: 5, color: Color.darkGray },
                                BasicStyles.titleText,
                                Style.fontSize(16)
                            ]}>Subtotal</Text>
                        <Text style={{
                            position: 'absolute',
                            right: 25,
                            top: 5
                        }}>HK$ XX</Text>
                    </View>
                    {isSummary &&
                        <View style={{ marginTop: 10 }}>
                            <Text
                                style={[
                                    { marginVertical: 2, marginLeft: 5, color: Color.primary },
                                    BasicStyles.titleText,
                                    Style.fontWeight('100'),
                                    Style.fontSize(16)
                                ]}>Add tip</Text>
                            <Text style={{
                                position: 'absolute',
                                right: 25,
                                top: 5
                            }}>
                                <>
                                    <TouchableOpacity style={styles.TipButton} onPress={() => {
                                        this.updateQuantity(0)
                                    }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled>
                                        <Text style={[
                                            Style.fontSize(18),
                                            { marginHorizontal: 4 }
                                        ]}>{tip > 0 ? tip : 0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.TipButton} onPress={() => {
                                        this.updateQuantity()
                                    }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            </Text>
                        </View>}
                    <View>
                        <Text
                            style={[
                                { marginVertical: 2, marginLeft: 5, color: Color.black },
                                BasicStyles.titleText,
                                Style.fontWeight('bold'),
                                Style.fontSize(16)
                            ]}>TOTAL</Text>
                        <Text style={{
                            position: 'absolute',
                            right: 25,
                            top: 5
                        }}>HK$ XX</Text>
                    </View>
                </View>
                <Separator />
                <View style={{ paddingTop: 20, marginBottom: 20 }}>
                    <View>
                        <View>
                            <Text
                                style={[
                                    { marginVertical: 2, marginLeft: 5, color: Color.black },
                                    BasicStyles.titleText,
                                    Style.fontWeight('bold'),
                                    Style.fontSize(16)
                                ]}>Delivery Details</Text>
                            {
                                isSummary && <Text style={{
                                    position: 'absolute',
                                    right: 25,
                                    top: 5
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.redirect('accountStack')
                                    }}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: Color.darkGray, }} size={20} />
                                    </TouchableOpacity>
                                </Text>
                            }

                        </View>
                        {
                            deliveryDetails.map(detail => (
                                <Text style={[BasicStyles.titleText, { marginTop: 10 }]} key={detail.title}>
                                    <FontAwesomeIcon style={[styles.DeliveryDetailIcon,]} color={Color.primary} icon={detail.icon} size={16} />
                                    <Text style={[BasicStyles.titleText, styles.DeliveryDetailText]}>{"  "}{detail.title}</Text>
                                </Text>
                            ))
                        }
                    </View>
                </View>
            </View>
        )
    }
}