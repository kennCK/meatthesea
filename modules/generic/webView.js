import React, {Component} from 'react'
import { WebView } from 'react-native-webview'
import { ActivityIndicator, StyleSheet } from 'react-native'

class Browser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if(new Object(this.props.navigation.state.params).length === 0) {
            this.props.navigation.pop();
        }
    }

    LoadingIndicatorView = () => {
        return <ActivityIndicator color='#009b88' size='large' style={{
            flex: 1,
            justifyContent: 'center'
        }} />
    }

    handleNavigationStateChange = (event) => {
        console.log('[WEB VIEW] ', event)
        if(event.url.includes('paypalSuccess')) {
            this.props.navigation.navigate('orderPlacedStack');
            return;
        }
    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <WebView
                source={{ uri: params.link }}
                renderLoading={this.LoadingIndicatorView}
                startInLoadingState={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                onNavigationStateChange = {this.handleNavigationStateChange}
            />
        )
    }
}

export default Browser;
