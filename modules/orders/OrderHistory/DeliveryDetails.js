import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from './Separator'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default class DeliveryDetails extends Component {
    render() {
        return (

            <View>
                <View style={{ paddingTop: 20, marginBottom: 20 }}>
                    <View>
                        <Text style={[
                            BasicStyles.titleText,
                            Style.fontWeight('bold'),
                            Style.fontAlign('left'),
                            Style.fontSize(16)]
                        }>Delivery Details</Text>

                        <Text style={[BasicStyles.titleText, { marginTop: 10 }]}>
                            <FontAwesomeIcon style={[styles.DeliveryDetailIcon,]} color={Color.primary} icon={faMapMarkerAlt} size={16} />
                            <Text style={[BasicStyles.titleText, styles.DeliveryDetailText]}>{"  "}1A, 1 Main Street, Hong Kong</Text>
                        </Text>
                        <Text style={[BasicStyles.titleText, { marginTop: 10 }]}>
                            <FontAwesomeIcon style={[styles.DeliveryDetailIcon,]} color={Color.primary} icon={faMapMarkerAlt} size={16} />
                            <Text style={[BasicStyles.titleText, styles.DeliveryDetailText]}>{"  "}Payment Method: Credit Card ending 1234</Text>
                        </Text>
                        <Text style={[BasicStyles.titleText, { marginTop: 10 }]}>
                            <FontAwesomeIcon style={[styles.DeliveryDetailIcon,]} color={Color.primary} icon={faClock} size={16} />
                            <Text style={[BasicStyles.titleText, styles.DeliveryDetailText]}>{"  "}Delivery time: ASAP</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}