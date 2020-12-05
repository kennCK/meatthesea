import {StyleSheet} from 'react-native';
import {BasicStyles} from 'common';

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 40,
  },
  AddPaymentMethodContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: '100%',
  },
  PaymentMethodContainer: {
    height: 100,
    width: 100,
    borderWidth: 0.75,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  PaymentMethodsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  FormContainer: {
    marginTop: '5%',
    width: '100%',
    height: 531,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    alignSelf: 'center',
  },
  CardNumberInputContainer: {
    borderRadius: 10,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    height: 60,
    borderWidth: 0.75,
  },
  RowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  AddPaymentButtonContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#0064B1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddPaymentButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: BasicStyles.titleText.fontSize,
  },
  InputContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
  },
  InputSubContainer: {width: '100%', alignItems: 'flex-start'},
  InputNameContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  InputNameTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
  },
  InputFieldContainer: {
    marginLeft: 20,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    height: 60,
    borderWidth: 0.75,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default styles;
