import {StyleSheet, Dimensions} from 'react-native';
import {Color} from 'common';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  insideModalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 20,
    width: width - 20,
    height: 260,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // flexDirection:'row',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: Color.primaryDark,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "left",
    alignItems: 'center',
    marginTop: 5,
    color: Color.primaryDark
  },
  textInput: {
    height: 40,
    borderColor: Color.gray,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 5,
    color: Color.darkGray
  },
  btnWhite: {
    height: 50,
    backgroundColor: Color.white,
    width: width - 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: Color.primaryDark,
    borderWidth: 2
  },
  modalClose: {
    color: Color.white,
    fontSize: 34,
    lineHeight: 34
  },
  modalCloseContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 34,
    paddingTop: 2,
    paddingLeft: 7,
    paddingRight: 7,
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: 17,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'left'
  }
});

export default styles;
