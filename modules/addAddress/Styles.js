import {StyleSheet, Dimensions} from 'react-native';
import {Color} from 'common';

const getWidth = () => {
  return Math.round(Dimensions.get('window').width);
}
const getHeight = () => {
  return Math.round(Dimensions.get('window').height);
}

const styles = {
  AddAddressContainer: {
    justifyContent: 'flex-start',
    height: '15%',
    paddingHorizontal: 20,
  },
  InputContainer: {
    paddingVertical: '15%',
    paddingHorizontal: '5%',
    width: '90%',
  },
  textInput: {
    height: 40,
    borderColor: Color.primary,
    borderWidth: 1,
    width: getWidth() - 100,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: Color.primary
  },
  textPlaceHolder: {
    placeholderTextColor: Color.primary
  },
  fontWeight: size => {
    return {
      fontWeight: size,
    }
  },
  fontSize: size => {
    return { fontSize: size }
  },
  fontAlign: pos => {
    return {
      textAlign: pos
    }
  },
  btnWhite: {
    height: 50,
    backgroundColor: Color.tertiary,
    width: getWidth() - 100,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
};

export default styles;
