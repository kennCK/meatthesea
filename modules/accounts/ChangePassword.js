import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Image, TouchableHighlight, Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Style from './Style.js';
import { Spinner } from 'components';
import PasswordWithIcon from './components/Password.js';
import CustomError from 'components/Modal/Error.js';
import Api from 'services/apiv2/index.js';
import CommonRequest from 'services/CommonRequest.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import Header from './Header';
import config from 'src/config';
import Pusher from 'services/Pusher.js';
import SystemVersion from 'services/System.js';
import { Player } from '@react-native-community/audio-toolkit';
import OtpModal from 'components/Modal/Otp.js';
import { Notifications, NotificationAction, NotificationCategory } from 'react-native-notifications';
class Login extends Component {
    //Screen1 Component
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false,
            error: 0,
            isResponseError: false,
        };
    }

    getData = async () => {
        let checkToken = (_expiry) => {
            if (_expiry < new Date().getTime() / 1000) {
                this.props.logout();
            } else {
                this.props.navigation.navigate('homepageStack');
            }
        }

        try {
            const token = await AsyncStorage.getItem(Helper.APP_NAME + 'token');
            const token_expiration = await AsyncStorage.getItem(Helper.APP_NAME + 'token_expiration');
            if (token != null) {
                this.setState({ token });
                setInterval(() => {
                    checkToken(token_expiration)
                }, 1000)
            }
        } catch (e) {
            // error reading value
        }
    }

    redirect = (route) => {
        this.props.navigation.navigate(route);
    }
    submit() {
        const { confirmPassword, newPassword, currentPassword } = this.state
        if (newPassword != confirmPassword) {
            this.setState({ error: 2 })
        }
        if (!confirmPassword || !newPassword || !currentPassword) {
            this.setState({ error: 1 })
        }

    }

    render() {
        const { isLoading, error, isResponseError } = this.state;
        return (
            <ScrollView contentContainerStyle={Style.container} style={Style.ScrollView}>
                <View style={Style.MainContainer}>
                    <Header params={"Change Password"}></Header>
                    {error > 0 ? <View style={Style.messageContainer}>
                        {error == 1 ? (
                            <Text style={Style.messageText}>Please fill up the required fields.</Text>
                        ) : null}

                        {error == 2 ? (
                            <Text style={Style.messageText}>Passwords didn't match.</Text>
                        ) : null}
                    </View> : null}

                    <View style={Style.TextContainer}>

                        <PasswordWithIcon {...Style.textPlaceHolder} placeholder={'Current Password'} style={[Style.textInput, BasicStyles.textWhite, { marginTop: 10 }]} value={this.state.currentPassword} onTyping={(input) => this.setState({
                            currentPassword: input
                        })} />
                        <PasswordWithIcon {...Style.textPlaceHolder} placeholder={'New Password'} style={[Style.textInput, BasicStyles.textWhite, { marginTop: 10 }]} value={this.state.newPassword} onTyping={(input) => this.setState({
                            newPassword: input
                        })} />
                        <PasswordWithIcon {...Style.textPlaceHolder} placeholder={'Confirm Password'} style={[Style.textInput, BasicStyles.textWhite, { marginTop: 10 }]} value={this.state.confirmPassword} onTyping={(input) => this.setState({
                            confirmPassword: input
                        })} />

                        <TouchableHighlight
                            style={[BasicStyles.btn, Style.btnWhite, { marginTop: 15 }]}
                            onPress={() => this.submit()}
                            underlayColor={Color.gray}>
                            <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                                Change Password
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

                {isLoading ? <Spinner mode="overlay" /> : null}
                {
                    isResponseError ? <CustomError visible={isResponseError} onCLose={() => {
                        this.setState({ isResponseError: false, isLoading: false })
                    }} /> : null
                }
            </ScrollView >

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
