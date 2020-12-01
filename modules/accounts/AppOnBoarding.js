import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Image, TouchableHighlight, Text, ScrollView } from 'react-native';
import Style from './Style.js';
import { Spinner } from 'components';
import Api from 'services/apiv2/index.js';
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
            location: '',
            stores: []
        };
    }

    getLocations() {

    }

    getData = async () => {
        let checkToken = (_expiry) => {
            if (_expiry < new Date().getTime() / 1000) {
                this.props.logout();
            } else {
                this.props.navigation.push('homepageStack');
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

    componentDidMount() {
        this.setState({ isLoading: true })
        this.getData();
        Api.getRequest(Routes.storeRetrieveAll,
            response => {
                this.setState({ isLoading: false })
                this.setState({ stores: response.stores })
            },
            error => {
                this.setState({ isLoading: false })
                alert("Something went wrong")
            })

    }

    redirect = (route) => {
        this.props.navigation.push(route);
    }

    submit() {
        // const { location } = this.state;
        if (this.validate() == false) {
            return
        }
        this.props.navigation.push('homepageStack');

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
                {isLoading ? <Spinner mode="overlay" /> : null}

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
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: Color.gray
                            }}>Deliver to:
                            </Text>
                        </View>
                        <LocationWithIcon {...{
                            style: { height: 50, marginTop: 15 },
                            selected: this.state.location,
                            placeholder: "Current location",
                            iconHeight: 20,
                            stores: this.state.stores,
                            onSelect: (selectedItem) => {
                                this.props.setLocation(selectedItem)
                                this.setState({ location: selectedItem.name })
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
        setLocation: (location) => dispatch(actions.setLocation(location)),
        logout: () => dispatch(actions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppOnBoarding);
