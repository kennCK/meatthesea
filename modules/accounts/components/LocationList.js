import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Color } from 'common';
import Style from '../Style';
import FlatListItem from './LocationListItem';
export default class LocationsList extends Component {
    render() {
        const location = [
            { key: 'Centre Stage Tower1' },
            { key: 'Centre Stage Tower2' },
            { key: 'Holywood Terrace Block A' },
            { key: 'Holywood Terrace Block B' },
        ];
        return (
            <FlatList
                data={location}
                renderItem={({ item }) => <FlatListItem  {...{ item: item.key, callback: this.props.callback, selected: this.props.selected }} />}
            />
        );
    }
}

