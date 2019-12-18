import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

const Login = () => {
  const [jmbag, setJmbag] = useState<string>("");

  const onChange = (text: string) => {
    setJmbag(text);
  };

  const submit = () => {
    AsyncStorage.setItem("jmbag", jmbag)
      .then(() => {
        alert("done");
      })
      .catch((e) => alert(e));
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        onChangeText={onChange}
        value={jmbag}
        placeholder="JMBAG"
        onSubmitEditing={() => submit()}
        keyboardType="numeric"
        returnKeyType="go"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
      ></TextInput>
      <TouchableOpacity
        onPress={submit}
        style={{ padding: 20, backgroundColor: "red" }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
