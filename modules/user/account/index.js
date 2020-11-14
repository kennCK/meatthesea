import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BasicStyles } from 'common';
import AccountScreen from './AccountScreen';
import { connect } from 'react-redux';
import SavedAddress from 'modules/savedAddress';
import AddAddress from 'modules/addAddress';
import Settings from 'modules/settings'
import PaymentDetails from 'modules/payment'
import TermsAndConditions  from 'modules/termsAndCondition'
class HeaderOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: true,
        };
    }
    goBack = () => {
        let { navigationProps } = this.props
        navigationProps.goBack(null);
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {this.state.loginState === true && (
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        {/*Donute Button Image */}
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size={BasicStyles.iconSize}
                            style={styles.iconStyle}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    iconStyle: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
    const { actions } = require('@redux');
    return {
        setActiveRoute: (route) => dispatch(actions.setActiveRoute(route)),
    };
};

let Header = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderOptions);

const StackNavigator = createStackNavigator({
    accountScreen: {
        screen: AccountScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Account',
            headerLeft: () => <Header navigationProps={navigation} />,
            headerTintColor: 'black',
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 60,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }),
    },

    savedAddressScreen: {
        screen: SavedAddress,
        navigationOptions: ({ navigation }) => ({
            title: 'Saved Address',
            headerLeft: () => <Header navigationProps={navigation} />,
            headerTintColor: 'black',
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 60,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }),
    },

    addAddressScreen: {
        screen: AddAddress,
        navigationOptions: ({ navigation }) => ({
            title: 'Add Address',
            headerLeft: () => <Header navigationProps={navigation} />,
            headerTintColor: 'black',
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 60,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }),
    },
    
    settingsScreen: {
        screen: Settings,
        navigationOptions: ({ navigation }) => ({
            title: 'Settings',
            headerLeft: () => <Header navigationProps={navigation} />,
            headerTintColor: 'black',
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 60,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }),
    },
    paymentDetailsScreen: {
        screen: PaymentDetails,
        navigationOptions: ({ navigation }) => ({
            title: 'Payment Details',
            headerLeft: () => <Header navigationProps={navigation} />,
            headerTintColor: 'black',
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 60,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }),
    },
    termsAndConditionScreen: {
        screen: TermsAndConditions,
        navigationOptions: ({ navigation }) => ({
            title: 'Terms and Conditions',
            headerLeft: () => <Header navigationProps={navigation} />,
            headerTintColor: 'black',
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 60,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }),
    },

}, {
        title: 'Main',
        initialRouteName: 'accountScreen',
    });

export default StackNavigator;
