import React, { Component } from 'react';
import { View } from 'react-native';
import { Color } from 'common';
import { faPhoneAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import ProfileListItem from '../ListItemWithIcon'
class ProfileScreen extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        id: '',
        phone_number: ''
    }
    redirect = (route) => {
        this.props.navigation.push(route);
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        if (params.user) {
            let { customer_guid, first_name, email, last_name } = params.user
            this.setState({
                firstname: first_name,
                lastname: last_name,
                email: email,
                id: customer_guid,
                phone_number: params.user.billing_address.phone_number
            })
        }
    }
    render() {
        const { firstname, lastname, email, phone_number } = this.state;
        const navigations = [
            {
                value: `${firstname} ${lastname}`,
                icon: faUser,
            },
            {
                value: email,
                icon: faEnvelope,
            },
            {
                value: phone_number,
                icon: faPhoneAlt,

            },
            {
                value: 'Change Password',
                icon: faLock,
                onPress: () => {
                   this.redirect("changePasswordStack")
                }
            },
        ]
        return (
            <View style={{ flex: 1, backgroundColor: Color.white }} >
                {navigations.map(({ value, icon, onPress }, id) => (
                    <ProfileListItem {...{
                        title: value, icon, onPress
                    }} key={id} />
                ))}
            </View>

        );
    }
}

export default ProfileScreen;
