import axios from 'axios';
import RequestService from './requestService';

import {Config, extractConfig, extractCookie} from './parsers';
import CookieManager from 'react-native-cookie-store';

interface ConnectResponse {
  cookie: string;
  config: Config;
}

const URL = 'https://auress.org/s';

const connect = async (roomId: number): Promise<ConnectResponse | {}> => {
  // CookieManager.clearAll().then(res => {
  //   console.log('CookieManager.clearAll =>', res);
  //   fetch(URL).then(res => {
  //     console.log(res.headers['map']['set-cookie']);
  //     CookieManager.get(URL).then(data => {
  //       console.log('CookieManager.get =>', data); // => 'user_session=abcdefg; path=/;'
  //     });
  //   });
  // });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  return {};

  await CookieManager.clearAll();

  let cookies = await CookieManager.get(URL);
  console.log('Cookies1: ', cookies);

  // const initResponse = await fetch(URL);

  await new Promise(r => {
    fetch(URL).then(() => {
      CookieManager.get(URL).then(data => {
        console.log('CookieManager.get =>', data); // => 'user_session=abcdefg; path=/;'
        r();
      });
    });
  });

  // console.log(initResponse.headers['set-cookie']);

  cookies = await CookieManager.get(URL);
  console.log('Cookies2: ', cookies);

  const postService = new RequestService('cookie');
  const loginData = `idSobe=${roomId}&udiUSobu=Start%0D%0A`;
  // await clearCookies();
  const loginResponse = await postService.post(loginData);

  // console.log(loginResponse.data);

  // return {};

  const config = extractConfig(loginResponse.data);

  return {
    cookie: 'cookie',
    config,
  };
};

export default connect;
