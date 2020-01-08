import { AxiosResponse } from "axios";

interface Config {
  id: number;
  questionCount: number;
}

const extractConfig = (html: string): Config => {
  const questionRaw = html.match(/<pitanja>[0-9]/)[0].slice("<pitanja>".length);
  const questionCount = parseInt(questionRaw);
  const idRaw = html.match(/<idSobe>[0-9]*/)[0].slice("<idSobe>".length);
  const id = parseInt(idRaw);

  return {
    id,
    questionCount
  };
};

const extractCookie = ({ headers }: AxiosResponse) => {
  const cookie: string = headers["set-cookie"][0];
  return cookie.match(/PHPSESSID=([a-z]|[0-9])+/)[0].slice(10);
};

export { extractConfig, Config, extractCookie };
