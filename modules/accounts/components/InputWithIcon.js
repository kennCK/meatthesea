import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Color } from 'common';
class InputWithIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            input: null
        }
    }

    setInput(input) {
        this.setState({
            input: input
        })
        this.props.onTyping(input)
    }

    render() {
        let { placeholderTextColor, style, placeholder, icon, iconStyle } = this.props
        return (
            <View style={{
                position: 'relative',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput
                    {...{ placeholderTextColor }}
                    style={style}
                    onChangeText={(input) => this.setInput(input)}
                    value={this.state.input}
                    placeholder={placeholder ? placeholder : 'Input here...'}
                />
                <TouchableHighlight disabled
                    style={[{
                        position: 'absolute',
                        right: 10,
                        top: 20
                    }, iconStyle && iconStyle]}
                    underlayColor={Color.white}
                >
                    <FontAwesomeIcon color={Color.white} icon={icon} size={20} />
                </TouchableHighlight>
            </View>
        );
    }
}

export default InputWithIcon;