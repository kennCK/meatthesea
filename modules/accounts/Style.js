import { Color } from 'common';
import { Dimensions } from 'react-native';
// const width = Math.round(Dimensions.get('window').width);
const getWidth = () => {
  return Math.round(Dimensions.get('window').width);
}
const getHeight = () => {
  return Math.round(Dimensions.get('window').height);
}
export default {
  getWidth,
  getHeight,
  ScrollView: {
    padding: 10,
    backgroundColor: Color.primary,
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoContainer: {
    height: 150,
    width: getWidth(),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  LogoContainerLg: {
    height: 250,
    width: getWidth(),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  LogoSize: {
    height: 150,
    width: 150
  },
  LogoSizeLg: {
    height: 250,
    width: 250
  },
  TextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  messageContainer: {
    minHeight: 50,
    width: getWidth() - 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.danger
  },
  messageText: {
    color: Color.danger
  },
  textInput: {
    height: 40,
    borderColor: Color.gray,
    borderWidth: 1,
    width: getWidth() - 100,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  btnPrimary: {
    height: 50,
    backgroundColor: Color.primary,
    width: getWidth() - 100,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  btnSm: {
    height: 35
  },
  btnLight: {
    backgroundColor: Color.lightGray
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
  btnText: {
    color: Color.white
  },
  textPrimary: {
    color: Color.primary
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
  textPlaceHolder: {
    placeholderTextColor: Color.gray
  },
  headerIconStyle: {
    marginBottom: 30,
    marginTop: 20,
  },
  colRight: {
    alignSelf: 'flex-end',
  },
  bottomTextContainer: {
    width: getWidth() - 90,
    marginBottom: 50
  },
}