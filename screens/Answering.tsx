import React, {useState} from 'react';
import {View, Text, Keyboard} from 'react-native';

import AnswerButton from '../components/AnswerButton';
import FormInput from '../components/FormInput';
import {sendText, sendShort} from '../foobar';
import {parse} from '../parser';
import {COLORS} from '../constants/colors';

interface AnsweringScreenProps {
  connecting: boolean;
  config: any;
  setConfig: (data: any) => void;
}

const AnsweringScreen: React.FC<AnsweringScreenProps> = ({
  connecting,
  config,
  setConfig
}) => {
  const [text, setText] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  if (connecting) {
    return <Text style={{color: 'white'}}>Loading...</Text>;
  }

  const onPress = (item: string) => {
    setSubmitting(true);

    if (submitting) {
      return;
    }

    sendShort(item)
      .then(html => {
        setConfig(parse(html));
        setSubmitting(false);
        // setTimeout(() => ref.current?.scrollToEnd(), 20);
      })
      .catch(e => console.error(e));
  };

  const buttonsJSX = [];
  for (let i = 0; i < config.config.questionCount; i += 2) {
    const props = (item: string) => ({
      onPress: () => onPress(item),
      text: item,
      color: (COLORS as any)[item]
    });

    buttonsJSX.push(
      <View style={{flexDirection: 'row'}} key={`row-${i}`}>
        <AnswerButton {...props(String.fromCharCode(65 + i))} />
        {i % 2 === 0 && i < config.config.questionCount - 1 ? (
          <AnswerButton {...props(String.fromCharCode(65 + i + 1))} />
        ) : (
          <View
            style={{
              flex: 1,
              margin: 10,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        )}
      </View>
    );
  }

  const onSubmit = () => {
    if (text === '') {
      return;
    }

    Keyboard.dismiss();
    setText('');
    sendText(text)
      .then(html => {
        setConfig(parse(html));
        // setTimeout(() => ref.current?.scrollToEnd(), 20);
      })
      .catch(e => console.error(e));
  };

  return (
    <View>
      <View style={{flexDirection: 'column'}}>{buttonsJSX}</View>
      <FormInput
        setText={setText}
        text={text}
        onSubmit={onSubmit}
        returnType={'done'}
        type="default"
        label="send"
      />

      <View style={{margin: 10}}>
        <Text style={{color: 'white', fontSize: 15}}>
          <Text style={{fontWeight: '800'}}>Ans:</Text> {config.ans}
        </Text>
        <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>
          <Text style={{fontWeight: '800'}}>Text:</Text> {config.text}
        </Text>
      </View>
    </View>
  );
};

export default AnsweringScreen;
