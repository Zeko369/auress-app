interface Config {
  id: number;
  questionCount: number;
}

const DEFAULT_QUESTIONS = '5';
const DEFAULT_ID = '1234';

const extractConfig = (html: string): Config => {
  const questionReg = html.match(/<pitanja>[0-9]/);
  const questionRaw = questionReg && questionReg[0].slice('<pitanja>'.length);
  const questionCount = parseInt(questionRaw || DEFAULT_QUESTIONS);
  const idReg = html.match(/<idSobe>[0-9]*/);
  const idRaw = idReg && idReg[0].slice('<idSobe>'.length);
  const id = parseInt(idRaw || DEFAULT_ID);

  return {
    id,
    questionCount
  };
};

const extractMyAns = (html: string): string => {
  return html
    .split('Answers')[1]
    .split('</div>')[0]
    .slice(3);
  // .split('), ');
};

const extractMyText = (html: string): string => {
  return html
    .split('Messages')[1]
    .split('</div>')[0]
    .slice(3);
  // .split('), ');
};

const parse = (html: string) => {
  return {
    config: extractConfig(html),
    ans: extractMyAns(html),
    text: extractMyText(html)
  };
};

export {parse, extractConfig, Config, extractMyAns, extractMyText};
