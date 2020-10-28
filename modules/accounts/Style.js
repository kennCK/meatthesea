import { Color } from 'common';
import { Dimensions } from 'react-native';
// const width = Math.round(Dimensions.get('window').width);
const getWidth = () => {
  return Math.round(Dimensions.get('window').width);
}
export default {
  getWidth,
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
  LogoSize: {
    height: 150,
    width: 150
  },
  TextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  messageContainer: {
    height: 50,
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

  btnWhite: {
    height: 50,
    backgroundColor: Color.lightGray,
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
    width: getWidth() - 100,
    marginBottom: 50
  },
}