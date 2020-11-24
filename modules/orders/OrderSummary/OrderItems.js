import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from '../components/Separator'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class OrderItems extends Component {
    state = {
        items: this.props.data.items
    }
    updateQuantity = (id, increment = true) => {
        let updated = Object.assign({}, this.state.items[id], {})
        let { quantity } = updated;
        updated.quantity = increment ? ++quantity : --quantity;
        this.setState({
            items: [
                ...this.state.items.slice(0, id),
                updated,
                ...this.state.items.slice(id + 1)
            ]
        });
    }

    render() {
        let { header } = this.props.data;
        return (
            <View><View style={{ paddingTop: 20, marginBottom: 15 }}>
                <Text style={[
                    BasicStyles.titleText,
                    Style.textPrimary,
                    Style.fontWeight('bold'),
                    Style.fontAlign('left'),
                    Style.fontSize(BasicStyles.standardFontSize)]
                }>{header}</Text>
                {
                    this.state.items.map((itemText, idx) => {
                        return (
                            <View key={idx}  >
                                <View >
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Text style={[
                                            BasicStyles.titleText,
                                            Style.fontSize(BasicStyles.standardFontSize),
                                        ]}>
                                            <Text  >
                                                <>
                                                    <TouchableOpacity onPress={() => {
                                                        this.updateQuantity(idx, false)
                                                    }}>
                                                        <Text style={[
                                                            Style.fontSize(BasicStyles.standardFontSize),
                                                            { marginHorizontal: 2 }
                                                        ]}>-</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity disabled>
                                                        <Text style={[
                                                            Style.fontSize(BasicStyles.standardFontSize),
                                                            { marginHorizontal: 4 }
                                                        ]}>{itemText.quantity > 0 ? itemText.quantity : 0}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => {
                                                        this.updateQuantity(idx)
                                                    }}>
                                                        <Text style={[
                                                            Style.fontSize(BasicStyles.standardFontSize),
                                                            { marginHorizontal: 2 }
                                                        ]}>+</Text>
                                                    </TouchableOpacity>
                                                </>
                                            </Text>
                                        </Text>
                                        <Text style={[
                                            { marginVertical: 2 },
                                            Style.fontWeight("700"),
                                            Style.fontSize(BasicStyles.standardFontSize),
                                        ]}>
                                            {itemText.item}
                                        </Text>
                                        <Text style={{
                                            position: 'absolute',
                                            fontSize:BasicStyles.standardFontSize,
                                            right: 25,
                                            top: 5
                                        }}>{itemText.price}</Text>
                                    </View>
                                </View>
                                {
                                    itemText.addOns.map((addOn, id) => {
                                        return (
                                            <View key={id} >
                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    <Text style={[
                                                        { marginVertical: 2, marginLeft: 10 },
                                                        BasicStyles.titleText,
                                                        Style.fontSize(BasicStyles.standardFontSize),
                                                    ]}>
                                                        <FontAwesomeIcon icon={faTrash} color={Color.primary} />
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            { color: Color.darkGray },
                                                            BasicStyles.titleText,
                                                            Style.fontWeight("100"),
                                                            Style.fontSize(BasicStyles.standardFontSize)
                                                        ]}>{"\t"}
                                                        +{addOn.item}</Text>
                                                    <Text style={{
                                                        fontSize:BasicStyles.standardFontSize,
                                                        position: 'absolute',
                                                        right: 25,
                                                        top: 5
                                                    }}>{addOn.price}</Text>
                                                </View>
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