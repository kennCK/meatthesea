import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  OrderNumberContainer: {
    width: '100%',
    height: 60,
    padding: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderBottomWidth: 0.5,
  },
  OrderNumberStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ScheduleDetailsContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ScheduleContainer: {
    marginRight: '9%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '65%',
  },
  PickupRequestContainer: {
    alignItems: 'flex-start',
    paddingTop: '18%',
  },
  PickupStatusStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  LocationTypeStyle: {
    paddingVertical: '5%',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  LocationStyle: {
    fontSize: 18,
  },
  PickupInstructionsStyle: {
    paddingVertical: '30%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#116EB6',
    textAlign: 'center',
  },
  PickupConfirmedContainer: {
    width: '75%',
    paddingTop: '27%',
    alignItems: 'center',
  },
  PickupCompleteContainer: {
    paddingTop: '17%',
    alignItems: 'center',
  },
  ProgressBarContainer: {
    height: '100%',
    justifyContent: 'flex-start',
    paddingTop: 45,
    position: 'relative',
    right: 1,
  },
});

export default styles;
