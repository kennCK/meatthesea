import {Platform, StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  TopContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginBottom: 50,
    elevation: 10,
  },
  BottomContainer: {
    elevation: 10,
    backgroundColor: '#F7F7F7',
    height: '100%',
  },
  TextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
  },
  DescriptionContainer: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0366B2',
  },
  SubtitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  SubtitleTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 21,
    color: '#0366B2',
  },
  ScheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  ScheduleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;