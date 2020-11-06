import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  AddressCardContainer: {
    marginVertical: '0%',
    marginHorizontal: '0%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F3F3',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    backgroundColor: '#F0FAFF',
  },
  AddressTextContainer: {
    paddingRight: '45%',
  },
  AddressTypeTextStyle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  AddressTextStyle: {},
  CustomButtonContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonTextContainer: {},
  ButtonTextStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});

export default styles;
