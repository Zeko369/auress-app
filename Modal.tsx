import React from 'react';
import {Modal, Alert, View, Text, TouchableHighlight} from 'react-native';

const MyModal: React.FC<any> = ({modalOpen, setModalOpen}) => (
  <Modal
    animationType="slide"
    visible={modalOpen}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}>
    <View style={{marginTop: 22}}>
      <View>
        <Text>Hello World!</Text>

        <TouchableHighlight
          onPress={() => {
            setModalOpen(false);
          }}>
          <Text>Hide Modal</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

export default MyModal;
