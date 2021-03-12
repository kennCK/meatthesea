import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
export default {
  ScrollView: {
    padding: 10
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.lightGray
  },
  LogoContainer: {
    height: width-260,
    width: width-260,
    alignItems: 'center',
  },
  LogoSize: {
    marginTop: 10,
    height: '100%',
    width: '100%'
  },
  TextContainer: {
    flex: 1
  },
  messageContainer: {
    height: 50,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.danger
  },
  messageText: {
    color: Color.danger
  },
  textInput: {
    height: 50,
    borderColor: Color.gray,
    borderWidth: 1,
    width: width - 40,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  btnPrimary: {
    height: 50,
    backgroundColor: Color.primary,
    width: width - 40,
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
  textSecondary: {
    marginTop: 15,
    textAlign: 'center'
  },
  btnWhite: {
    height: 50,
    backgroundColor: Color.white,
    width: width - 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: Color.primary,
    borderWidth: 2
  },
  circle: {
    marginBottom: 50,
    alignItems: 'center',
    width: width-140,
    height: width-140,
    borderRadius: (width-140)*2/2,
    backgroundColor: Color.white
  },
  modal: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.lightGray,
    alignItems: 'center',
    margin: 0
  },
  close: {
    paddingRight: 10
  },
  delivery: {
    width: width,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 0,
    borderColor: Color.gray,
    alignItems: 'center',
    backgroundColor: Color.white,
    justifyContent: 'space-between'
  },
  searchBar: {
    flex: 1, 
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 35,
    marginRight: 15,
    alignItems: 'center'
  },
  bottomMenu: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderColor: Color.primary
  },
  bottomMenuText: {
    marginLeft: 10,
    fontSize: BasicStyles.standardFontSize
  }
}