import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BasicStyles } from 'common';
import OrderSummaryScreen from './OrderedSummary';
import { connect } from 'react-redux';

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
    orderSummaryScreen: {
        screen: OrderSummaryScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Order Placed',
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
        initialRouteName: 'orderSummaryScreen',
    });

export default StackNavigator;
