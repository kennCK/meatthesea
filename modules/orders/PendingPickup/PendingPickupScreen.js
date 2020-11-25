import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../Style';

class PendingPickupScreen extends Component {
    redirect = (route) => {
        this.props.navigation.push(route);
        console.log(route)
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <View style={styles.TopContainer}>
                        <Text style={[styles.DescriptionContainer]}>Order number 1234</Text>
                    </View>
                    <View style={styles.BottomContainer}>
                        <View style={styles.SubtitleContainer}>
                            <TouchableOpacity onPress={() => {
                                this.redirect("returnInPersonStack")
                            }}>
                            
                                <View style={[styles.LogoContainer]}>
                                    <Image resizeMode={'cover'} source={require('assets/logo1.png')} style={styles.LogoStyle} />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.LogoContainer}>
                                <Image source={require('assets/logo2.png')} style={styles.LogoStyle} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default PendingPickupScreen;