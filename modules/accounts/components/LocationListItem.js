import React, { useState, useEffect } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Color } from 'common';
import Style from '../Style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        textAlign: 'justify',
        fontSize: 16,
        marginVertical: 2,
        height: 30,
        color: Color.primary
    },
})

const FlatListItem = ({ callback, item, selected }) => {
    const [active, setActive] = useState(item.building_name == selected);
    useEffect(() => {
        setActive(item.building_name == selected)
    }, [selected])
    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    callback(item)
                }}
            >
                <View>
                    <Text style={styles.item}>
                        {item.building_name ? item.building_name : item.name}
                    </Text>
                    <TouchableHighlight
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 8
                        }}
                        disabled
                    >
                        {/* <FontAwesomeIcon color={Color.primary} icon={item.name == selected ? faCircleSolid : faCircle} size={15} /> */}
                        <RadioButton labelHorizontal={true} >
                            <RadioButtonInput
                                obj={{ value: selected }}
                                disabled
                                isSelected={active}
                                onPress={() => {

                                }}
                                buttonSize={8}
                                buttonWrapStyle={{ marginRight: 10 }}
                            />
                        </RadioButton>
                    </TouchableHighlight>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}


export default FlatListItem;