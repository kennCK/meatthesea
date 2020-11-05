import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import { BasicStyles, Color } from 'common';
import {faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
var radio_props = [
  {label: 'MasterCard ending 1234', value: 0 },
  {label: 'Visa ending 1234', value: 1 },
];

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value3Index: 0
    }
  }

  click(ndx){
    this.setState({value3Index: ndx})
  }

  render() {
    return (
        <View style={[{flex: 1}]}>
        <ScrollView showsHorizontalScrollIndicator={false} style={[{flex: 1}]}>
          
            <RadioForm animation={true} style={[{alignItems: 'center'}]}>
              {
                radio_props.map((obj, i, j) => (
                  <View style={[{borderBottomWidth: 1, borderBottomColor: Color.lightGray, width:'100%', flexDirection:'row', padding: 20}]} key={i}>
                    <RadioButton labelHorizontal={true}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.value3Index === i}
                        onPress={() => this.click(i)}
                        buttonSize={10}
                        buttonInnerColor={Color.primary}
                        buttonOuterColor={Color.primary}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        onPress={() => this.click(i)}
                        labelStyle={{fontSize: 18}}
                        labelWrapStyle={{marginLeft: 10}}
                      />
                    </RadioButton>
                    <TouchableOpacity style={[{marginLeft: 'auto'}]}>
                      <FontAwesomeIcon icon={faTrashAlt} size={20} style={[{color: Color.primary}]} />
                    </TouchableOpacity>
                  </View>
                ))
              }  
            </RadioForm>
        </ScrollView>
        <View style={[{alignItems: 'center'}]}>
          <TouchableHighlight style={[BasicStyles.btn, Color.gray]} underlayColor={Color.gray}>
            <View style={[{flexDirection:'row', alignItems: 'center'}]}>
              <FontAwesomeIcon icon={faPlus} size={15} style={[{color: Color.white}]} />
              <Text style={[BasicStyles.textWhite, {paddingLeft: 10}]}>ADD CREDIT CARD</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Payment;
