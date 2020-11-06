import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import OrderItems from './OrderItems';
import Separator from '../components/Separator';
import DeliveryDetails from '../components/DeliveryDetails';
import { OrderDetails, dummyData , deliveryDetails } from "../DummyData";

class OrderHistoryScreen extends Component {
    redirect = (route) => {
        this.props.navigation.navigate(route);
    }
    render() {

        return (
            <View style={{ flex: 1 }} >
                <View style={styles.MainContainer}>
                    <View style={styles.TopContainer}>
                        <Text style={[styles.DescriptionContainer]}>Order number 1234</Text>
                    </View>
                    <Separator />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.OrderHistoryListContainer]}>
                    <View >
                        {
                            dummyData.map((data, idx) => {
                                return <OrderItems key={idx} data={data} />
                            })
                        }
                    </View>
                    <DeliveryDetails {...{ OrderDetails , deliveryDetails }} />
                </ScrollView>
                <Separator />
                <View style={styles.MainContainer}>
                    <TouchableHighlight
                        style={[BasicStyles.btn, Style.btnPrimary, { borderRadius: 0, width: Style.getWidth() - 30 }]}
                        underlayColor={Color.gray}>
                        <Text style={[{ color: Color.tertiary }, Style.fontWeight('bold'), Style.fontSize(18)]}>
                            RATE ORDER
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

export default OrderHistoryScreen;
