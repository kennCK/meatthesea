import React, { Component } from 'react';
import { View } from 'react-native';
import { Color } from 'common';
import { faPhoneAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import ProfileListItem from '../ListItemWithIcon'
class ProfileScreen extends Component {
    state = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com'
    }
    redirect = (route) => {
        this.props.navigation.navigate(route);
        console.log(route)
    }
    render() {
        const { firstname,lastname, email } = this.state;
        const navigations = [

            {
                title: `${firstname} ${lastname}`,
                icon: faUser,
            },
            {
                title: email,
                icon: faEnvelope,
            },
            {
                title: '+825 1234 5678',
                icon: faPhoneAlt,

            },
            {
                title: 'Change Password',
                icon: faLock,
                onPress: () => {
                    alert("test")
                }
            },
        ]
        return (
            <View style={{ flex: 1, backgroundColor: Color.white }} >
                {navigations.map(({ title, icon, onPress }) => (
                    <ProfileListItem {...{
                        title, icon, onPress
                    }} key={title} />
                ))}
            </View>

        );
    }
}

export default ProfileScreen;
