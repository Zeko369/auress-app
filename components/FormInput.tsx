import React, {SetStateAction} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet
} from 'react-native';

import {ReturnType, Type} from '../ts/FormInput';

interface FormInputProps {
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
  onSubmit: ((event: GestureResponderEvent) => void) | undefined;
  type?: Type;
  label?: string;
  returnType?: ReturnType;
  color?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  text,
  setText,
  onSubmit,
  type,
  label,
  returnType,
  color
}) => (
  <View style={{flexDirection: 'row'}}>
    <TextInput
      value={text}
      onChangeText={t => setText(t)}
      style={{...styles.textInput, color: color ?? 'white'}}
      keyboardType={type}
      returnKeyType={returnType}
    />
    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  </View>
);

export default FormInput;

const styles = StyleSheet.create({
  textInput: {
    flex: 3,
    margin: 10,
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  submitButton: {
    padding: 10,
    flex: 1,
    backgroundColor: 'purple',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  label: {color: 'white', fontSize: 15, fontWeight: '800'}
});
