import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Color } from 'common';
import Style from '../Style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';

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
    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    callback(item)
                }}
            >
                <View>
                    <Text style={styles.item}>
                        {item}
                    </Text>
                    <TouchableHighlight
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 8
                        }}
                        disabled
                    >
                        <FontAwesomeIcon color={Color.primary} icon={item === selected ? faCircleSolid : faCircle} size={15} />
                    </TouchableHighlight>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}


export default FlatListItem;