import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import styles from '../Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import Separator from '../components/Separator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

class RequestPickup extends Component {
    state = {
        addresses: [
            { title: 'home', subtitle: '1a, Centre Stage Tower 1', selected: false },
            { title: 'office', subtitle: '2b, Centre Stage Tower 2', selected: false },
        ]
    }

    redirect = (route) => {
        this.props.navigation.push(route);
    }

    toggleSelect = (id) => {
        let item = Object.assign({}, this.state.addresses[id], {})
        let { selected } = item;
        item.selected = !selected;
        this.setState({
            addresses: [
                ...this.state.addresses.slice(0, id),
                item,
                ...this.state.addresses.slice(id + 1)
            ]
        });
    }
    render() {
        let { addresses } = this.state
        return (
            <View style={{ flex: 1 }} >
                <View style={styles.MainContainer}>
                    <View style={styles.TopContainer}>
                        <Text style={[styles.DescriptionContainer]}>Order number 1234</Text>
                    </View>
                    <Separator />
                </View>
                <View style={[styles.OrderHistoryListContainer, { flexGrow: 1 }]}>
                    <View style={{ backgroundColor: Color.lightGray, height: 50, justifyContent: 'center' }}>
                        <Text style={[
                            BasicStyles.titleText,
                            Style.fontWeight('bold'),
                            Style.fontSize(18)
                        ]}>Choose pickup address</Text>
                    </View>
                    <View style={{ marginVertical: 10 }} >
                        <RadioForm
                            animation={true}
                        >
                            {/* To create radio buttons, loop through your array of options */}
                            {
                                addresses.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} >
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
                                        <View>
                                            <TouchableHighlight underlayColor={Color.white} onPress={() => {
                                                this.toggleSelect(i)
                                            }}>
                                                <>
                                                    <Text style={[Style.fontWeight('bold'), Style.fontSize(18)]}>{obj.title}</Text>
                                                    <Text style={[Style.fontSize(18)]}>{obj.subtitle}</Text>
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
                        onPress={() => this.props.navigation.navigate('scheduledPickupStack')}
                        >
                        <Text style={[{ color: Color.tertiary }, Style.fontWeight('bold'), Style.fontSize(18)]}>
                            COLLECT CROCKERY
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

export default RequestPickup;
