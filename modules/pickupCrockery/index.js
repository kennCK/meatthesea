import React, {Component} from 'react';
import {SafeAreaView, View, Text, Dimensions} from 'react-native';
import _ from 'lodash';
import styles from './Style';
import Pagination from './pickUpCrockeryPagination';
import ScheduledTab from 'modules/pickupCrockery/tabs/ScheduledTab';
import PendingTab from 'modules/pickupCrockery/tabs/PendingTab';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import {connect} from 'react-redux';
import Alert from 'modules/generic/alert';
const height = Math.round(Dimensions.get('window').height);

class PickupCrockery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      crockery: [],
      orderLength: 0,
      pageNumber: 1,
      isLoading: false,
      scheduled: [],
      pending: [],
      isError: true,
      alertText: '',
      showError: false
    };
  }

  onFocusFunction = () => {
    /**
     * Executed each time we enter in this component &&
     * will be executed after going back to this component 
    */
     this.scheduledCrockeryRetrieve();
     this.pendingCrockeryRetrieve();
  }


  async componentDidMount() {
    // this.getOrders();
    // this.retrieveCrockery();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount () {
    /**
     * removing the event listener added in the componentDidMount()
     */
    this.focusListener.remove();
  }


  pendingCrockeryRetrieve = () => {
    const {user, storeLocation} = this.props.state
    let params = `get_crockery?StoreId=${storeLocation.id}&Status=10&CustomerId=${user.id}`;
    this.setState({isLoading: true});
    Api.getRequest(Routes.crockeryRetrieve + params , response => {
      let error = {}
      if(typeof response == 'string'){
        error = JSON.parse(response)
      }
      if(error.errors) {
        if(error.errors.internal_server_error != undefined) {
          this.setState({
            alertText: error.errors.internal_server_error[0],
            isError: true
          }, () => {
            this.setState({showError: true})
          })
        }
        return
      }
      this.setState({pending : response.crockery})
      this.setState({isLoading: false});
    }, error => {
      console.log('Retrieve crockery error: ', error)
    })
  }

  scheduledCrockeryRetrieve = () => {
    const {user, storeLocation} = this.props.state
    let params = `StoreId=${storeLocation.id}&Status=40&CustomerId=${user.id}`;
    this.setState({isLoading: true});
    Api.getRequest(Routes.crockeryRetrieve + params , response => {
      let error = {}
      if(typeof response == 'string'){
        error = JSON.parse(response)
      }
      if(error.errors) {
        if(error.errors.internal_server_error != undefined) {
          this.setState({
            alertText: error.errors.internal_server_error[0],
            isError: true
          }, () => {
            this.setState({showError: true})
          })
        }
        return
      }
      this.setState({scheduled : response.crockery})
      this.setState({isLoading: false});
    }, error => {
      console.log('Retrieve crockery error: ', error)
    })
  }

  getOrders = () => {
    this.setState({
      isLoading: true,
    });
    Api.getRequest(
      Routes.ordersRetrieve + '?limit=' + 5 + '&page=' + this.state.pageNumber,
      response => {
        let tempScheduled = []
        let tempPending = []
        response.orders.forEach(el => {
          if(el.order_status.toLowerCase() == 'processing') {
            tempScheduled.push(el)
          }else if(el.order_status.toLowerCase() == 'pending') {
            tempPending.push(el)
          }
        })
        this.setState(prevState => ({
          orders: _.uniqBy([...this.state.orders, ...response.orders], 'id'),
          scheduled: _.uniqBy([...this.state.scheduled, ...tempScheduled], 'id'),
          pending: _.uniqBy([...this.state.pending, ...tempPending], 'id'),
          isLoading: false,
        }));
      },
      error => {
        console.log('error', error);
      },
    );
  };

  retrieveCrockery = () => {
    const { user, storeLocation } = this.props.state
    Api.getRequest(Routes.crockeryRetrieve(user.id, storeLocation.id), response => {
      let tempScheduled = []
      let tempPending = []
      response.crockery.forEach(el => {
        if(el.crockery_status.toLowerCase() === 'pending') {
          tempPending.push(el)
        }else if(el.crockery_status.toLowerCase() === 'pickup') {
          tempScheduled.push(el)
        }
      })
      this.setState(prevState => ({
        crockery: _.uniqBy([...this.state.crockery, ...response.crockery], 'id'),
        scheduled: _.uniqBy([...this.state.scheduled, ...tempScheduled], 'id'),
        pending: _.uniqBy([...this.state.pending, ...tempPending], 'id'),
        isLoading: false,
      }));
      console.log("RETRIEVING CROCKERY RESPONSE ", response.crockery)
    }, error => {
      console.log("RETRIEVING CROCKERY ERROR ", error)
    })
  }

  handlePagination = () => {
    this.setState({pageNumber: this.state.pageNumber + 1}, () => {
      // this.getOrders();
      // this.retrieveCrockery();
      if(this.state.index === 0) {
        console.log('...pagination scheduled...')
        this.scheduledCrockeryRetrieve()
      }else if(this.state.index === 1){
        console.log('...pagination pending...')
        this.pendingCrockeryRetrieve()
      }
    });
  };

  resetPage = () => {
    this.setState({
      pageCount: 0,
    });
  };

  onTabChange = i => {
    console.log("page: ", i)
    this.setState({index: i}, () => {
      if(this.state.index === 0) {
        console.log('...tab change scheduled...')
        this.scheduledCrockeryRetrieve()
      }else if(this.state.index === 1){
        console.log('...tab change pending...')
        this.pendingCrockeryRetrieve()
      }
    });
  };

  getCurrentTab = () => {
    let tab;
    switch (this.state.index) {
      case 0:
        tab = (
          <ScheduledTab
            height={height}
            isLoading={this.state.isLoading}
            orders={this.state.scheduled}
            handlePagination={this.handlePagination}
            resetPage={this.resetPage}
            isLoading={this.state.isLoading}
            navigation={this.props.navigation}
          />
        );
        break;
      case 1:
        tab = (
          <PendingTab
            height={height}
            isLoading={this.state.isLoading}
            orders={this.state.pending}
            handlePagination={this.handlePagination}
            resetPage={this.resetPage}
            isLoading={this.state.isLoading}
            withIcon={true}
            navigation={this.props.navigation}
          />
        );
        break;
      default:
        break;
    }
    return tab;
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Pagination
          activeIndex={this.state.index}
          onChange={this.onTabChange}
          notificationTitle={'PENDING'}
          notificationCount={this.state.pending.length}
        />
        <View>
          { this.state.index === 0 && 
            <ScheduledTab
              height={height}
              isLoading={this.state.isLoading}
              orders={this.state.scheduled}
              handlePagination={this.handlePagination}
              resetPage={this.resetPage}
              isLoading={this.state.isLoading}
              navigation={this.props.navigation}
            />
          }
          { this.state.index === 1 && 
            <PendingTab
              height={height}
              isLoading={this.state.isLoading}
              orders={this.state.pending}
              handlePagination={this.handlePagination}
              resetPage={this.resetPage}
              isLoading={this.state.isLoading}
              withIcon={true}
              navigation={this.props.navigation}
            />
          }
        </View>
        <Alert
          show={this.state.showError}
          text={this.state.alertText}
          onClick={()=> {
            this.setState({ showError: false})
            // if(!this.state.isError){
            //   this.props.router.push('orderSummaryStack');
            // }
          }}
          alertType={this.state.isError == true ? 'error' : 'primary'}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PickupCrockery);
