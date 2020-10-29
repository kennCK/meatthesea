import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from './Separator'

export default class OrderItems extends Component {
    render() {
        let { header, items } = this.props.data;
        return (
            <View><View style={{ paddingTop: 20, marginBottom: 15 }}>
                <Text style={[
                    BasicStyles.titleText,
                    Style.textPrimary,
                    Style.fontWeight('bold'),
                    Style.fontAlign('left'),
                    Style.fontSize(16)]
                }>{header}</Text>
                {
                    items.map((itemText, idx) => {
                        return (
                            <View key={idx}  >
                                <View >
                                    <Text style={[
                                        { marginVertical: 2 },
                                        BasicStyles.titleText,
                                        Style.fontWeight("700"),
                                        Style.fontSize(16),

                                    ]}>{itemText.item}
                                    </Text>
                                    <Text style={{
                                        position: 'absolute',
                                        right: 25,
                                        top: 5
                                    }}>{itemText.price}</Text>

                                </View>
                                {
                                    itemText.addOns.map((addOn, id) => {
                                        return (
                                            <View key={id}>
                                                <Text

                                                    style={[
                                                        { marginVertical: 2, marginLeft: 5, color: Color.darkGray },
                                                        BasicStyles.titleText,
                                                        Style.fontWeight("100"),
                                                        Style.fontSize(16)
                                                    ]}>+{addOn.item}</Text>
                                                {addOn.price && <Text style={{
                                                    position: 'absolute',
                                                    right: 25,
                                                    top: 5
                                                }}>{addOn.price}</Text>}

                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }

            </View>
                <Separator />
            </View>
        )
    }
}