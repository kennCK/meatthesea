import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  imageRow: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  productImageFull:{
    width: width-50,
    height: width-50
  },
  productImage: {
    width: (width/3)-20,
    height: (width/3)-20
  },
  productContainer: {
    width: (width/3),
    alignItems: 'center',
  },
  productName: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: BasicStyles.standardFontSize
  },
  menuContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  menuItem: {
    width: '50%',
    borderWidth: 1,
    paddingTop: 5,
    borderColor: Color.gray,
    alignItems: 'center'
  },
  menuTextSelected: {
    fontWeight: 'bold',
    color: Color.primary,
    fontSize: 20
  },
  menuText: {
    fontSize: 20
  },
  rectangleSelected: {
    width: '100%',
    height: 5,
    backgroundColor: Color.primary
  },
  rectangle: {
    width: '100%',
    height: 5
  },
  showScroll: {
    visibility: 'visible',
    marginTop: -10
  },
  hideScroll: {
    visibility: 'hidden',
    marginTop: -10
  },
  modalBlue: {
    backgroundColor: Color.primary,
    alignItems: 'center',
    margin: 0,
    height: '100%'
  },
  modalWhite: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 0,
    height: '100%'
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  menuButton: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 20
  },
  menuContainer: {
    width: (width/2),
    padding: 15,
  },
  menuImage: {
    width: (width/2)-30,
    height: (width/2)-30
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: '100%'
  },
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
  textStyle: {
    color: Color.primaryDark,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    alignItems: 'center',
    fontSize: 17,
    color: Color.darkGray
  },
  btnWhite: {
    height: 65,
    backgroundColor: Color.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: Color.lightGray,
    borderTopWidth: 1,
    marginBottom: -2
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
  }
}