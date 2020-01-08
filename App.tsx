import React, {useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import axios from 'axios';

import CookieManager from 'react-native-cookie-store';
import RequestService from './services/requestService';

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
    // await clearCookies();

    const roomId = 2013;

    axios
      .get(URL)
      .then(() => CookieManager.get(URL))
      .then(data => {
        console.log(data);

        const postService = new RequestService();
        const loginData = `idSobe=${roomId}&udiUSobu=Start%0D%0A`;
        // await clearCookies();
        return postService.post(loginData);
      })
      .then(data => {
        console.log(data.request);
      });

    // // console.log(loginResponse.data);

    // return {};

    // const config = extractConfig(loginResponse.data);

    // return {
    //   cookie,
    //   config,
    // };
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
