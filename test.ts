import axios from 'axios';
import fetch from 'node-fetch';
import {extractConfig} from './parser';

const URL = 'https://auress.org/s/';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0'
};

const post = async (body: string, cookie: string) => {
  return fetch(URL, {
    method: 'POST',
    body,
    // credentials: 'include',
    headers: {
      ...headers,
      cookie: `PHPSESSID=${cookie}`
    }
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

    const cookie = setCookie[0].split('PHPSESSID=')[1].split(';')[0];

    const res = await post(loginData, cookie);
    const html = await res.text();

    // console.log(extractConfig(html));

    const cookie2 = (res.headers as any)
      .get('set-cookie')
      .split('PHPSESSID=')[1]
      .split(';')[0];
    // console.log(cookie, cookie2);

    return {
      status: 'Created new login',
      raw: html,
      config: extractConfig(html),
      cookie: cookie2
    };
  }
};

export const sendShort = async (answer: string, cookie: string) => {
  const answerData = `odgovor=${answer.toUpperCase()}&browser=App&device=Apple`;
  const res = await post(answerData, cookie);
  // console.log(res.headers);
  return await res.text();
};

export const sendText = async (text: string, cookie: string) => {
  const answerData = `porukaStudenta=${text}&posaljiPoruku=Send+text`;
  const res = await post(answerData, cookie);
  // console.log(res.headers);
  return await res.text();
};

setInterval(() => {
  connect(7063).then(data => {
    const {cookie, config} = data;

    // console.log(config);

    sendShort(
      String.fromCharCode(65 + Math.floor(Math.random() * 5)),
      cookie
    ).then(data => {
      console.log(
        data.split('style="width:90%">Answers:  ')[1].split('</div>')[0]
      );
    });
  });
}, 0);
