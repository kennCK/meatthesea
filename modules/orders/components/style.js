import {StyleSheet, Dimensions} from 'react-native';
import {Color} from 'common';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99
  },
  insideModalCenteredView: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    marginTop: -20,
    height: height,
    backgroundColor: 'rgba(0,100,177,.9)'
  },
  modalView: {
    margin: 20,
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 20,
    width: width - 40,
    minHeight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
