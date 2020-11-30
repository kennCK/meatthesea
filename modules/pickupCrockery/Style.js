import {StyleSheet, Dimensions} from 'react-native';
import {BasicStyles} from 'common';

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'flex-start',
    height: '100%',
  },
  OrderContainer: {
    width: '100%',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,

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
    position: 'absolute',
    backgroundColor: '#FF0045',
    right: '25%',
    bottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#FF0045',
  },
  NotificationTextStyle: {
    position: 'relative',
    bottom: 3,
    color: 'white',
    fontSize: BasicStyles.standardFontSize,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;
