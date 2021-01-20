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
  modalView: {
    margin: 20,
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 10,
    width: width - 20,
    height: 150,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "left",
    alignItems: 'center',
  }
});

export default styles;
