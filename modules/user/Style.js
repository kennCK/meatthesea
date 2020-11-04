import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Color } from 'common'
import Style from "modules/accounts/Style";
const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: Color.white
    },
    BottomContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Color.white
    },
    ListItemText: {
        fontSize: 16,
        fontWeight: '100',
        marginLeft: 0,
        color: Color.darkGray,
    },
    ListItemIcon: {
        marginTop: 10,
        marginBottom: 15,
        color: Color.primary
    }
});

export default styles;