import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Routes } from 'common';
import Style from '../Style';
import FlatListItem from './LocationListItem';
import Api from 'api';
export default class LocationsList extends Component {
    render() {
        const { stores } = this.props;
        const location = [
            { key: 'Centre Stage Tower1' },
            { key: 'Centre Stage Tower2' },
            { key: 'Holywood Terrace Block A' },
            { key: 'Holywood Terrace Block B' },
        ];
        return (
            <FlatList
                data={stores}
                renderItem={({ item }) => <FlatListItem  {...{ item: item, callback: this.props.callback, selected: this.props.selected }} />}
            />
        );
    }
}

