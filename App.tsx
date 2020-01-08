import React, {useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import CookieManager from 'react-native-cookie-store';
import {connect} from './foobar';

const URL = 'https://auress.org/s/';

const run = () => {
  CookieManager.clearAll().then(res => {
    console.log('CookieManager.clearAll =>', res);
    fetch(URL).then(res => {
      console.log(res.headers['map']['set-cookie']);
      CookieManager.get(URL).then(data => {
        console.log('CookieManager.get =>', data); // => 'user_session=abcdefg; path=/;'
      });
    });
  });
};

const App = () => {
  useEffect(() => {
    console.log('BEGIN: ----------------');

    connect(6387)
      .then(data => {
        console.log(data);
      })
      .catch(e => console.error(e));
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
