import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "axios";
import qs from "qs";
import { decode, encode } from 'base-64';
import common from '../../common/Color.js';

const Paypal = () => {
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState("");

  //Fix bug btoa
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }, [])


  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(true)

  /*---Paypal checkout section---*/
  const buyBook = async () => {

    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "currency": "AUD",
          "total": "26",
          "details": {
            "shipping": "6",
            "subtotal": "20",
            "shipping_discount": "0",
            "insurance": "0",
            "handling_fee": "0",
            "tax": "0"
          }
        },
        "description": "This is the payment transaction description",
        "payment_options": {
          "allowed_payment_method": "IMMEDIATE_PAY"
        }, "item_list": {
          "items": [{
            "name": "Book",
            "description": "Chasing After The Wind",
            "quantity": "1",
            "price": "20",
            "tax": "0",
            "sku": "product34",
            "currency": "AUD"
          }]
        }
      }],
      "redirect_urls": {
        "return_url": "https://example.com/",
        "cancel_url": "https://example.com/"
      }
    }

    const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

    const data = {
      grant_type: 'client_credentials'

    };

    const auth = {
      username: "AW1cZfnG5cAVYqasdYCIEhEA9Ns7d32WaOJS9sD_6tebpCHVYBgnceBq79R7CL-Y8QZtUh9J2m7fPp8e",  //"your_paypal-app-client-ID",
      password: "EG4YdQOExnJK378_miOeMUa3bodhmj2bGlseQwZMfN_6FATqo5sqwdoQlUuSp5aw1RMd6-nV1WkOXs8b"   //"your-paypal-app-secret-ID


    };

    const options = {

      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': true
      },

      data: qs.stringify(data),
      auth: auth,
      url,
    };

    axios(options).then(response => {
      setAccessToken(response.data.access_token)

      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.data.access_token}`
          }
        }
      )
        .then(response => {
          const { id, links } = response.data
          const approvalUrl = links.find(data => data.rel == "approval_url").href

          console.log("response", links)
          setPaypalUrl(approvalUrl)
        }).catch(err => {
          console.log({ ...err })
        })
    }).catch(err => {
      console.log(err)
    })
  };

  /*---End Paypal checkout section---*/

  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true)
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log("================webViewState", webViewState)

    if (webViewState.title == "") {
      setShouldShowWebviewLoading(false)
    }

    if (webViewState.url.includes('https://example.com/')) {
      setPaypalUrl(null)
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
        .then(response => {
          SetIsWebViewLoading(false)
          setShouldShowWebviewLoading(true)
          console.log(response)

        }).catch(err => {
          setShouldShowWebviewLoading(true)
          console.log({ ...err })
        })

    }
  }


  return (
    <React.Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={buyBook}
          style={
            styles.btn
          }>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '400',
              textAlign: 'center',
              color: 'white',
            }}>
            Check Out
          </Text>
        </TouchableOpacity>
        <Text>
          Currently using developer's paypal account
        </Text>
      </View>
      {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={{ height: "100%", width: "100%" }}
            source={{ uri: paypalUrl }}
            onNavigationStateChange={_onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => SetIsWebViewLoading(false)}
          />
        </View>
      ) : null}
      {isWebViewLoading ? (
        <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
          <ActivityIndicator size="small" color={common.primary} />
        </View>
      ) : null}
    </React.Fragment>
  );
};

Paypal.navigationOptions = {
  title: 'App',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: common.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 300,
  },
});
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps) (Paypal)
// export default connect(mapStateToProps, mapDispatchToProps)(Paypal)
