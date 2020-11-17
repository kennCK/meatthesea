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
    visibility: 'visible'
  },
  hideScroll: {
    visibility: 'hidden'
  },
  modal: {
    backgroundColor: Color.primary,
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
  }
}