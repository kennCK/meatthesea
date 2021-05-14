import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BasicStyles } from 'common';

class TermsAndCondition extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            <Text style={[BasicStyles.headerTitleStyle, { marginTop: 20, textAlign: 'justify', marginBottom: 20 }]}>TERMS & CONDITIONS</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>Access to this website and the information and material set forth herein (the “Site”) is provided to you subject to the following terms. You understand that your access to and use of this Site constitutes your consent and agreement to abide by these terms.</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify', marginTop: 10 }}>All transactions and other commercial services are conducted based on written agreements between Meat The Sea and its customers, and the terms of those agreements are binding on the parties. No other representation, whether made in person, online, electronically, in written, graphical, or verbal communication, may alter the terms of those agreements except that your use of this service constitutes your agreement to the additional terms and conditions applicable to such use.</Text>

            <Text style={[BasicStyles.headerTitleStyle, { marginTop: 20, textAlign: 'justify', marginBottom: 20 }]}>2ACCESS</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>This Site is not directed to, or intended for distribution to or use by, any person or entity who is a citizen or resident of or located in any jurisdiction where such distribution, publication, availability or use would be contrary to law or regulation or which would subject Meat The Sea or its affiliates (MTS) to any registration or licensing requirement within such jurisdiction.</Text>

            <Text style={[BasicStyles.headerTitleStyle, { marginTop: 20, textAlign: 'justify', marginBottom: 20 }]}>DISCLAIMER</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>The material and information contained in this Site has been produced and collated by MTS in accordance with its current practices and policies and with the benefit of information currently available to it. All reasonable efforts have been made to ensure the accuracy of the contents of the pages of the Site at the time of preparation.</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify', marginTop: 10 }}>Notwithstanding the efforts made by MTS to ensure the accuracy of the Site, no responsibility or liability is accepted by MTS in respect of any use or reference to the Site, and MTS does not warrant or guarantee the adequacy, accuracy or completeness of any information herein or that such information will be delivered in a timely or uninterrupted form. The information and material on this Site is provided “as is”. MTS expressly disclaims any obligation to update any information herein and any liability for inaccuracies and omissions in such information. MTS accepts no liability for losses or damages which may be directly or indirectly sustained by any visitor to the Site or other person who obtains access to the material on the Site.</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify', marginTop: 10 }}>Meat The Sea do not own all pictures. Please note that all images and copyrights belong to their original owners, no copyright infringement intended.</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify', marginTop: 10 }}>NO CLAIMS ACTIONS OR LEGAL PROCEEDINGS IN CONNECTION WITH THIS SITE BROUGHT BY ANY VISITOR OR OTHER PERSON HAVING REFERENCE TO THE MATERIAL WILL BE ENTERTAINED BY MTS.</Text>

            <Text style={[BasicStyles.headerTitleStyle, { marginTop: 20, textAlign: 'justify', marginBottom: 20 }]}>CODE OF CONDUCT</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>While using this Site, you agree not to, by any means (including hacking, cracking or defacing any portion of the Site):</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Restrict or inhibit any authorised user from using this Site;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Use the Site for unlawful purposes;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Harvest or collect information about Site users without their express consent;;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• “Frame” or “mirror” any part of the Site without our prior authorisation;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Engage in spamming or flooding;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Transmit any software or other materials that contain any virus, time bomb, or other harmful or disruptive component;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Remove any copyright, trademark or other proprietary rights notices contained in the Site;</Text>
            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>• Use any device, application or process to retrieve, index, “data mine” or in any way reproduce or circumvent the navigational structure or presentation of the Site;</Text>

            <Text style={[BasicStyles.headerTitleStyle, { marginTop: 20, textAlign: 'justify', marginBottom: 20 }]}>COPYRIGHT</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>The Site’s contents may not be reproduced in whole or in part or otherwise made available without the prior written consent of MTS. Unless specifically indicated otherwise, the pages and contents of this Site including the layout of the site are the copyright of MTS or are protected under third party copyright.</Text>

            <Text style={[BasicStyles.headerTitleStyle, { marginTop: 20, textAlign: 'justify', marginBottom: 20 }]}>LINKED SITES</Text>

            <Text style={[BasicStyles.titleText], { textAlign: 'justify' }}>MTS has not reviewed any of the websites to which this Site links, and is not responsible for the content of any other websites or pages linked to or linking to this Site. Such links are provided solely for your convenience and information. Following links to any other websites or pages shall be at your own risk.</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TermsAndCondition;
