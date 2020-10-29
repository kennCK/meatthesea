import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Image, TouchableHighlight, Text, ScrollView } from 'react-native';
import Style from './Style.js';
import { Spinner } from 'components';
import Api from 'services/api/index.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import CustomError from 'components/Modal/Error.js';
import Header from './Header';
import config from 'src/config';
import LocationWithIcon from './components/LocationInput.js';
class AppOnBoarding extends Component {
    //Screen1 Component
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            token: null,
            error: 0,
            errorMessage: null,
            isResponseError: false,
            location: ''
        };
    }

    componentDidMount() {
    }

    redirect = (route) => {
        this.props.navigation.navigate(route);
    }

    submit() {
        // const { location } = this.state;
        if (this.validate() == false) {
            return
        }
        // this.setState({ isLoading: true })
        // Api.request(Routes.accountCreate, parameter, response => {
        //     this.setState({ isLoading: false })
        //     // if (response.error !== null) {

        //     // }
        // }, error => {
        //     this.setState({ isResponseError: true })
        // })
    }

    validate() {
        const { location } = this.state;
        if (!location) {
            this.setState({ errorMessage: 'Please select your location.' })
            return false
        }
    }

    render() {
        const { isLoading, errorMessage, isResponseError } = this.state;
        return (
            <ScrollView style={Style.ScrollView}>

                <View style={Style.MainContainer}>
                    <Header params={"AppOnBoarding"} lg ></Header>
                    {
                        errorMessage != null && (
                            <View style={{
                                flexDirection: 'row',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                                <Text style={[Style.messageText, {
                                    fontWeight: 'bold'
                                }]}>Oops! </Text>
                                <Text style={Style.messageText}>{errorMessage}</Text>
                            </View>
                        )
                    }
                    <View style={[Style.TextContainer, { marginTop: errorMessage != null ? 20 : 50 }]}>
                        <LocationWithIcon {...{
                            style: { height: 50, marginTop: 15 },
                            selected: this.state.location,
                            placeholder: "Current location",
                            iconHeight:20,
                            onSelect: (selected) => {
                                this.setState({ location: selected })
                            }
                        }} />
                        <TouchableHighlight
                            style={[BasicStyles.btn, Style.btnWhite]}
                            onPress={() => this.submit()}
                            underlayColor={Color.gray}>
                            <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                                BROWSE AS GUEST
                        </Text>
                        </TouchableHighlight>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 30
                        }}>
                            <Text style={{
                                color: Color.gray
                            }}>*Sign up is required to place orders.
                            </Text>
                        </View>
                        <View style={{ marginTop: 70 }}>
                            <TouchableHighlight
                                style={[Style.btnWhite, Style.btnSm, Style.btnLight]}
                                onPress={() => this.redirect('loginStack')}
                                underlayColor={Color.gray}>
                                <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                                    LOGIN
                        </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={[Style.btnWhite, Style.btnSm]}
                                onPress={() => this.redirect('registerStack')}
                                underlayColor={Color.gray}>
                                <Text style={[Style.textPrimary, Style.fontWeight('bold'), Style.fontSize(18)]}>
                                    SIGNUP
                        </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                {isLoading ? <Spinner mode="overlay" /> : null}
                {isResponseError ? <CustomError visible={isResponseError} onCLose={() => {
                    this.setState({ isResponseError: false, isLoading: false })
                }} /> : null}
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
    const { actions } = require('@redux');
    return {
        login: (user, token) => dispatch(actions.login(user, token)),
        logout: () => dispatch(actions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppOnBoarding);
