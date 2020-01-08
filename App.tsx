import React, {useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import CookieManager from 'react-native-cookie-store';

const URL = 'https://auress.org/s/';

const App = () => {
  useEffect(() => {
    CookieManager.clearAll().then(res => {
      console.log('CookieManager.clearAll =>', res);
      fetch(URL).then(res => {
        console.log(res);
        CookieManager.get(URL).then(data => {
          console.log('CookieManager.get =>', data); // => 'user_session=abcdefg; path=/;'
        });
      });
    });
  });

  return (
    <SafeAreaView>
      <View>
        <Text>Foobar</Text>
      </View>
    </SafeAreaView>
  );
};
export default App;
