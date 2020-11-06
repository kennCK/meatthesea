import React, { Component } from 'react';
import { View } from 'react-native';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
export default class Separator extends Component {
    render() {
        return (
            <View
                style={{
                    height: 1,
                    width: Style.getWidth(),
                    backgroundColor: Color.lightGray,
                }}
            />
        );
    };
}

