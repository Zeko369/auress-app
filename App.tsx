import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <View style={{ flex: 1, flexDirection: "column", margin: 20 }}>
        <View style={{ flexDirection: "row", height: 30, margin: 10 }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: "red" }}>
            <Text>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: "green" }}>
            <Text>B</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", height: 30, margin: 10 }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: "blue" }}>
            <Text>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: "yellow" }}>
            <Text>D</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
