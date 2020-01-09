import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface AnswerButtonProps {
  onPress: () => void;
  text: string;
  color: string;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({onPress, text, color}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, {backgroundColor: color}]}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default AnswerButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  text: {
    fontSize: 30,
    color: 'white'
  }
});
