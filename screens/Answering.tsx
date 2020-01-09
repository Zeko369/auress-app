import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';

import AnswerButton from '../components/AnswerButton';
import {sendText, sendShort} from '../foobar';
import {parse} from '../parser';

interface AnsweringScreenProps {
  connecting: boolean;
  config: any;
  setConfig: (data: any) => void;
}

const COLORS = {
  A: '#CF0000',
  B: '#EC7A00',
  C: '#FCD200',
  D: '#81C714',
  E: '#838B8B',
  F: '#3093c7',
  G: '#4BA614'
};

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
      <View style={{flexDirection: 'row'}}>
        <AnswerButton {...props(String.fromCharCode(65 + i))} />
        {i !== 6 ? (
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
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={text}
          onChangeText={t => setText(t)}
          style={{
            flex: 3,
            margin: 10,
            color: 'white',
            fontSize: 20,
            borderColor: 'red',
            borderWidth: 1,
            borderStyle: 'solid'
          }}
          returnKeyType={'done'}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            flex: 1,
            backgroundColor: 'purple',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5
          }}
          onPress={onSubmit}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
            Send
          </Text>
        </TouchableOpacity>
      </View>

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
