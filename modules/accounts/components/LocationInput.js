import React from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import { Color, BasicStyles } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Style from '../Style';
import LocationsList from './LocationList';



export default class LocationInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false
    };

  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  callback = selected => {
    this.props.onSelect(selected)
    setTimeout(() => {
      this.setModalVisible(false);
    }, 100)
    
  }


  render() {
      let { modalVisible } = this.state
      let { stores, selected, placeholder, iconHeight = 15, style, iconStyle = {
          position: 'absolute',
          right: 10,
          top: 12
      }, disabled, placeholderColor, backgroundColor } = this.props
      return (
        <View>
          <TouchableHighlight
            style={[BasicStyles.btn, Style.textInput, style, {
              backgroundColor: backgroundColor ? backgroundColor : BasicStyles.btn.backgroundColor
            }]}
            onPress={() => this.setModalVisible(!modalVisible)}
            underlayColor={Color.gray}  
            disabled={disabled}
          >
            <>
              <Text style={[{ 
                alignSelf: 'flex-start', 
                color: placeholderColor ? placeholderColor : Color.gray,
              }]}>
                {!selected ? placeholder : selected}
              </Text>
              <TouchableHighlight
                style={iconStyle}
                disabled
              >
                <FontAwesomeIcon color={placeholderColor ? placeholderColor : Color.gray} icon={faMapMarkerAlt} size={iconHeight} />
              </TouchableHighlight>
            </>
          </TouchableHighlight>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            >
              <TouchableWithoutFeedback onPress={() => {
                this.setModalVisible(false);
              }}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {
                    stores.length > 0 ? <LocationsList {...{ callback: this.callback, selected, stores }} /> : <Text>No Locations available at the moment</Text>
                  }
                </View>
              </View>
          </Modal>
        </View >
      );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 2,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Style.getWidth() - 87
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
});
