import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from '../Style';
import {BasicStyles} from 'common';
import Style from 'modules/accounts/Style';
import {Color} from 'common';
import Separator from '../components/Separator';

export default class OrderItems extends Component {
  render() {
    let {store, items} = this.props;
    return (
      <View>
        <View style={{paddingTop: 20, marginBottom: 15}}>
          <Text
            style={[
              BasicStyles.titleText,
              Style.textPrimary,
              Style.fontWeight('bold'),
              Style.fontAlign('left'),
              Style.fontSize(BasicStyles.standardFontSize),
            ]}>
            {store}
          </Text>
          {items.map((itemText, idx) => {
            return (
              <View key={idx}>
                <View>
                  <Text
                    style={[
                      {marginVertical: 2},
                      BasicStyles.titleText,
                      Style.fontWeight('700'),
                      Style.fontSize(BasicStyles.standardFontSize),
                    ]}>
                    {itemText.name}
                  </Text>
                  <Text
                    style={{
                      position: 'absolute',
                      right: 25,
                      top: 5,
                    }}>
                    HK$ {itemText.price || 0}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <Separator />
      </View>
    );
  }
}
