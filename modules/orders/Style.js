import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Color } from 'common'
import Style from "modules/accounts/Style";
const styles = StyleSheet.create({

    MainContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Color.white
    },
    TopContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        height: 55,
        elevation: 10,

    },
    BottomContainer: {
        elevation: 10,
        width: Style.getWidth(),
        backgroundColor: Color.lightGray,
        height: '100%',
    },

    DescriptionContainer: {
        textAlign: 'center',
        elevation: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: Color.black,
    },
    SubtitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 35,
    },
    ScheduleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    LogoStyle: {
        height: 270,
        width: 270,
    },
    LogoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    SubtitleTextStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 21,
        color: '#0366B2',
    },
    OrderHistoryListContainer: {
        backgroundColor: Color.white,
    },
    DeliveryDetailIcon: {
        position: 'absolute',
        left: 25,
    },
    DeliveryDetailText: {
        fontSize: 16,
        fontWeight: '100',
        marginLeft:15,
        color: Color.darkGray,
    },
});

export default styles;