import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
export default {
  width: {
    width: width
  },
  orderNo: {
    width: width,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.gray
  },
  orderNoText: {
    position: 'absolute',
    bottom: 15,
    fontSize: 17,
    fontWeight: 'bold',
  },
  menuItems: {
    height: 40,
    justifyContent: 'center',
    width: width,
    paddingLeft: 15,
    paddingRight: 15,
  },
  menuText: {
    fontWeight: 'bold',
    color: Color.primary,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 15
  },
  itemRow: {
    width: width ,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    height: 20,
    marginTop: 10,
    paddingBottom: 0,
    marginBottom: 0
  },
  itemName: {
    paddingBottom: 0,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: BasicStyles.standardFontSize
  },
  itemPrice: {
    paddingBottom: 0,
    marginBottom: 0,
    fontSize: BasicStyles.standardFontSize,
  },
  itemDetails: {
    flexDirection: 'row',
    width: width,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
    marginTop: 0
  },
  detailsText: {
    fontSize: BasicStyles.standardFontSize
  },
  totalSection: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 30
  },
  deliveryCondition: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15
  },
  flexDirectionBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
  rateContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 30
  },
  rateInsideContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary
  },
  rateText: {
    color: Color.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  deliveryDetailsContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: Color.gray,
    borderTopColor: Color.gray,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 50
  },
  addressItems: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 30,
    marginTop: 5,
    marginBottom: 5
  }
}
