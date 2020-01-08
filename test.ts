import axios, {AxiosResponse} from 'axios';

const url = 'https://www.auress.org/s/';

const extractCookie = (response: AxiosResponse) => {
  const {headers} = response;
  const cookie: string = headers['set-cookie'][0];

  return cookie.match(/PHPSESSID=([a-z]|[0-9])+/)[0].slice(10);
};

const generateCookie = (value: string): string => `PHPSESSID=${value}`;

interface Config {
  id: number;
  questions: number;
}

const extractData = (html: string): Config => {
  const questionRaw = html.match(/<pitanja>[0-9]/)[0].slice('<pitanja>'.length);
  const questions = parseInt(questionRaw);
  const idRaw = html.match(/<idSobe>[0-9]*/)[0].slice('<idSobe>'.length);
  const id = parseInt(idRaw);

  return {
    id,
    questions,
  };
};

const postService = async (data: string, cookie: string) => {
  return axios.post(url, data, {
    headers: {
      cookie: generateCookie(cookie),
      'Content-Type': 'application/x-www-form-urlencoded',
      credentials: 'include',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0',
    },
  });
};

const sendShort = async (answer: string, cookie: string) => {
  const answerData = `odgovor=${answer.toUpperCase()}&browser=App&device=Apple`;
  return await postService(answerData, cookie);
};

const sendText = async (text: string, cookie: string) => {
  const answerData = `porukaStudenta=${text}&posaljiPoruku=Send+text`;
  return await postService(answerData, cookie);
};

const main = async () => {
  const initResponse = await axios.get(url);
  const cookie = extractCookie(initResponse);

  const loginData = 'idSobe=2013&udiUSobu=Start%0D%0A';
  const loginResponse = await postService(loginData, cookie);

  console.log(cookie);
  console.log(extractData(loginResponse.data));

  await sendShort('A', cookie);
  return sendText('Foo Bar', cookie);
};

main()
  .then(() => console.log('Done'))
  .catch(e => console.error(e));
