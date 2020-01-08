import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";

// var RCTNetworking = require("RCTNetworking");
// function clearCookies() {
//   RCTNetworking.clearCookies(cleared => {
//     console.log("Cookies cleared, had cookies=" + cleared.toString());
//   });
// }

const url = "http://www.auress.org/";

const Main: React.FC = () => {
  useEffect(() => {
    fetch(url).then(data => console.log(data));
  }, []);

  const data = `<div id="podaci" style="display:none;">
  <init>false</init>
  <idSobe>2013</idSobe>
  <error></error>
  <pitanja>5</pitanja>
</div>`;

  const parser = new DOMParser();
  const out = parser.parseFromString(data, "text/xml");

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View>
        <Text>Foobar</Text>
        <Text>{JSON.stringify(out, null, 4)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Main;
