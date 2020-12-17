import React, {Component} from 'react';
import styles from './Style';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Color, BasicStyles} from 'common';
import Helper from './Helper';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={{height: 60, paddingTop: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Helper.pagerMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.props.onChange(index)}
                style={{
                  width: width / 2,
                  borderBottomWidth: 8,
                  borderBottomColor:
                    this.props.activeIndex == index ? Color.primary : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={[
                    styles.TitleContainer,
                    {alignSelf: 'center', justifyContent: 'center'},
                  ]}>
                  <Text
                    style={{
                      fontSize: BasicStyles.titleText.fontSize,
                      color:
                        this.props.activeIndex == index
                          ? Color.primary
                          : '#5F5F5F',
                    }}>
                    {item.title}
                  </Text>
                  
                  {item.title === this.props.notificationTitle && (
                    <View style={[styles.NotificationContainer, {
                      marginLeft: 10
                    }]}>
                      <Text style={styles.NotificationTextStyle}>
                        {this.props.notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Pagination;
