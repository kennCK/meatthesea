import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles } from 'common';
import { connect } from 'react-redux';
import PendingPickup from './PendingPickup';

class HeaderOptions extends Component {
    constructor(props) {
        super(props);
    }
    back = () => {
        this.props.navigationProps.navigate('drawerStack');
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.back.bind(this)}>
                    {/*Donute Button Image */}
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={BasicStyles.iconSize}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
    const { actions } = require('@redux');
    return {
        logout: () => dispatch(actions.logout()),
    };
};

const PendingPickupStack = createStackNavigator({
    pendingPickupScreen: {
        screen: PendingPickup,
        navigationOptions: ({ navigation }) => ({
            title: 'Pending Pickup',
            headerLeft: <HeaderOptions navigationProps={navigation} />,
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
});

const styles = StyleSheet.create({
    iconStyle: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PendingPickupStack);