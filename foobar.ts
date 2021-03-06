import axios from 'axios';
import CookieManager from '@react-native-community/cookies';
import {extractConfig} from './parser';

const URL = 'https://auress.org/s/';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0'
};

const post = async (body: string) => {
  return fetch(URL, {
    method: 'POST',
    body,
    credentials: 'include',
    headers
  });
};

export const connect = async (roomId: number) => {
  const initResponse = await axios.get(URL);
  const setCookie = initResponse.headers['set-cookie'];

  // console.log(setCookie);

  if (setCookie === undefined) {
    const body = initResponse.data;
    return {
      status: 'Already Logged in',
      raw: body,
      config: extractConfig(body)
    };
  } else {
    const loginData = `idSobe=${roomId}&udiUSobu=Start%0D%0A`;

    const res = await post(loginData);
    const html = await res.text();

    // console.log(res.headers);

    return {
      status: 'Created new login',
      raw: html,
      config: extractConfig(html)
    };
  }
};

export const sendShort = async (answer: string) => {
  const answerData = `odgovor=${answer.toUpperCase()}&browser=App&device=Apple`;
  return await (await post(answerData)).text();
};

export const sendText = async (text: string) => {
  const answerData = `porukaStudenta=${text}&posaljiPoruku=Send+text`;
  return await (await post(answerData)).text();
};

export const login = async (id: string) => {
  const html = await sendText(`JMBAG=${id}`);
  const query = html.match(/>Room ID: [0-9]* \(([a-z]|[A-Z]|\ )*/);

  const username = query && query[0].split('(')[1];
  return username;
};

export const logout = async () => {
  return axios.get(`${URL}logout.php`).then(() => CookieManager.clearAll());
};
