import {StyleSheet, Dimensions} from 'react-native';
import {BasicStyles, Color} from 'common';

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'flex-start',
    height: '100%',
  },
  OrderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    borderBottomColor: Color.gray,
    borderBottomWidth: 1,
    backgroundColor: '#F7F7F7',
  },
  OrderNumberStyle: {
    fontSize: BasicStyles.standardFontSize,
  },
  OrderDateContainer: {
    marginLeft: 'auto',
  },
  OrderDateStyle: {
    fontSize: BasicStyles.standardFontSize,
  },
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotificationContainer: {
    backgroundColor: '#FF0045',
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF0045',
  },
  NotificationTextStyle: {
    color: 'white',
    fontSize: 10
  },
});

export default styles;
