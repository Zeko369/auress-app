import axios from 'axios';
import CookieManager from 'react-native-cookie-store';
import {extractConfig} from './services/parsers';

const URL = 'https://auress.org/s/';

export const connect = async (roomId: number) => {
  return CookieManager.clearAll().then(() =>
    axios
      .get(URL)
      .then(data => {
        console.log('SetCookie: ', data.headers['set-cookie']);

        return CookieManager.get(URL);
      })
      .then(() => {
        const loginData = `idSobe=${roomId}&udiUSobu=Start%0D%0A`;

        return fetch(URL, {
          method: 'POST',
          body: loginData,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0',
          },
        });
      })
      .then(data => {
        return data.text();
      })
      .then(html => {
        return extractConfig(html);
      }),
  );
};
