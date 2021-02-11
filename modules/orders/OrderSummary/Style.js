import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  insideModalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  modalView: {
    margin: 50,
    backgroundColor: Color.white,
    borderRadius: 20,
    paddingBottom: 20,
    width: width - 50,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primaryDark
  },
  modalText: {
    textAlign: "center",
    alignItems: 'center',
    fontSize: 17,
    color: Color.darkGray
  },
  textStyle: {
    color: Color.primaryDark,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnWhite: {
    height: 65,
    backgroundColor: Color.white,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: Color.lightGray,
    borderTopWidth: 1,
    marginBottom: -2
  },
}