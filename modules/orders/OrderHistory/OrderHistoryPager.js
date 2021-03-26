import React, {Component} from 'react';
import styles from './Style';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Color, BasicStyles} from 'common';
import Helper from './Helper';
import { createStackNavigator } from 'react-navigation-stack';
import CompletedTab from './tabs/CompletedTab';
import PendingTab from './tabs/PendingTab';
import Api from 'services/apiv2/index.js';
import {Routes} from 'common';
import _ from 'lodash';
import {connect} from 'react-redux';
import { Spinner } from 'components';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Pager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      orders: [],
      orderLength: 0,
      pageNumber: 1,
      isLoading: false,
      completed: [],
      pending: [],
      pendingLength: 0
    };
  }

  componentDidMount() {
    this.completedOrdersRetrieve();
    this.pendingOrdersLength();
  }

  pendingOrdersLength = () => {
    const {user} = this.props.state
    let params = `?Status=10&CustomerId=${user.id}`;
    Api.getRequest(Routes.ordersCount + params , response => {
      this.setState({pendingLength : response.count})
    }, error => {
      console.log('Retrieve pending count error: ', error)
    })
  }

  pendingOrdersRetrieve = () => {
    const {user} = this.props.state
    let params = `?Status=10&CustomerId=${user.id}`;
    this.setState({isLoading: true});
    Api.getRequest(Routes.ordersRetrieve + params , response => {
      this.setState({pending : response.orders})
      this.setState({isLoading: false});
    }, error => {
      console.log('Retrieve orders error: ', error)
    })
  }

  completedOrdersRetrieve = () => {
    const {user} = this.props.state
    let params = `?Status=30&CustomerId=${user.id}`;
    this.setState({isLoading: true});
    Api.getRequest(Routes.ordersRetrieve + params , response => {
      this.setState({completed : response.orders})
      this.setState({isLoading: false});
    }, error => {
      console.log('Retrieve orders error: ', error)
    })
  }

  handlePagination = () => {
    this.setState({pageNumber: this.state.pageNumber + 1}, () => {
      if(this.state.activeIndex === 0) {
        this.completedOrdersRetrieve()
      }else if(this.state.activeIndex === 1){
        this.pendingOrdersRetrieve()
      }
    });
  };

  setActiveIndex = (index) => {
    this.setState({activeIndex: index}, () => {
      if(this.state.activeIndex === 0) {
        this.completedOrdersRetrieve()
      }else if(this.state.activeIndex === 1){
        this.pendingOrdersRetrieve()
      }
    })
  }

  onTabChange = i => {
    this.setState({activeIndex: i});
  };

  getCurrentTab = () => {
    let tab;
    switch (this.state.activeIndex) {
      case 0:
        tab = (
          <View>
            {/* {console.log('===00000===> ', this.filterOrder('completed'))} */}
          <CompletedTab
            height={height}
            isLoading={this.state.isLoading}
            orders={this.state.completed}
            handlePagination={this.handlePagination}
            resetPage={this.resetPage}
            isLoading={this.state.isLoading}
            navigation={this.props.navigation}
          />
          </View>
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
    const {isLoading} = this.state
    return (
      <View>
        <View style={{height: 60, paddingTop: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Helper.pagerMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.setActiveIndex(index)}
                style={{
                  width: width / 2,
                  borderBottomWidth: 8,
                  borderBottomColor:
                    this.state.activeIndex == index ? Color.primary : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={[
                    styles.TitleContainer,
                    {alignSelf: 'center', justifyContent: 'center'},
                  ]}>
                  <Text
                    style={{
                      fontSize: BasicStyles.titleText.fontSize,
                      color:
                        this.state.activeIndex == index
                          ? Color.primary
                          : '#5F5F5F',
                    }}>
                    {item.title}
                  </Text>
                  
                  {item.title === 'PENDING' && (
                    <View style={[styles.NotificationContainer, {
                      marginLeft: 10
                    }]}>
                      <Text style={styles.NotificationTextStyle}>
                        {this.state.pendingLength}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View>
          { this.state.activeIndex === 0 && 
            <CompletedTab
              height={height}
              isLoading={this.state.isLoading}
              orders={this.state.completed}
              handlePagination={this.handlePagination}
              resetPage={this.resetPage}
              isLoading={this.state.isLoading}
              navigation={this.props.navigation}
            />
          }
          { this.state.activeIndex === 1 && 
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
        {isLoading ? <Spinner mode="overlay"/> : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
