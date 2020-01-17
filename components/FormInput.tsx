import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';

// type="numeric"
//         label="Join room"
//         return="go"

const FormInput = ({
  text,
  setText,
  onSubmit,
  type,
  label,
  returnType,
  color
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        value={text}
        onChangeText={t => setText(t)}
        style={{
          flex: 3,
          margin: 10,
          color: color ?? 'white',
          fontSize: 20,
          borderRadius: 5,
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderStyle: 'solid'
        }}
        keyboardType={type}
        returnKeyType={returnType}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          flex: 1,
          backgroundColor: 'purple',
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5
        }}
        onPress={onSubmit}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormInput;
