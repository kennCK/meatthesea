import {StyleSheet, Dimensions} from 'react-native';

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
    fontSize: 18,
  },
  OrderDateContainer: {
    marginLeft: 'auto',
  },
  OrderDateStyle: {
    fontSize: 18,
  },
  TitleContainer: {
    flexDirection: 'row',
  },
  NotificationContainer: {
    position: 'relative',
    left: 9,
    top: 3,
    backgroundColor: '#FF0045',
    alignItems: 'center',
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
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;
