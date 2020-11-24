import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import styles from './Style';
import { BasicStyles } from 'common';
import Style from 'modules/accounts/Style';
import { Color } from 'common';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
class OrderHistoryScreen extends Component {
    render() {
        let { title, icon, onPress } = this.props;
        return (
            <TouchableHighlight underlayColor={Color.white} onPress={onPress && onPress}>
                <View key={title} style={{ borderBottomColor: Color.gray, backgroundColor: Color.accentGray, borderBottomWidth: 1 }}>
                    <Text style={[BasicStyles.titleText, { marginVertical: 15 }]}>
                        <FontAwesomeIcon style={{
                            marginTop: 14
                        }} color={Color.primary} icon={icon} size={BasicStyles.standardFontSize} />
                        <Text style={[BasicStyles.titleText, styles.ListItemText, Style.fontSize(BasicStyles.standardFontSize)]}>{"  "}{title}</Text>
                    </Text>
                </View >
            </TouchableHighlight>
        );
    }
}

export default OrderHistoryScreen;
