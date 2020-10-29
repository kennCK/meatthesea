import { Color } from 'common';
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
        flexDirection: 'row'
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
        fontSize: 18
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
    }
}